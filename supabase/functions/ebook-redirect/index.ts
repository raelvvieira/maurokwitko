import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const ebookId = url.searchParams.get("id");

  if (!ebookId) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: ebook, error } = await supabase
    .from("ebooks")
    .select("url")
    .eq("id", ebookId)
    .single();

  if (error || !ebook) {
    return new Response(JSON.stringify({ error: "E-book not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const fileUrl = ebook.url;

  // Check if it's a storage URL and generate a signed URL
  const storageBase = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/`;
  if (fileUrl.startsWith(storageBase)) {
    const path = fileUrl.replace(storageBase, "");
    const bucketEnd = path.indexOf("/");
    const bucket = path.substring(0, bucketEnd);
    const filePath = path.substring(bucketEnd + 1);

    const { data: signed, error: signError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, 3600);

    if (signError || !signed?.signedUrl) {
      return new Response(JSON.stringify({ error: "Failed to generate URL" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: signed.signedUrl },
    });
  }

  // External URL, just redirect
  return new Response(null, {
    status: 302,
    headers: { ...corsHeaders, Location: fileUrl },
  });
});
