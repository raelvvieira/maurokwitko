import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ADMIN_EMAILS = ['raelvvieira@gmail.com', 'mauroabpr@gmail.com'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseUser.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const callerEmail = claimsData.claims.email as string;
    const isAdmin = ADMIN_EMAILS.includes(callerEmail);

    const body = await req.json();
    const { user_id, all_users, type, title, message, metadata } = body;

    if (!type || !title || !message) {
      return new Response(JSON.stringify({ error: 'type, title, and message are required' }), { status: 400, headers: corsHeaders });
    }

    if (all_users && !isAdmin) {
      return new Response(JSON.stringify({ error: 'Only admins can broadcast' }), { status: 403, headers: corsHeaders });
    }

    if (all_users) {
      // Broadcast to all users
      const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
      if (usersError) throw usersError;

      const rows = users.users.map(u => ({
        user_id: u.id,
        type,
        title,
        message,
        metadata: metadata || {},
      }));

      if (rows.length > 0) {
        const { error: insertError } = await supabaseAdmin
          .from('notifications')
          .insert(rows);
        if (insertError) throw insertError;
      }

      return new Response(JSON.stringify({ sent: rows.length }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Single user notification
    if (!user_id) {
      return new Response(JSON.stringify({ error: 'user_id or all_users is required' }), { status: 400, headers: corsHeaders });
    }

    const { error: insertError } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id,
        type,
        title,
        message,
        metadata: metadata || {},
      });
    if (insertError) throw insertError;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
