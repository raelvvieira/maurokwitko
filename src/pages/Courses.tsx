import { useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

const extractVideoId = (embedUrl: string): string => {
  const match = embedUrl.match(/\/embed\/([^?&#]+)/);
  return match?.[1] ?? '';
};

const Courses = () => {
  const { courseCategories } = useApp();
  const navigate = useNavigate();

  const handlePlay = (categoryId: string, videoId: string) => {
    navigate(`/app/watch/course/${categoryId}/${videoId}`);
  };

  return (
    <div className="max-w-[1400px] space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Aulas
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Aulas em vídeo do Dr. Mauro Kwitko</p>
      </div>

      {courseCategories.length === 0 && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Nenhuma categoria de curso disponível ainda.</div>
      )}

      {courseCategories.map((cat) => (
        <CategoryRow key={cat.id} categoryId={cat.id} name={cat.name} videos={cat.videos} onPlay={handlePlay} />
      ))}
    </div>
  );
};

function CategoryRow({ categoryId, name, videos, onPlay }: { categoryId: string; name: string; videos: { id: string; title: string; youtubeId: string; description: string }[]; onPlay: (categoryId: string, videoId: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  if (videos.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">{name}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/80 border border-border shadow flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory' }}>
          {videos.map((video, i) => {
            const videoId = extractVideoId(video.youtubeId);
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card flex-shrink-0 w-56 md:w-72 cursor-pointer group/card"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => onPlay(categoryId, video.id)}
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-muted">
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-black/40 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-semibold mb-1 min-h-[3.5rem]">{video.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
              </motion.div>
            );
          })}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/80 border border-border shadow flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Courses;
