import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
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

interface Track {
  title: string;
  artist: string;
  duration: string;
}

interface AppState {
  courses: Course[];
  currentCourseId: string | null;
  lessons: Lesson[];
  posts: Post[];
  profile: UserProfile;
  ranking: RankingUser[];
  currentTrack: Track;
  isPlaying: boolean;
  playerProgress: number;
  markLessonComplete: (lessonId: string) => void;
  toggleLike: (postId: string) => void;
  togglePlay: () => void;
  setCurrentCourseId: (id: string | null) => void;
}

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
  { id: 'p1', author: 'Marina Santos', avatar: '', content: '🚀 Acabei de completar o módulo de React Patterns! A aula sobre Compound Components mudou completamente minha forma de pensar em composição.', likes: 24, liked: false, shares: 5, time: '2h atrás' },
  { id: 'p2', author: 'João Pedro', avatar: '', content: 'Dica: Usem o padrão Custom Hook + Context para gerenciar estado global. É muito mais limpo que Redux para a maioria dos casos!', likes: 42, liked: false, shares: 12, time: '4h atrás' },
  { id: 'p3', author: 'Larissa Freitas', avatar: '', content: 'Alguém mais está fazendo o desafio de 30 dias de código? Estou no dia 15 e a evolução é incrível! 💪', likes: 67, liked: false, shares: 8, time: '6h atrás' },
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
  const [ranking, setRanking] = useState(defaultRanking);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(35);

  const profile: UserProfile = {
    name: 'Alex Martins',
    email: 'alex@email.com',
    avatar: '',
    rank: 4,
    streak: 15,
    badge: 'Rising Star',
    totalScore: 8750,
  };

  const currentTrack: Track = {
    title: 'Focus Flow - Lo-Fi Study',
    artist: 'ChillBeats',
    duration: '3:45',
  };

  const markLessonComplete = (lessonId: string) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, completed: true } : l));
    // Update ranking score
    setRanking(prev => prev.map(r => r.name === 'Você' ? { ...r, score: r.score + 50 } : r)
      .sort((a, b) => b.score - a.score)
      .map((r, i) => ({ ...r, position: i + 1 }))
    );
    // Update course progress
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

  const togglePlay = () => setIsPlaying(prev => !prev);

  return (
    <AppContext.Provider value={{
      courses, currentCourseId, lessons, posts, profile, ranking, currentTrack,
      isPlaying, playerProgress, markLessonComplete, toggleLike, togglePlay, setCurrentCourseId
    }}>
      {children}
    </AppContext.Provider>
  );
};
