CREATE TABLE public.article_overrides (
  slug text PRIMARY KEY,
  title_pt text NOT NULL,
  excerpt_pt text NOT NULL DEFAULT '',
  body_pt jsonb NOT NULL DEFAULT '[]'::jsonb,
  title_en text,
  excerpt_en text,
  body_en jsonb,
  title_es text,
  excerpt_es text,
  body_es jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

ALTER TABLE public.article_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read article overrides"
  ON public.article_overrides FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert article overrides"
  ON public.article_overrides FOR INSERT
  TO authenticated
  WITH CHECK (lower(auth.email()) IN ('mauroabpr@gmail.com','raelvvieira@gmail.com'));

CREATE POLICY "Admins can update article overrides"
  ON public.article_overrides FOR UPDATE
  TO authenticated
  USING (lower(auth.email()) IN ('mauroabpr@gmail.com','raelvvieira@gmail.com'))
  WITH CHECK (lower(auth.email()) IN ('mauroabpr@gmail.com','raelvvieira@gmail.com'));

CREATE POLICY "Admins can delete article overrides"
  ON public.article_overrides FOR DELETE
  TO authenticated
  USING (lower(auth.email()) IN ('mauroabpr@gmail.com','raelvvieira@gmail.com'));

CREATE TRIGGER article_overrides_updated_at
  BEFORE UPDATE ON public.article_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();