import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const WEBHOOK_SECRET = Deno.env.get('EDUZZ_WEBHOOK_SECRET')!

const APP_URL = 'https://maurokwitko.com'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
})

const PAID_EVENTS = new Set([
  'myeduzz.invoice_paid',
  'invoice_paid',
  'invoice.paid',
  'myeduzz.invoice_completed',
  'invoice_completed',
])

const REVOKE_EVENTS: Record<string, string> = {
  'myeduzz.invoice_refunded': 'refund',
  'invoice_refunded': 'refund',
  'myeduzz.invoice_chargeback': 'chargeback',
  'invoice_chargeback': 'chargeback',
  'nutror.subscription_canceled': 'subscription_canceled',
  'subscription_canceled': 'subscription_canceled',
}

function ok(extra: Record<string, unknown> = {}) {
  return new Response(JSON.stringify({ ok: true, ...extra }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function isSecretValid(req: Request, body: any): boolean {
  // Eduzz can send the secret in different ways. Accept any of these locations.
  const headerSecret =
    req.headers.get('x-eduzz-secret') ||
    req.headers.get('x-webhook-secret') ||
    req.headers.get('x-signature') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    ''
  const url = new URL(req.url)
  const querySecret = url.searchParams.get('secret') || ''
  const bodySecret = body?.secret || body?.api_key || ''
  return [headerSecret, querySecret, bodySecret].some((s) => s && s === WEBHOOK_SECRET)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // GET → friendly health-check (Eduzz "Verificar URL" muitas vezes faz GET)
  if (req.method === 'GET') {
    return ok({ mode: 'health-check', message: 'Eduzz webhook online' })
  }

  let body: any = {}
  let rawText = ''
  try {
    rawText = await req.text()
    body = rawText ? JSON.parse(rawText) : {}
  } catch {
    body = {}
  }

  const event = body?.event || body?.type || body?.trigger || ''
  const eventId = body?.id || body?.event_id || body?.data?.id?.toString() || null

  // Ping / teste vazio da Eduzz → sempre 200, sem gravar log nem exigir secret
  const isPing =
    !rawText ||
    rawText.length < 5 ||
    (!event && !body?.data && !body?.buyer && !body?.customer && !body?.email)

  if (isPing) {
    return ok({ mode: 'ping', received_at: new Date().toISOString() })
  }

  const valid = isSecretValid(req, body)

  // Sempre logar (eventos reais)
  await supabase.from('eduzz_webhook_log').insert({
    event,
    event_id: eventId,
    payload: body,
    signature_valid: valid,
  })

  // Secret inválido: NÃO derrubar com 401 (Eduzz desativa o webhook após algumas falhas).
  // Apenas registrar e devolver 200 — admin revisa via log.
  if (!valid) {
    return ok({ mode: 'logged', warning: 'invalid_signature' })
  }

  try {
    const data = body?.data || body
    const buyer = data?.buyer || data?.customer || {}
    const email = String(buyer?.email || data?.email || '').trim().toLowerCase()
    const name = buyer?.name || data?.name || null
    const phone = buyer?.cel || buyer?.phone || data?.phone || null
    const eduzzBuyerId = buyer?.id?.toString() || null
    const invoiceId = data?.id?.toString() || data?.invoice_id?.toString() || null

    if (!email) return ok({ skipped: 'no email' })

    if (PAID_EVENTS.has(event)) {
      const { data: existing } = await supabase
        .from('paid_customers')
        .select('id, first_paid_at')
        .eq('email', email)
        .maybeSingle()

      const nowIso = new Date().toISOString()
      await supabase.from('paid_customers').upsert(
        {
          email,
          name,
          phone,
          eduzz_buyer_id: eduzzBuyerId,
          last_invoice_id: invoiceId,
          status: 'active',
          first_paid_at: existing?.first_paid_at || nowIso,
          last_paid_at: nowIso,
          revoked_at: null,
          revoked_reason: null,
        },
        { onConflict: 'email' },
      )

      const { error: createErr } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { name: name || '' },
      })
      if (createErr && !/already|exists|registered/i.test(createErr.message)) {
        console.error('createUser error:', createErr.message)
      }

      const { error: linkErr } = await supabase.auth.admin.generateLink({
        type: 'recovery',
        email,
        options: { redirectTo: `${APP_URL}/reset-password` },
      })
      if (linkErr) console.error('generateLink error:', linkErr.message)

      return ok({ action: 'granted' })
    }

    if (event in REVOKE_EVENTS) {
      await supabase
        .from('paid_customers')
        .update({
          status: 'revoked',
          revoked_at: new Date().toISOString(),
          revoked_reason: REVOKE_EVENTS[event],
        })
        .eq('email', email)

      return ok({ action: 'revoked' })
    }

    return ok({ action: 'ignored', event })
  } catch (e) {
    console.error('webhook error:', e)
    return ok({ error: String(e) })
  }
})
