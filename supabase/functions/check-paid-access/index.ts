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

const GRACE_DAYS = 40
const GRACE_MS = GRACE_DAYS * 24 * 60 * 60 * 1000
const REVOKED_STATUSES = new Set(['revoked', 'canceled', 'cancelled', 'refunded'])

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { persistSession: false } },
)

function isWithinGrace(date: string | null | undefined): boolean {
  if (!date) return false
  const t = new Date(date).getTime()
  if (Number.isNaN(t)) return false
  return Date.now() - t <= GRACE_MS
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email } = await req.json()
    const e = String(email || '').trim().toLowerCase()
    if (!e) {
      return new Response(JSON.stringify({ paid: false, status: 'invalid' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (ADMIN_EMAILS.has(e)) {
      return new Response(JSON.stringify({ paid: true, status: 'admin' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data } = await supabase
      .from('paid_customers')
      .select('status, last_paid_at')
      .eq('email', e)
      .maybeSingle()

    if (!data) {
      const { data: legacy } = await supabase
        .from('legacy_active_users')
        .select('email')
        .eq('email', e)
        .maybeSingle()
      if (legacy) {
        return new Response(JSON.stringify({ paid: true, status: 'legacy' }), {
          status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ paid: false, status: 'not_found' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (data.status === 'active') {
      return new Response(JSON.stringify({ paid: true, status: 'active' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Honour grace window even when status was flipped to overdue/revoked
    if (isWithinGrace(data.last_paid_at) && !REVOKED_STATUSES.has(data.status)) {
      return new Response(JSON.stringify({ paid: true, status: 'grace_period' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (isWithinGrace(data.last_paid_at) && REVOKED_STATUSES.has(data.status)) {
      return new Response(JSON.stringify({ paid: true, status: 'grace_period' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ paid: false, status: data.status }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ paid: false, status: 'error', error: String(e) }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
