
ALTER TABLE public.article_overrides
  ADD COLUMN IF NOT EXISTS is_custom boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS image_url text;

INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Admins can upload article images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'article-images'
  AND lower(auth.email()) = ANY (ARRAY['mauroabpr@gmail.com','raelvvieira@gmail.com'])
);

CREATE POLICY "Admins can update article images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'article-images'
  AND lower(auth.email()) = ANY (ARRAY['mauroabpr@gmail.com','raelvvieira@gmail.com'])
);

CREATE POLICY "Admins can delete article images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'article-images'
  AND lower(auth.email()) = ANY (ARRAY['mauroabpr@gmail.com','raelvvieira@gmail.com'])
);
