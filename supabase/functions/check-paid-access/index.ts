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
      .select('status')
      .eq('email', e)
      .maybeSingle()

    if (!data) {
      // Fallback: check legacy users imported from old club
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

    return new Response(JSON.stringify({ paid: data.status === 'active', status: data.status }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ paid: false, status: 'error', error: String(e) }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
