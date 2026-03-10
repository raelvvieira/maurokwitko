
-- Enable RLS on all tables with public access policies (no auth yet)
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.album_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.livros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discounts ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (will be restricted when auth is added)
CREATE POLICY "Public access" ON public.albums FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.album_tracks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.course_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.course_videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.materials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.ebooks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.livros FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON public.discounts FOR ALL USING (true) WITH CHECK (true);
