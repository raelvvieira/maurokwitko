import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const ORIGIN_SECRET = Deno.env.get('EDUZZ_ORIGIN_SECRET') || ''

const APP_URL = 'https://maurokwitko.com'

// Status de contrato que devem revogar acesso (mesmo que type=create chegue)
// 3 Suspenso, 4 Cancelado, 7 Atrasado, 11 Inadimplente
const REVOKING_CONTRACT_STATUS = new Set([3, 4, 7, 11])

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
})

function ok(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // Aceita JSON ou form-urlencoded (a Eduzz pode enviar de qualquer formato)
  let body: any = {}
  try {
    const ct = req.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
      body = await req.json()
    } else if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
      const form = await req.formData()
      body = Object.fromEntries(form.entries())
    } else {
      try { body = await req.json() } catch { body = {} }
    }
  } catch {
    body = {}
  }

  // Payload pode vir achatado ou aninhado em "fields"
  const fields: Record<string, any> = body?.fields && typeof body.fields === 'object'
    ? body.fields
    : body

  const type: string = String(body?.type || fields?.type || '').toLowerCase()
  const receivedSecret: string = String(
    fields?.edz_cli_origin_secret ||
    body?.edz_cli_origin_secret ||
    ''
  )

  const validSecret = ORIGIN_SECRET.length > 0 && receivedSecret === ORIGIN_SECRET

  // Sempre loga
  await supabase.from('eduzz_webhook_log').insert({
    event: `custom_delivery:${type || 'unknown'}`,
    event_id: String(fields?.edz_fat_cod || body?.edz_fat_cod || '') || null,
    payload: body,
    signature_valid: validSecret,
  })

  // Eduzz dispara um POST de teste sem payload ao validar a URL no Órbita.
  // Aceitamos esse ping com 200 para passar na validação. Eventos reais
  // (create/remove) continuam exigindo o origin_secret válido.
  const isValidationPing =
    !type ||
    type === 'test' ||
    type === 'ping' ||
    type === 'validation' ||
    (!fields?.edz_cli_email && !fields?.edz_fat_cod)

  if (isValidationPing) {
    return ok({ ok: true, action: 'validation_ping' })
  }

  if (!validSecret) {
    return ok({ error: 'invalid origin secret' }, 401)
  }

  try {
    const email = String(fields?.edz_cli_email || '').trim().toLowerCase()
    const name = fields?.edz_cli_rsocial || null
    const phone = fields?.edz_cli_cel || null
    const eduzzBuyerId = fields?.edz_cli_cod ? String(fields.edz_cli_cod) : null
    const invoiceId = fields?.edz_fat_cod ? String(fields.edz_fat_cod) : null
    const contractStatusCod = fields?.edz_con_status_cod
      ? Number(fields.edz_con_status_cod)
      : null

    if (!email) {
      return ok({ ok: true, skipped: 'no email' })
    }

    // Defesa: contrato em status de revogação tratado como remove
    const effectiveType = (type === 'create' && contractStatusCod && REVOKING_CONTRACT_STATUS.has(contractStatusCod))
      ? 'remove'
      : type

    if (effectiveType === 'create') {
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

      return ok({ ok: true, action: 'granted', email })
    }

    if (effectiveType === 'remove') {
      await supabase.from('paid_customers')
        .update({
          status: 'revoked',
          revoked_at: new Date().toISOString(),
          revoked_reason: type === 'remove'
            ? 'custom_delivery_remove'
            : `contract_status_${contractStatusCod}`,
        })
        .eq('email', email)

      return ok({ ok: true, action: 'revoked', email })
    }

    return ok({ ok: true, action: 'ignored', type })
  } catch (e) {
    console.error('custom-delivery error:', e)
    // Eduzz exige 200 em sucesso; devolvemos 200 para evitar reenvio em loop
    return ok({ ok: true, action: 'error', error: String(e) })
  }
})
