
-- Create ebooks storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebooks', 'ebooks', true);

-- Allow public read access
CREATE POLICY "Public read access on ebooks bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'ebooks');

-- Allow public upload/update/delete (admin manages via app)
CREATE POLICY "Public write access on ebooks bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'ebooks');

CREATE POLICY "Public update access on ebooks bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'ebooks');

CREATE POLICY "Public delete access on ebooks bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'ebooks');

-- Add cover_url column to ebooks table
ALTER TABLE public.ebooks ADD COLUMN cover_url TEXT DEFAULT NULL;
