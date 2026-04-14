import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Courses = () => {
  const { courseCategories } = useApp();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="max-w-[1400px] space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Cursos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Aulas em vídeo do Dr. Mauro Kwitko</p>
      </div>

      {courseCategories.length === 0 && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Nenhuma categoria de curso disponível ainda.</div>
      )}

      {courseCategories.map((cat) => (
        <CategoryRow key={cat.id} name={cat.name} videos={cat.videos} onPlay={setActiveVideo} />
      ))}

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-3xl mx-4" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-white hover:text-primary transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                referrerPolicy="no-referrer"
                className="w-full h-full"
              />
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${activeVideo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-white/80 hover:text-primary transition-colors"
            >
              <Play className="w-4 h-4" /> Assistir no YouTube ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

function CategoryRow({ name, videos, onPlay }: { name: string; videos: { id: string; title: string; youtubeId: string; description: string }[]; onPlay: (id: string) => void }) {
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
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card flex-shrink-0 w-64 cursor-pointer group/card"
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => onPlay(video.youtubeId)}
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-muted">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-black/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-1 truncate">{video.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
            </motion.div>
          ))}
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
