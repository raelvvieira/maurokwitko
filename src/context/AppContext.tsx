import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  useAlbums,
  useCourseCategories,
  useBlogPosts,
  useMaterials,
  useEbooks,
  useLivros,
  useDiscounts,
  type AlbumWithTracks,
  type CategoryWithVideos,
  type BlogPostRow,
  type MaterialRow,
  type BookRow,
  type DiscountRow,
} from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';

// ── Legacy Types ───────────────────────────────────────

export interface AlbumTrack {
  id: string;
  title: string;
  youtubeUrl: string;
}

export interface Album {
  id: string;
  title: string;
  coverColor: string;
  tracks: AlbumTrack[];
}

export interface CourseVideo {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
}

export interface CourseCategory {
  id: string;
  name: string;
  videos: CourseVideo[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}

export interface MaterialItem {
  id: string;
  title: string;
  type: string;
  size: string;
  url: string;
  createdAt: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: number;
  url: string;
}

export interface Discount {
  id: string;
  title: string;
  description: string;
  percentage: number;
  courseIds: string[];
  couponCode: string;
  expiresAt: string;
  active: boolean;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  liked: boolean;
  shares: number;
  time: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  rank: number;
  streak: number;
  badge: string;
  totalScore: number;
}

interface RankingUser {
  position: number;
  name: string;
  avatar: string;
  score: number;
  growth: number;
  streak: number;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
}

// ── State Interface ────────────────────────────────────

interface AppState {
  courses: Course[];
  currentCourseId: string | null;
  lessons: Lesson[];
  posts: Post[];
  profile: UserProfile;
  ranking: RankingUser[];
  isAdmin: boolean;
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  discounts: Discount[];

  albums: Album[];
  courseCategories: CourseCategory[];
  blogPosts: BlogPost[];
  materialItems: MaterialItem[];
  ebooks: BookItem[];
  livros: BookItem[];

  markLessonComplete: (lessonId: string) => void;
  toggleLike: (postId: string) => void;
  setCurrentCourseId: (id: string | null) => void;
  toggleAdmin: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  setSidebarMobileOpen: (v: boolean) => void;
  addDiscount: (item: Omit<Discount, 'id'>) => void;
  removeDiscount: (id: string) => void;
  toggleDiscountActive: (id: string) => void;

  addAlbum: (album: Omit<Album, 'id'>) => void;
  removeAlbum: (id: string) => void;
  addTrackToAlbum: (albumId: string, track: Omit<AlbumTrack, 'id'>) => void;
  removeTrackFromAlbum: (albumId: string, trackId: string) => void;

  addCourseCategory: (name: string) => void;
  removeCourseCategory: (id: string) => void;
  addVideoToCategory: (categoryId: string, video: Omit<CourseVideo, 'id'>) => void;
  removeVideoFromCategory: (categoryId: string, videoId: string) => void;

  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  removeBlogPost: (id: string) => void;

  addMaterialItem: (item: Omit<MaterialItem, 'id' | 'createdAt'>) => void;
  removeMaterialItem: (id: string) => void;

  addEbook: (item: Omit<BookItem, 'id'>) => void;
  removeEbook: (id: string) => void;
  addLivro: (item: Omit<BookItem, 'id'>) => void;
  removeLivro: (id: string) => void;
}

// ── Defaults (legacy, non-DB) ─────────────────────────

const defaultCourses: Course[] = [
  { id: '1', title: 'React Avançado & Patterns', instructor: 'Ana Silva', thumbnail: '', progress: 72, totalLessons: 24, completedLessons: 17, category: 'Desenvolvimento' },
  { id: '2', title: 'Design System com Figma', instructor: 'Carlos Mendes', thumbnail: '', progress: 45, totalLessons: 18, completedLessons: 8, category: 'Design' },
  { id: '3', title: 'Machine Learning Fundamentos', instructor: 'Dra. Beatriz Costa', thumbnail: '', progress: 30, totalLessons: 32, completedLessons: 10, category: 'Data Science' },
  { id: '4', title: 'TypeScript Masterclass', instructor: 'Ricardo Oliveira', thumbnail: '', progress: 88, totalLessons: 20, completedLessons: 18, category: 'Desenvolvimento' },
];

const defaultLessons: Lesson[] = [
  { id: 'l1', title: 'Introdução ao React Patterns', duration: '12:30', completed: true },
  { id: 'l2', title: 'Compound Components', duration: '18:45', completed: true },
  { id: 'l3', title: 'Render Props Pattern', duration: '22:10', completed: true },
  { id: 'l4', title: 'Custom Hooks Avançados', duration: '15:20', completed: false },
  { id: 'l5', title: 'Context API Deep Dive', duration: '20:00', completed: false },
  { id: 'l6', title: 'Performance Optimization', duration: '25:30', completed: false },
  { id: 'l7', title: 'State Machines com XState', duration: '19:45', completed: false },
  { id: 'l8', title: 'Testing Patterns', duration: '16:00', completed: false },
];

const defaultPosts: Post[] = [
  { id: 'p1', author: 'Marina Santos', avatar: '', content: '🚀 Acabei de completar o módulo de React Patterns!', likes: 24, liked: false, shares: 5, time: '2h atrás' },
  { id: 'p2', author: 'João Pedro', avatar: '', content: 'Dica: Usem o padrão Custom Hook + Context para gerenciar estado global.', likes: 42, liked: false, shares: 12, time: '4h atrás' },
  { id: 'p3', author: 'Larissa Freitas', avatar: '', content: 'Alguém mais está fazendo o desafio de 30 dias de código? 💪', likes: 67, liked: false, shares: 8, time: '6h atrás' },
];

const defaultRanking: RankingUser[] = [
  { position: 1, name: 'Larissa Freitas', avatar: '', score: 9850, growth: 12, streak: 45 },
  { position: 2, name: 'João Pedro', avatar: '', score: 9420, growth: 8, streak: 32 },
  { position: 3, name: 'Marina Santos', avatar: '', score: 8890, growth: 15, streak: 28 },
  { position: 4, name: 'Você', avatar: '', score: 8750, growth: 22, streak: 15 },
  { position: 5, name: 'Carlos Mendes', avatar: '', score: 8200, growth: -3, streak: 20 },
  { position: 6, name: 'Ana Silva', avatar: '', score: 7980, growth: 5, streak: 18 },
  { position: 7, name: 'Ricardo Oliveira', avatar: '', score: 7650, growth: 10, streak: 12 },
  { position: 8, name: 'Beatriz Costa', avatar: '', score: 7200, growth: -1, streak: 8 },
];

// ── Mappers (DB row → App type) ───────────────────────

function mapBlogPosts(rows: BlogPostRow[]): BlogPost[] {
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    content: r.content,
    imageUrl: r.image_url ?? undefined,
    author: r.author,
    createdAt: r.created_at,
  }));
}

function mapMaterials(rows: MaterialRow[]): MaterialItem[] {
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    type: r.type,
    size: r.size,
    url: r.url,
    createdAt: r.created_at,
  }));
}

function mapBooks(rows: BookRow[]): BookItem[] {
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    author: r.author,
    description: r.description,
    pages: r.pages,
    url: r.url,
  }));
}

function mapDiscounts(rows: DiscountRow[]): Discount[] {
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description,
    percentage: r.percentage,
    courseIds: r.course_ids,
    couponCode: r.coupon_code,
    expiresAt: r.expires_at,
    active: r.active,
  }));
}

// ── Context ────────────────────────────────────────────

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Legacy local state
  const [courses, setCourses] = useState(defaultCourses);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  const [lessons, setLessons] = useState(defaultLessons);
  const [posts, setPosts] = useState(defaultPosts);
  const [ranking] = useState(defaultRanking);
  const [isAdmin, setIsAdmin] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  // Supabase hooks
  const albumsHook = useAlbums();
  const categoriesHook = useCourseCategories();
  const blogHook = useBlogPosts();
  const materialsHook = useMaterials();
  const ebooksHook = useEbooks();
  const livrosHook = useLivros();
  const discountsHook = useDiscounts();

  const profile: UserProfile = {
    name: 'Alex Martins', email: 'alex@email.com', avatar: '',
    rank: 4, streak: 15, badge: 'Rising Star', totalScore: 8750,
  };

  const markLessonComplete = (lessonId: string) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, completed: true } : l));
    setCourses(prev => prev.map(c => {
      if (c.id === '1') {
        const newCompleted = c.completedLessons + 1;
        return { ...c, completedLessons: newCompleted, progress: Math.round((newCompleted / c.totalLessons) * 100) };
      }
      return c;
    }));
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const toggleAdmin = () => setIsAdmin(prev => !prev);

  // ── DB-backed actions ─────────────────────────────────

  const addAlbum = (album: Omit<Album, 'id'>) => {
    albumsHook.addAlbum.mutate({ title: album.title, coverColor: album.coverColor });
  };
  const removeAlbum = (id: string) => albumsHook.removeAlbum.mutate(id);
  const addTrackToAlbum = (albumId: string, track: Omit<AlbumTrack, 'id'>) => {
    albumsHook.addTrack.mutate({ albumId, title: track.title, youtubeUrl: track.youtubeUrl });
  };
  const removeTrackFromAlbum = (albumId: string, trackId: string) => {
    albumsHook.removeTrack.mutate({ albumId, trackId });
  };

  const addCourseCategory = (name: string) => categoriesHook.addCategory.mutate(name);
  const removeCourseCategory = (id: string) => categoriesHook.removeCategory.mutate(id);
  const addVideoToCategory = (categoryId: string, video: Omit<CourseVideo, 'id'>) => {
    categoriesHook.addVideo.mutate({ categoryId, title: video.title, youtubeId: video.youtubeId, description: video.description });
  };
  const removeVideoFromCategory = (categoryId: string, videoId: string) => {
    categoriesHook.removeVideo.mutate({ categoryId, videoId });
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
    blogHook.addBlogPost.mutate({ title: post.title, content: post.content, image_url: post.imageUrl ?? null, author: post.author });
  };
  const removeBlogPost = (id: string) => blogHook.removeBlogPost.mutate(id);

  const addMaterialItem = (item: Omit<MaterialItem, 'id' | 'createdAt'>) => {
    materialsHook.addMaterial.mutate({ title: item.title, type: item.type, size: item.size, url: item.url });
  };
  const removeMaterialItem = (id: string) => materialsHook.removeMaterial.mutate(id);

  const addEbook = (item: Omit<BookItem, 'id'>) => {
    ebooksHook.addEbook.mutate({ title: item.title, author: item.author, description: item.description, pages: item.pages, url: item.url });
  };
  const removeEbook = (id: string) => ebooksHook.removeEbook.mutate(id);

  const addLivro = (item: Omit<BookItem, 'id'>) => {
    livrosHook.addLivro.mutate({ title: item.title, author: item.author, description: item.description, pages: item.pages, url: item.url });
  };
  const removeLivro = (id: string) => livrosHook.removeLivro.mutate(id);

  const addDiscount = (item: Omit<Discount, 'id'>) => {
    discountsHook.addDiscount.mutate({
      title: item.title, description: item.description, percentage: item.percentage,
      course_ids: item.courseIds, coupon_code: item.couponCode, expires_at: item.expiresAt, active: item.active,
    });
  };
  const removeDiscount = (id: string) => discountsHook.removeDiscount.mutate(id);
  const toggleDiscountActive = (id: string) => {
    const disc = discountsHook.discounts.find(d => d.id === id);
    if (disc) discountsHook.updateDiscount.mutate({ id, active: !disc.active });
  };

  return (
    <AppContext.Provider value={{
      courses, currentCourseId, lessons, posts, profile, ranking,
      isAdmin, sidebarCollapsed, sidebarMobileOpen,
      discounts: mapDiscounts(discountsHook.discounts),
      albums: albumsHook.albums,
      courseCategories: categoriesHook.courseCategories,
      blogPosts: mapBlogPosts(blogHook.blogPosts),
      materialItems: mapMaterials(materialsHook.materials),
      ebooks: mapBooks(ebooksHook.ebooks),
      livros: mapBooks(livrosHook.livros),
      markLessonComplete, toggleLike, setCurrentCourseId,
      toggleAdmin, setSidebarCollapsed, setSidebarMobileOpen,
      addDiscount, removeDiscount, toggleDiscountActive,
      addAlbum, removeAlbum, addTrackToAlbum, removeTrackFromAlbum,
      addCourseCategory, removeCourseCategory, addVideoToCategory, removeVideoFromCategory,
      addBlogPost, removeBlogPost, addMaterialItem, removeMaterialItem,
      addEbook, removeEbook, addLivro, removeLivro,
    }}>
      {children}
    </AppContext.Provider>
  );
};
