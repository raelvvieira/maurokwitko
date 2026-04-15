
CREATE TABLE public.user_video_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  video_id text NOT NULL,
  watched_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, video_id)
);

ALTER TABLE public.user_video_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own video views"
ON public.user_video_views
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own video views"
ON public.user_video_views
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
