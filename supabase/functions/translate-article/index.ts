import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ADMIN_EMAILS = new Set(['mauroabpr@gmail.com', 'raelvvieira@gmail.com']);
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

type Block = string;

async function translateBatch(strings: string[], targetLang: 'en' | 'es'): Promise<string[]> {
  if (strings.length === 0) return [];
  const langName = targetLang === 'en' ? 'English' : 'Spanish (Latin America)';
  const systemPrompt = `You are a professional translator. Translate the user-provided JSON array of Brazilian Portuguese strings into ${langName}.
Strict rules:
- Return ONLY a JSON array of the same length, in the same order.
- Preserve the EXACT prefix markers if present at the start of a string: "__SUB__", "__LIST__", "__QUOTE__". Translate only the text after the marker.
- For "__LIST__" strings, the items are separated by "||" — translate each item individually but keep the "||" separators.
- For "__QUOTE__" strings, parts are separated by "||" — translate each part, keep "||".
- Keep punctuation, line breaks (\\n) and formatting. Do NOT add commentary.`;

  const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(strings) },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'return_translations',
            description: 'Return translated strings in the same order',
            parameters: {
              type: 'object',
              properties: {
                translations: { type: 'array', items: { type: 'string' } },
              },
              required: ['translations'],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: 'function', function: { name: 'return_translations' } },
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`AI gateway ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  if (!args) throw new Error('No tool call returned');
  const parsed = JSON.parse(args);
  const out = parsed.translations as string[];
  if (!Array.isArray(out) || out.length !== strings.length) {
    throw new Error(`Translation length mismatch: got ${out?.length} expected ${strings.length}`);
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Missing auth' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email?.toLowerCase();
    if (!email || !ADMIN_EMAILS.has(email)) {
      return json({ error: 'Forbidden' }, 403);
    }

    const body = await req.json();
    const { slug, title_pt, excerpt_pt, body_pt, deleteOverride } = body as {
      slug?: string;
      title_pt?: string;
      excerpt_pt?: string;
      body_pt?: Block[];
      deleteOverride?: boolean;
    };

    if (!slug || typeof slug !== 'string') return json({ error: 'slug required' }, 400);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    );

    if (deleteOverride) {
      const { error } = await admin.from('article_overrides').delete().eq('slug', slug);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true, deleted: true });
    }

    if (!title_pt || !Array.isArray(body_pt)) {
      return json({ error: 'title_pt and body_pt required' }, 400);
    }

    // Translate title + excerpt + body in batches per language
    const ptCombined = [title_pt, excerpt_pt ?? '', ...body_pt];

    const [enAll, esAll] = await Promise.all([
      translateBatch(ptCombined, 'en'),
      translateBatch(ptCombined, 'es'),
    ]);

    const [title_en, excerpt_en, ...body_en] = enAll;
    const [title_es, excerpt_es, ...body_es] = esAll;

    const { error } = await admin.from('article_overrides').upsert({
      slug,
      title_pt,
      excerpt_pt: excerpt_pt ?? '',
      body_pt,
      title_en,
      excerpt_en,
      body_en,
      title_es,
      excerpt_es,
      body_es,
      updated_by: userData.user?.id,
      updated_at: new Date().toISOString(),
    });

    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  } catch (err) {
    console.error('translate-article error', err);
    return json({ error: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
});
