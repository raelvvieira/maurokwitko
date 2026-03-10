import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

// ── Albums with tracks ────────────────────────────────

export interface AlbumWithTracks {
  id: string;
  title: string;
  coverColor: string;
  tracks: { id: string; title: string; youtubeUrl: string }[];
}

export function useAlbums() {
  const qc = useQueryClient();

  const { data: albums = [], isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async (): Promise<AlbumWithTracks[]> => {
      const { data: albumRows, error: aErr } = await supabase.from('albums').select('*').order('created_at');
      if (aErr) throw aErr;
      const { data: trackRows, error: tErr } = await supabase.from('album_tracks').select('*').order('position');
      if (tErr) throw tErr;
      return (albumRows ?? []).map(a => ({
        id: a.id,
        title: a.title,
        coverColor: a.cover_color,
        tracks: (trackRows ?? []).filter(t => t.album_id === a.id).map(t => ({ id: t.id, title: t.title, youtubeUrl: t.youtube_url })),
      }));
    },
  });

  const addAlbum = useMutation({
    mutationFn: async (album: { title: string; coverColor: string }) => {
      const { error } = await supabase.from('albums').insert({ title: album.title, cover_color: album.coverColor });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['albums'] }),
  });

  const removeAlbum = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('albums').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['albums'] }),
  });

  const addTrack = useMutation({
    mutationFn: async ({ albumId, title, youtubeUrl }: { albumId: string; title: string; youtubeUrl: string }) => {
      const { error } = await supabase.from('album_tracks').insert({ album_id: albumId, title, youtube_url: youtubeUrl });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['albums'] }),
  });

  const removeTrack = useMutation({
    mutationFn: async ({ albumId, trackId }: { albumId: string; trackId: string }) => {
      const { error } = await supabase.from('album_tracks').delete().eq('id', trackId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['albums'] }),
  });

  return { albums, isLoading, addAlbum, removeAlbum, addTrack, removeTrack };
}

// ── Course Categories with videos ─────────────────────

export interface CategoryWithVideos {
  id: string;
  name: string;
  videos: { id: string; title: string; youtubeId: string; description: string }[];
}

export function useCourseCategories() {
  const qc = useQueryClient();

  const { data: courseCategories = [], isLoading } = useQuery({
    queryKey: ['course_categories'],
    queryFn: async (): Promise<CategoryWithVideos[]> => {
      const { data: cats, error: cErr } = await supabase.from('course_categories').select('*').order('created_at');
      if (cErr) throw cErr;
      const { data: vids, error: vErr } = await supabase.from('course_videos').select('*').order('position');
      if (vErr) throw vErr;
      return (cats ?? []).map(c => ({
        id: c.id,
        name: c.name,
        videos: (vids ?? []).filter(v => v.category_id === c.id).map(v => ({ id: v.id, title: v.title, youtubeId: v.youtube_id, description: v.description })),
      }));
    },
  });

  const addCategory = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.from('course_categories').insert({ name });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['course_categories'] }),
  });

  const removeCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('course_categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['course_categories'] }),
  });

  const addVideo = useMutation({
    mutationFn: async ({ categoryId, title, youtubeId, description }: { categoryId: string; title: string; youtubeId: string; description: string }) => {
      const { error } = await supabase.from('course_videos').insert({ category_id: categoryId, title, youtube_id: youtubeId, description });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['course_categories'] }),
  });

  const removeVideo = useMutation({
    mutationFn: async ({ categoryId, videoId }: { categoryId: string; videoId: string }) => {
      const { error } = await supabase.from('course_videos').delete().eq('id', videoId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['course_categories'] }),
  });

  return { courseCategories, isLoading, addCategory, removeCategory, addVideo, removeVideo };
}

// ── Simple CRUD hook factory ──────────────────────────

function useSimpleCrud<T extends { id: string }>(
  table: 'blog_posts' | 'materials' | 'ebooks' | 'livros' | 'discounts',
  queryKey: string,
  orderBy: string = 'created_at',
) {
  const qc = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending: table === 'blog_posts' ? false : true });
      if (error) throw error;
      return data as unknown as T[];
    },
  });

  const add = useMutation({
    mutationFn: async (item: Record<string, any>) => {
      const { error } = await supabase.from(table).insert(item as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
  });

  const update = useMutation({
    mutationFn: async ({ id, ...fields }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from(table).update(fields as any).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
  });

  return { data, isLoading, add, remove, update };
}

// ── Blog Posts ─────────────────────────────────────────

export interface BlogPostRow {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  author: string;
  created_at: string;
}

export function useBlogPosts() {
  const { data, isLoading, add, remove } = useSimpleCrud<BlogPostRow>('blog_posts', 'blog_posts');
  return { blogPosts: data, isLoading, addBlogPost: add, removeBlogPost: remove };
}

// ── Materials ──────────────────────────────────────────

export interface MaterialRow {
  id: string;
  title: string;
  type: string;
  size: string;
  url: string;
  created_at: string;
}

export function useMaterials() {
  const { data, isLoading, add, remove } = useSimpleCrud<MaterialRow>('materials', 'materials');
  return { materials: data, isLoading, addMaterial: add, removeMaterial: remove };
}

// ── Ebooks ─────────────────────────────────────────────

export interface BookRow {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: number;
  url: string;
}

export function useEbooks() {
  const { data, isLoading, add, remove } = useSimpleCrud<BookRow>('ebooks', 'ebooks');
  return { ebooks: data, isLoading, addEbook: add, removeEbook: remove };
}

// ── Livros ─────────────────────────────────────────────

export function useLivros() {
  const { data, isLoading, add, remove } = useSimpleCrud<BookRow>('livros', 'livros');
  return { livros: data, isLoading, addLivro: add, removeLivro: remove };
}

// ── Discounts ──────────────────────────────────────────

export interface DiscountRow {
  id: string;
  title: string;
  description: string;
  percentage: number;
  course_ids: string[];
  coupon_code: string;
  expires_at: string;
  active: boolean;
}

export function useDiscounts() {
  const { data, isLoading, add, remove, update } = useSimpleCrud<DiscountRow>('discounts', 'discounts');
  return { discounts: data, isLoading, addDiscount: add, removeDiscount: remove, updateDiscount: update };
}
