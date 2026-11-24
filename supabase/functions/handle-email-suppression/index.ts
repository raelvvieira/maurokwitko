import { createClient } from 'npm:@supabase/supabase-js@2'
import { Webhook } from 'npm:standardwebhooks@1.0.0'

// Resend webhook (Resend dashboard → Webhooks → endpoint:
//   https://<project>.supabase.co/functions/v1/handle-email-suppression
//   events: email.bounced, email.complained)
// Resend signs with Svix (svix-id / svix-timestamp / svix-signature headers),
// which is the Standard Webhooks scheme. Secret: RESEND_WEBHOOK_SECRET ("whsec_...").

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

const EVENT_TO_REASON: Record<string, 'bounce' | 'complaint'> = {
  'email.bounced': 'bounce',
  'email.complained': 'complaint',
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const secret = Deno.env.get('RESEND_WEBHOOK_SECRET')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!secret || !supabaseUrl || !supabaseServiceKey) {
    console.error('Missing required environment variables')
    return jsonResponse({ error: 'Server configuration error' }, 500)
  }

  const raw = await req.text()
  let event: any
  try {
    const wh = new Webhook(secret.replace(/^whsec_/, ''))
    event = wh.verify(raw, {
      'webhook-id': req.headers.get('svix-id') ?? req.headers.get('webhook-id') ?? '',
      'webhook-timestamp': req.headers.get('svix-timestamp') ?? req.headers.get('webhook-timestamp') ?? '',
      'webhook-signature': req.headers.get('svix-signature') ?? req.headers.get('webhook-signature') ?? '',
    })
  } catch (error) {
    console.error('Invalid webhook signature', { error: String(error) })
    return jsonResponse({ error: 'Invalid signature' }, 401)
  }

  const reason = EVENT_TO_REASON[event?.type]
  if (!reason) return jsonResponse({ ignored: true })

  // Only permanent bounces suppress the address.
  if (reason === 'bounce' && event.data?.bounce?.type && event.data.bounce.type !== 'Permanent') {
    return jsonResponse({ ignored: true, reason: 'transient bounce' })
  }

  const recipients: string[] = Array.isArray(event.data?.to) ? event.data.to : [event.data?.to].filter(Boolean)
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  for (const r of recipients) {
    const email = String(r).toLowerCase()
    const metadata = { provider: 'resend', event: event.type, email_id: event.data?.email_id, bounce: event.data?.bounce ?? null }
    const { error } = await supabase
      .from('suppressed_emails')
      .upsert({ email, reason, metadata }, { onConflict: 'email' })
    if (error) {
      console.error('Failed to upsert suppressed email', { error })
      return jsonResponse({ error: 'Failed to write suppression' }, 500)
    }
    await supabase.from('email_send_log').insert({
      message_id: null,
      template_name: 'system',
      recipient_email: email,
      status: reason === 'bounce' ? 'bounced' : 'complained',
      error_message: reason === 'bounce'
        ? 'Permanent bounce — email address is invalid or rejected'
        : 'Spam complaint — recipient marked email as spam',
      metadata,
    })
  }

  return jsonResponse({ success: true })
})
