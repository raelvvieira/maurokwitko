// Email sending via Resend (https://resend.com) — replaces the Lovable email API.
//
// Required secrets:
//   RESEND_API_KEY   — API key from resend.com (domain notify.maurokwitko.com must be verified there)
// Optional:
//   SITE_URL         — public site URL used in unsubscribe links (default https://maurokwitko.com)

export class EmailSendError extends Error {
  status: number
  retryAfterSeconds: number | null
  constructor(message: string, status: number, retryAfterSeconds: number | null = null) {
    super(message)
    this.status = status
    this.retryAfterSeconds = retryAfterSeconds
  }
}

export interface QueuedEmail {
  to: string
  from: string
  subject: string
  html: string
  text?: string
  label?: string
  message_id?: string
  idempotency_key?: string
  unsubscribe_token?: string
}

function unsubscribeLinks(token: string) {
  const siteUrl = (Deno.env.get('SITE_URL') ?? 'https://maurokwitko.com').replace(/\/$/, '')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  return {
    page: `${siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`,
    oneClick: `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
  }
}

function withUnsubscribeFooter(html: string, pageUrl: string): string {
  const footer =
    `<div style="text-align:center;font-family:Arial,sans-serif;font-size:12px;color:#888;margin:24px 0 8px">` +
    `Não quer mais receber estes e-mails? <a href="${pageUrl}" style="color:#888">Cancelar inscrição</a></div>`
  return html.includes('</body>') ? html.replace('</body>', `${footer}</body>`) : html + footer
}

export async function sendEmail(email: QueuedEmail): Promise<{ id: string }> {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  if (!apiKey) throw new EmailSendError('RESEND_API_KEY not configured', 500)

  const headers: Record<string, string> = {}
  let html = email.html
  let text = email.text
  if (email.unsubscribe_token) {
    const links = unsubscribeLinks(email.unsubscribe_token)
    headers['List-Unsubscribe'] = `<${links.oneClick}>`
    headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click'
    html = withUnsubscribeFooter(html, links.page)
    if (text) text += `\n\nCancelar inscrição: ${links.page}`
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(email.idempotency_key || email.message_id
        ? { 'Idempotency-Key': (email.idempotency_key || email.message_id)!.slice(0, 256) }
        : {}),
    },
    body: JSON.stringify({
      from: email.from,
      to: [email.to],
      subject: email.subject,
      html,
      text,
      headers,
      tags: email.label ? [{ name: 'label', value: email.label.replace(/[^a-zA-Z0-9_-]/g, '_') }] : undefined,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    const retryAfter = res.headers.get('retry-after')
    throw new EmailSendError(
      `Resend ${res.status}: ${body.slice(0, 500)}`,
      res.status,
      retryAfter ? Number(retryAfter) || 60 : null,
    )
  }
  return await res.json()
}
