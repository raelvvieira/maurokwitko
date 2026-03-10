import React, { createContext, useContext, useState, ReactNode } from 'react';

// ── Types ──────────────────────────────────────────────

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

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'document';
  category: 'courses' | 'library' | 'materials';
  url: string;
  youtubeId?: string;
  fileName?: string;
  createdAt: string;
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
  // Legacy
  courses: Course[];
  currentCourseId: string | null;
  lessons: Lesson[];
  posts: Post[];
  profile: UserProfile;
  ranking: RankingUser[];
  isAdmin: boolean;
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  mediaItems: MediaItem[];
  discounts: Discount[];

  // New content
  albums: Album[];
  courseCategories: CourseCategory[];
  blogPosts: BlogPost[];
  materialItems: MaterialItem[];
  ebooks: BookItem[];
  livros: BookItem[];

  // Legacy actions
  markLessonComplete: (lessonId: string) => void;
  toggleLike: (postId: string) => void;
  setCurrentCourseId: (id: string | null) => void;
  toggleAdmin: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  setSidebarMobileOpen: (v: boolean) => void;
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt'>) => void;
  removeMediaItem: (id: string) => void;
  addDiscount: (item: Omit<Discount, 'id'>) => void;
  removeDiscount: (id: string) => void;
  toggleDiscountActive: (id: string) => void;

  // New actions
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

// ── Defaults ───────────────────────────────────────────

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

const defaultDiscounts: Discount[] = [
  { id: 'd1', title: 'Desconto de Boas-Vindas', description: 'Para novos alunos', percentage: 20, courseIds: [], couponCode: 'WELCOME20', expiresAt: '2026-04-30', active: true },
  { id: 'd2', title: 'Combo React + TypeScript', description: 'Desconto especial no combo', percentage: 35, courseIds: ['1', '4'], couponCode: 'COMBO35', expiresAt: '2026-03-31', active: true },
  { id: 'd3', title: 'Black Friday Antecipada', description: 'Acesso vitalício com super desconto', percentage: 50, courseIds: [], couponCode: 'BLACK50', expiresAt: '2026-05-15', active: false },
];

const defaultAlbums: Album[] = [
  {
    id: 'a1', title: 'Hinos de Adoração Vol. 1', coverColor: 'from-blue-500/30 to-purple-500/30',
    tracks: [
      { id: 't1', title: 'Hino 1 - Graça Infinita', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 't2', title: 'Hino 2 - Poder da Oração', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 't3', title: 'Hino 3 - Louvor Eterno', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
  {
    id: 'a2', title: 'Hinos de Louvor Vol. 2', coverColor: 'from-amber-500/30 to-red-500/30',
    tracks: [
      { id: 't4', title: 'Hino 1 - Cântico Novo', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 't5', title: 'Hino 2 - Alegria do Senhor', youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
];

const defaultCategories: CourseCategory[] = [
  {
    id: 'cat1', name: 'Cura e Libertação',
    videos: [
      { id: 'v1', title: 'Introdução à Cura Interior', youtubeId: 'dQw4w9WgXcQ', description: 'Fundamentos da cura interior.' },
      { id: 'v2', title: 'Processo de Libertação', youtubeId: 'dQw4w9WgXcQ', description: 'Etapas do processo de libertação.' },
      { id: 'v3', title: 'Oração de Cura', youtubeId: 'dQw4w9WgXcQ', description: 'Como orar pela cura.' },
    ]
  },
  {
    id: 'cat2', name: 'Batalha Espiritual',
    videos: [
      { id: 'v4', title: 'Armadura de Deus', youtubeId: 'dQw4w9WgXcQ', description: 'A armadura espiritual completa.' },
      { id: 'v5', title: 'Estratégias de Guerra', youtubeId: 'dQw4w9WgXcQ', description: 'Táticas bíblicas de guerra espiritual.' },
    ]
  },
  {
    id: 'cat3', name: 'Discipulado',
    videos: [
      { id: 'v6', title: 'Fundamentos do Discipulado', youtubeId: 'dQw4w9WgXcQ', description: 'O que é ser discípulo.' },
      { id: 'v7', title: 'Formando Líderes', youtubeId: 'dQw4w9WgXcQ', description: 'Princípios de liderança cristã.' },
    ]
  },
];

const defaultEbooks: BookItem[] = [
  { id: 'e1', title: 'O Poder da Oração', author: 'Dr. Mauro Kwitko', description: 'E-book sobre o poder transformador da oração.', pages: 120, url: '#' },
  { id: 'e2', title: 'Cura Interior - Guia Prático', author: 'Dr. Mauro Kwitko', description: 'Guia digital para cura interior.', pages: 85, url: '#' },
];

const defaultLivros: BookItem[] = [
  { id: 'b1', title: 'Batalha Espiritual', author: 'Dr. Mauro Kwitko', description: 'Estratégias bíblicas para a batalha espiritual.', pages: 350, url: '#' },
  { id: 'b2', title: 'Vida Cristã Vitoriosa', author: 'Dr. Mauro Kwitko', description: 'Princípios para viver uma vida cristã plena.', pages: 280, url: '#' },
  { id: 'b3', title: 'Fé e Ciência', author: 'Dr. Mauro Kwitko', description: 'A harmonia entre fé e ciência.', pages: 300, url: '#' },
];

const defaultBlogPosts: BlogPost[] = [
  { id: 'bp1', title: 'A Importância da Oração Diária', content: 'A oração é o alicerce da vida cristã. Neste artigo, exploramos como a prática diária da oração transforma nossa relação com Deus.', author: 'Dr. Mauro Kwitko', createdAt: '2026-03-01' },
  { id: 'bp2', title: 'Cura Interior: Primeiros Passos', content: 'Entenda os fundamentos da cura interior e como iniciar esse processo de transformação em sua vida.', author: 'Dr. Mauro Kwitko', createdAt: '2026-02-25' },
];

const defaultMaterials: MaterialItem[] = [
  { id: 'm1', title: 'Guia de Oração', type: 'PDF', size: '2.4 MB', url: '#', createdAt: '2026-03-01' },
  { id: 'm2', title: 'Roteiro de Estudo Bíblico', type: 'PDF', size: '1.1 MB', url: '#', createdAt: '2026-02-20' },
];

// ── Context ────────────────────────────────────────────

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState(defaultCourses);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  const [lessons, setLessons] = useState(defaultLessons);
  const [posts, setPosts] = useState(defaultPosts);
  const [ranking] = useState(defaultRanking);
  const [isAdmin, setIsAdmin] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>(defaultDiscounts);

  const [albums, setAlbums] = useState<Album[]>(defaultAlbums);
  const [courseCategories, setCourseCategories] = useState<CourseCategory[]>(defaultCategories);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [materialItems, setMaterialItems] = useState<MaterialItem[]>(defaultMaterials);
  const [ebooks, setEbooks] = useState<BookItem[]>(defaultEbooks);
  const [livros, setLivros] = useState<BookItem[]>(defaultLivros);

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

  // Media (legacy)
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'createdAt'>) => {
    setMediaItems(prev => [...prev, { ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
  };
  const removeMediaItem = (id: string) => setMediaItems(prev => prev.filter(m => m.id !== id));

  // Discounts
  const addDiscount = (item: Omit<Discount, 'id'>) => setDiscounts(prev => [...prev, { ...item, id: crypto.randomUUID() }]);
  const removeDiscount = (id: string) => setDiscounts(prev => prev.filter(d => d.id !== id));
  const toggleDiscountActive = (id: string) => setDiscounts(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));

  // Albums
  const addAlbum = (album: Omit<Album, 'id'>) => setAlbums(prev => [...prev, { ...album, id: crypto.randomUUID() }]);
  const removeAlbum = (id: string) => setAlbums(prev => prev.filter(a => a.id !== id));
  const addTrackToAlbum = (albumId: string, track: Omit<AlbumTrack, 'id'>) => {
    setAlbums(prev => prev.map(a => a.id === albumId ? { ...a, tracks: [...a.tracks, { ...track, id: crypto.randomUUID() }] } : a));
  };
  const removeTrackFromAlbum = (albumId: string, trackId: string) => {
    setAlbums(prev => prev.map(a => a.id === albumId ? { ...a, tracks: a.tracks.filter(t => t.id !== trackId) } : a));
  };

  // Course Categories
  const addCourseCategory = (name: string) => setCourseCategories(prev => [...prev, { id: crypto.randomUUID(), name, videos: [] }]);
  const removeCourseCategory = (id: string) => setCourseCategories(prev => prev.filter(c => c.id !== id));
  const addVideoToCategory = (categoryId: string, video: Omit<CourseVideo, 'id'>) => {
    setCourseCategories(prev => prev.map(c => c.id === categoryId ? { ...c, videos: [...c.videos, { ...video, id: crypto.randomUUID() }] } : c));
  };
  const removeVideoFromCategory = (categoryId: string, videoId: string) => {
    setCourseCategories(prev => prev.map(c => c.id === categoryId ? { ...c, videos: c.videos.filter(v => v.id !== videoId) } : c));
  };

  // Blog
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt'>) => setBlogPosts(prev => [{ ...post, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...prev]);
  const removeBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  // Materials
  const addMaterialItem = (item: Omit<MaterialItem, 'id' | 'createdAt'>) => setMaterialItems(prev => [...prev, { ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
  const removeMaterialItem = (id: string) => setMaterialItems(prev => prev.filter(m => m.id !== id));

  // Books
  const addEbook = (item: Omit<BookItem, 'id'>) => setEbooks(prev => [...prev, { ...item, id: crypto.randomUUID() }]);
  const removeEbook = (id: string) => setEbooks(prev => prev.filter(e => e.id !== id));
  const addLivro = (item: Omit<BookItem, 'id'>) => setLivros(prev => [...prev, { ...item, id: crypto.randomUUID() }]);
  const removeLivro = (id: string) => setLivros(prev => prev.filter(l => l.id !== id));

  return (
    <AppContext.Provider value={{
      courses, currentCourseId, lessons, posts, profile, ranking,
      isAdmin, sidebarCollapsed, sidebarMobileOpen, mediaItems, discounts,
      albums, courseCategories, blogPosts, materialItems, ebooks, livros,
      markLessonComplete, toggleLike, setCurrentCourseId,
      toggleAdmin, setSidebarCollapsed, setSidebarMobileOpen,
      addMediaItem, removeMediaItem, addDiscount, removeDiscount, toggleDiscountActive,
      addAlbum, removeAlbum, addTrackToAlbum, removeTrackFromAlbum,
      addCourseCategory, removeCourseCategory, addVideoToCategory, removeVideoFromCategory,
      addBlogPost, removeBlogPost, addMaterialItem, removeMaterialItem,
      addEbook, removeEbook, addLivro, removeLivro,
    }}>
      {children}
    </AppContext.Provider>
  );
};
