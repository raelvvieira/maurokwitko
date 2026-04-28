import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const ADMIN_EMAILS = new Set([
  'raelvvieira@gmail.com',
  'mauroabpr@gmail.com',
])

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { persistSession: false } },
)

// Status returned to the client. UI maps each to a specific message.
type AccessStatus =
  | 'active'        // paying customer, all good
  | 'admin'         // hard-coded admin
  | 'legacy'        // legacy active user from old club
  | 'overdue'       // exists in paid_customers but status != active and not revoked/canceled
  | 'revoked'       // canceled / refunded
  | 'not_found'     // email not in any list
  | 'invalid'       // bad request
  | 'error'         // server error

const REVOKED_STATUSES = new Set(['revoked', 'canceled', 'cancelled', 'refunded'])

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function classifyEmail(email: string): Promise<{ status: AccessStatus; name?: string }> {
  if (ADMIN_EMAILS.has(email)) return { status: 'admin' }

  const { data: paid } = await supabase
    .from('paid_customers')
    .select('status, name')
    .eq('email', email)
    .maybeSingle()

  if (paid) {
    if (paid.status === 'active') return { status: 'active', name: paid.name ?? undefined }
    if (REVOKED_STATUSES.has(paid.status)) return { status: 'revoked', name: paid.name ?? undefined }
    return { status: 'overdue', name: paid.name ?? undefined }
  }

  const { data: legacy } = await supabase
    .from('legacy_active_users')
    .select('name')
    .eq('email', email)
    .maybeSingle()

  if (legacy) return { status: 'legacy', name: legacy.name ?? undefined }

  return { status: 'not_found' }
}

const PAID_STATUSES = new Set<AccessStatus>(['active', 'admin', 'legacy'])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email } = await req.json().catch(() => ({ email: '' }))
    const e = String(email || '').trim().toLowerCase()
    if (!e || !/^\S+@\S+\.\S+$/.test(e)) {
      return json({ ok: false, status: 'invalid' as AccessStatus })
    }

    const { status, name } = await classifyEmail(e)

    if (!PAID_STATUSES.has(status)) {
      // Not allowed in. Tell the client which message to show + send notification email if applicable.
      return json({ ok: false, status, name: name ?? null })
    }

    // Allowed. Make sure auth user exists (idempotent).
    const { data: existingList } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    } as any)
    // listUsers cannot filter by email reliably across versions, so do explicit lookup:
    let userId: string | undefined
    {
      // Try to fetch by email via admin API (Supabase JS v2 supports getUserByEmail through admin)
      // Fallback: create if not exists, ignoring duplicate error.
      // @ts-ignore — getUserById/getUserByEmail availability varies; use try/catch.
      try {
        // @ts-ignore
        const r = await supabase.auth.admin.getUserByEmail?.(e)
        if (r?.data?.user) userId = r.data.user.id
      } catch (_) { /* ignore */ }
    }

    if (!userId) {
      const randomPassword = crypto.randomUUID() + crypto.randomUUID()
      const created = await supabase.auth.admin.createUser({
        email: e,
        password: randomPassword,
        email_confirm: true,
        user_metadata: name ? { name } : {},
      })
      if (created.error && !/already.*registered|exists/i.test(created.error.message)) {
        console.error('createUser failed', created.error)
        return json({ ok: false, status: 'error' as AccessStatus })
      }
      userId = created.data?.user?.id
    }

    // Generate a magic link and extract the token_hash so the client can verify it without redirect.
    const link = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: e,
    })

    if (link.error || !link.data) {
      console.error('generateLink failed', link.error)
      return json({ ok: false, status: 'error' as AccessStatus })
    }

    // Properties on link.data.properties: action_link, hashed_token, redirect_to, verification_type
    const props: any = (link.data as any).properties || {}
    const token_hash: string | undefined = props.hashed_token

    if (!token_hash) {
      console.error('No hashed_token returned from generateLink', props)
      return json({ ok: false, status: 'error' as AccessStatus })
    }

    return json({
      ok: true,
      status,
      name: name ?? null,
      token_hash,
      type: 'magiclink',
    })
  } catch (err) {
    console.error('passwordless-login error', err)
    return json({ ok: false, status: 'error' as AccessStatus })
  }
})
