import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
  return [headerSecret, querySecret, bodySecret].some(s => s && s === WEBHOOK_SECRET)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  let body: any = {}
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const event = body?.event || body?.type || body?.trigger || ''
  const eventId = body?.id || body?.event_id || body?.data?.id?.toString() || null
  const valid = isSecretValid(req, body)

  // Always log
  await supabase.from('eduzz_webhook_log').insert({
    event,
    event_id: eventId,
    payload: body,
    signature_valid: valid,
  })

  if (!valid) {
    return new Response(JSON.stringify({ error: 'invalid signature' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = body?.data || body
    const buyer = data?.buyer || data?.customer || {}
    const email = String(buyer?.email || data?.email || '').trim().toLowerCase()
    const name = buyer?.name || data?.name || null
    const phone = buyer?.cel || buyer?.phone || data?.phone || null
    const eduzzBuyerId = buyer?.id?.toString() || null
    const invoiceId = data?.id?.toString() || data?.invoice_id?.toString() || null

    if (!email) {
      return new Response(JSON.stringify({ ok: true, skipped: 'no email' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (PAID_EVENTS.has(event)) {
      // Upsert paid customer
      const { data: existing } = await supabase
        .from('paid_customers')
        .select('id, first_paid_at')
        .eq('email', email)
        .maybeSingle()

      await supabase.from('paid_customers').upsert({
        email,
        name,
        phone,
        eduzz_buyer_id: eduzzBuyerId,
        last_invoice_id: invoiceId,
        status: 'active',
        first_paid_at: existing?.first_paid_at || new Date().toISOString(),
        revoked_at: null,
        revoked_reason: null,
      }, { onConflict: 'email' })

      // Create user (ignore "already exists")
      const { error: createErr } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { name: name || '' },
      })
      if (createErr && !/already|exists|registered/i.test(createErr.message)) {
        console.error('createUser error:', createErr.message)
      }

      // Send password setup email (recovery)
      const { error: linkErr } = await supabase.auth.admin.generateLink({
        type: 'recovery',
        email,
        options: { redirectTo: `${APP_URL}/reset-password` },
      })
      if (linkErr) console.error('generateLink error:', linkErr.message)

      return new Response(JSON.stringify({ ok: true, action: 'granted' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (event in REVOKE_EVENTS) {
      await supabase.from('paid_customers')
        .update({
          status: 'revoked',
          revoked_at: new Date().toISOString(),
          revoked_reason: REVOKE_EVENTS[event],
        })
        .eq('email', email)

      return new Response(JSON.stringify({ ok: true, action: 'revoked' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true, action: 'ignored', event }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('webhook error:', e)
    return new Response(JSON.stringify({ ok: true, error: String(e) }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
