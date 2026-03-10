
-- Albums (Hinos CDs)
CREATE TABLE public.albums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  cover_color TEXT NOT NULL DEFAULT 'from-blue-500/30 to-purple-500/30',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Album Tracks
CREATE TABLE public.album_tracks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course Categories
CREATE TABLE public.course_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course Videos
CREATE TABLE public.course_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.course_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog Posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Dr. Mauro Kwitko',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Materials
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'PDF',
  size TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ebooks
CREATE TABLE public.ebooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Dr. Mauro Kwitko',
  description TEXT NOT NULL DEFAULT '',
  pages INT NOT NULL DEFAULT 0,
  url TEXT NOT NULL DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Livros
CREATE TABLE public.livros (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Dr. Mauro Kwitko',
  description TEXT NOT NULL DEFAULT '',
  pages INT NOT NULL DEFAULT 0,
  url TEXT NOT NULL DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Discounts
CREATE TABLE public.discounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  percentage INT NOT NULL DEFAULT 0,
  course_ids TEXT[] NOT NULL DEFAULT '{}',
  coupon_code TEXT NOT NULL,
  expires_at DATE NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- No RLS for now (public access, no auth yet)
-- Indexes for foreign keys
CREATE INDEX idx_album_tracks_album_id ON public.album_tracks(album_id);
CREATE INDEX idx_course_videos_category_id ON public.course_videos(category_id);
