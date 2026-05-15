import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { persistSession: false } },
)

const OVERDUE_DAYS = 35
const REVOKE_DAYS = 40

async function sendEmail(templateName: string, recipientEmail: string, idempotencyKey: string, templateData?: Record<string, unknown>) {
  try {
    await supabase.functions.invoke('send-transactional-email', {
      body: { templateName, recipientEmail, idempotencyKey, templateData },
    })
  } catch (e) {
    console.error(`sendEmail(${templateName}) failed:`, e)
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const now = Date.now()
  const overdueCutoff = new Date(now - OVERDUE_DAYS * 86400 * 1000).toISOString()
  const revokeCutoff = new Date(now - REVOKE_DAYS * 86400 * 1000).toISOString()

  const summary = { overdue_marked: 0, revoked: 0, errors: [] as string[] }

  // 1) Active customers with last_paid_at < 35 days ago and not yet notified → overdue
  const { data: overdueCandidates, error: e1 } = await supabase
    .from('paid_customers')
    .select('email, name, last_paid_at')
    .eq('status', 'active')
    .lt('last_paid_at', overdueCutoff)
    .is('overdue_notified_at', null)
    .limit(500)

  if (e1) summary.errors.push(`overdue query: ${e1.message}`)

  for (const row of overdueCandidates || []) {
    const nowIso = new Date().toISOString()
    const { error: updErr } = await supabase
      .from('paid_customers')
      .update({ status: 'overdue', overdue_notified_at: nowIso })
      .eq('email', row.email)

    if (updErr) {
      summary.errors.push(`update overdue ${row.email}: ${updErr.message}`)
      continue
    }

    await sendEmail(
      'clube-payment-overdue',
      row.email,
      `clube-overdue-${row.email}-${nowIso.slice(0, 10)}`,
      { name: row.name || undefined },
    )
    summary.overdue_marked++
  }

  // 2) Customers (active or overdue) with last_paid_at < 40 days ago → revoke
  const { data: revokeCandidates, error: e2 } = await supabase
    .from('paid_customers')
    .select('email, name')
    .in('status', ['active', 'overdue'])
    .lt('last_paid_at', revokeCutoff)
    .limit(500)

  if (e2) summary.errors.push(`revoke query: ${e2.message}`)

  for (const row of revokeCandidates || []) {
    const nowIso = new Date().toISOString()
    const { error: updErr } = await supabase
      .from('paid_customers')
      .update({
        status: 'revoked',
        revoked_at: nowIso,
        revoked_reason: 'no_payment',
      })
      .eq('email', row.email)

    if (updErr) {
      summary.errors.push(`update revoke ${row.email}: ${updErr.message}`)
      continue
    }

    await sendEmail(
      'clube-access-revoked',
      row.email,
      `clube-revoked-${row.email}-${nowIso.slice(0, 10)}`,
      { name: row.name || undefined },
    )
    summary.revoked++
  }

  return new Response(JSON.stringify({ ok: true, ...summary }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
