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

// Grace window: monthly subscription cycle (30 days) + tolerance for the next
// invoice to be generated/charged on Eduzz.
const GRACE_DAYS = 35
const GRACE_MS = GRACE_DAYS * 24 * 60 * 60 * 1000
// Look back this many days inside eduzz_webhook_log when self-claiming a new subscriber.
const WEBHOOK_LOOKBACK_DAYS = 40

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { persistSession: false } },
)

type AccessStatus =
  | 'active'
  | 'admin'
  | 'legacy'
  | 'grace_period'
  | 'overdue'
  | 'revoked'
  | 'not_found'
  | 'pending_new_subscriber'
  | 'invalid'
  | 'error'

const REVOKED_STATUSES = new Set(['revoked', 'canceled', 'cancelled', 'refunded'])
const PAID_STATUSES = new Set<AccessStatus>(['active', 'admin', 'legacy', 'grace_period'])

const PAID_EVENT_KEYWORDS = ['paid', 'completed', 'approved', 'confirmed']

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function isWithinGrace(date: string | null | undefined): boolean {
  if (!date) return false
  const t = new Date(date).getTime()
  if (Number.isNaN(t)) return false
  return Date.now() - t <= GRACE_MS
}

/**
 * Self-claim path for brand-new subscribers: scan the recent webhook log for a
 * paid-event payload that matches the email. If found, hydrate paid_customers
 * so the user gets in immediately, even if the original webhook didn't persist
 * (e.g. invalid signature, missing buyer mapping).
 */
async function tryClaimFromWebhookLog(email: string): Promise<{ claimed: boolean; last_paid_at?: string; name?: string }> {
  const sinceIso = new Date(Date.now() - WEBHOOK_LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString()

  const { data: rows } = await supabase
    .from('eduzz_webhook_log')
    .select('event, payload, processed_at')
    .gte('processed_at', sinceIso)
    .order('processed_at', { ascending: false })
    .limit(500)

  if (!rows?.length) return { claimed: false }

  for (const row of rows) {
    const evt = String(row.event || '').toLowerCase()
    const looksPaid = PAID_EVENT_KEYWORDS.some((kw) => evt.includes(kw))
    if (!looksPaid) continue

    const payload: any = row.payload || {}
    const data = payload?.data || payload
    const buyer = data?.buyer || data?.customer || {}
    const candidateEmails = [
      buyer?.email,
      data?.email,
      payload?.email,
    ]
      .filter(Boolean)
      .map((e: string) => String(e).trim().toLowerCase())

    if (!candidateEmails.includes(email)) continue

    const name = buyer?.name || data?.name || null
    const phone = buyer?.cel || buyer?.phone || data?.phone || null
    const eduzzBuyerId = buyer?.id?.toString() || null
    const invoiceId = data?.id?.toString() || data?.invoice_id?.toString() || null
    const lastPaidAt = row.processed_at as string

    await supabase.from('paid_customers').upsert({
      email,
      name,
      phone,
      eduzz_buyer_id: eduzzBuyerId,
      last_invoice_id: invoiceId,
      status: 'active',
      first_paid_at: lastPaidAt,
      last_paid_at: lastPaidAt,
      revoked_at: null,
      revoked_reason: null,
    }, { onConflict: 'email' })

    return { claimed: true, last_paid_at: lastPaidAt, name: name ?? undefined }
  }

  return { claimed: false }
}

async function classifyEmail(email: string): Promise<{ status: AccessStatus; name?: string }> {
  if (ADMIN_EMAILS.has(email)) return { status: 'admin' }

  const { data: paid } = await supabase
    .from('paid_customers')
    .select('status, name, last_paid_at')
    .eq('email', email)
    .maybeSingle()

  if (paid) {
    const name = paid.name ?? undefined
    if (paid.status === 'active') return { status: 'active', name }

    if (REVOKED_STATUSES.has(paid.status)) {
      // Even if marked revoked, honour grace if the last payment is recent enough
      if (isWithinGrace(paid.last_paid_at)) return { status: 'grace_period', name }
      return { status: 'revoked', name }
    }

    if (isWithinGrace(paid.last_paid_at)) return { status: 'grace_period', name }
    return { status: 'overdue', name }
  }

  const { data: legacy } = await supabase
    .from('legacy_active_users')
    .select('name')
    .eq('email', email)
    .maybeSingle()

  if (legacy) return { status: 'legacy', name: legacy.name ?? undefined }

  // Last resort: check raw webhook log for a recent paid event with this email
  const claim = await tryClaimFromWebhookLog(email)
  if (claim.claimed) return { status: 'active', name: claim.name }

  return { status: 'pending_new_subscriber' }
}

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
      return json({ ok: false, status, name: name ?? null })
    }

    let userId: string | undefined
    try {
      // @ts-ignore — getUserByEmail availability varies
      const r = await supabase.auth.admin.getUserByEmail?.(e)
      if (r?.data?.user) userId = r.data.user.id
    } catch (_) { /* ignore */ }

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

    const link = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: e,
    })

    if (link.error || !link.data) {
      console.error('generateLink failed', link.error)
      return json({ ok: false, status: 'error' as AccessStatus })
    }

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
