-- 1) Add video_url to ebooks
ALTER TABLE public.ebooks ADD COLUMN IF NOT EXISTS video_url text;

-- 2) Create book_reviews table
CREATE TABLE IF NOT EXISTS public.book_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_type text NOT NULL CHECK (book_type IN ('fisico','ebook')),
  book_id text NOT NULL,
  reader_name text NOT NULL,
  comment text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.book_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews"
ON public.book_reviews
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert reviews"
ON public.book_reviews
FOR INSERT
WITH CHECK (
  char_length(reader_name) BETWEEN 1 AND 80
  AND char_length(comment) BETWEEN 1 AND 1000
  AND rating BETWEEN 1 AND 5
);

CREATE INDEX IF NOT EXISTS idx_book_reviews_book ON public.book_reviews (book_type, book_id, created_at DESC);