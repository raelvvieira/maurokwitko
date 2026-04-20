import { useApp } from '@/context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowLeft, Play } from 'lucide-react';
import { useMemo, useEffect } from 'react';
import { useUserVideoViews } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';

const extractYouTubeId = (value: string): string => {
  if (!value) return '';
  const embedMatch = value.match(/\/embed\/([^?&#/]+)/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = value.match(/(?:watch\?v=|youtu\.be\/)([^?&#/]+)/);
  if (watchMatch) return watchMatch[1];
  return value; // assume it's already a bare id
};

interface PlayerItem {
  id: string;
  title: string;
  youtubeId: string;
  description?: string;
  duration?: string;
}

const CourseDetail = () => {
  const { source, contextId, videoId } = useParams<{ source: string; contextId: string; videoId: string }>();
  const { courseCategories, albums } = useApp();
  const { user } = useAuth();
  const { views, markVideoWatched } = useUserVideoViews(user?.id);
  const navigate = useNavigate();

  const { items, contextTitle, backPath, sidebarLabel } = useMemo(() => {
    if (source === 'album') {
      const album = albums.find(a => a.id === contextId);
      return {
        items: (album?.tracks ?? []).map<PlayerItem>(t => ({
          id: t.id,
          title: t.title,
          youtubeId: extractYouTubeId(t.youtubeUrl),
        })),
        contextTitle: album?.title ?? '',
        backPath: '/library',
        sidebarLabel: 'Faixas do Álbum',
      };
    }
    const cat = courseCategories.find(c => c.id === contextId);
    return {
      items: (cat?.videos ?? []).map<PlayerItem>(v => ({
        id: v.id,
        title: v.title,
        youtubeId: extractYouTubeId(v.youtubeId),
        description: v.description,
      })),
      contextTitle: cat?.name ?? '',
      backPath: '/courses',
      sidebarLabel: 'Próximas Aulas',
    };
  }, [source, contextId, courseCategories, albums]);

  const currentItem = items.find(i => i.id === videoId) ?? items[0];
  const currentIndex = items.findIndex(i => i.id === currentItem?.id);
  const nextItem = currentIndex >= 0 ? items[currentIndex + 1] : undefined;

  const watchedIds = useMemo(() => new Set(views.map(v => v.video_id)), [views]);
  const isCompleted = currentItem ? watchedIds.has(currentItem.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  if (!currentItem) {
    return (
      <div className="max-w-7xl space-y-4">
        <button onClick={() => navigate(backPath)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Conteúdo não encontrado.</div>
      </div>
    );
  }

  const handleSelect = (itemId: string) => {
    navigate(`/watch/${source}/${contextId}/${itemId}`);
  };

  const handleMarkComplete = () => {
    if (!user) return;
    markVideoWatched.mutate(currentItem.id);
  };

  const embedUrl = `https://www.youtube.com/embed/${currentItem.youtubeId}?autoplay=1&rel=0`;

  return (
    <div className="max-w-7xl space-y-4">
      <button onClick={() => navigate(backPath)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-0 overflow-hidden">
            <div className="aspect-video bg-black">
              <iframe
                key={currentItem.id}
                src={embedUrl}
                title={currentItem.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{contextTitle}</p>
            <h1 className="text-lg md:text-xl font-bold mt-1">{currentItem.title}</h1>
          </div>

          {!isCompleted ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleMarkComplete}
              disabled={markVideoWatched.isPending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm hover:shadow-lg transition-shadow disabled:opacity-60"
            >
              ✓ Marcar como Concluída
            </motion.button>
          ) : (
            <div className="space-y-2">
              <div className="w-full py-3 rounded-xl bg-success/10 text-success font-semibold text-sm text-center flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> Aula Concluída
              </div>
              {nextItem && (
                <button
                  onClick={() => handleSelect(nextItem.id)}
                  className="w-full py-3 rounded-xl bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                >
                  <Play className="w-4 h-4" /> Próxima: {nextItem.title}
                </button>
              )}
            </div>
          )}

          {currentItem.description && currentItem.description.trim().length > 0 && (
            <div className="glass-card">
              <h3 className="text-sm font-semibold mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{currentItem.description}</p>
            </div>
          )}
        </div>

        {/* Sidebar list */}
        <div className="glass-card h-fit max-h-[80vh] overflow-y-auto">
          <h3 className="text-sm font-semibold mb-3">{sidebarLabel}</h3>
          <div className="space-y-1">
            {items.map((item, idx) => {
              const isCurrent = item.id === currentItem.id;
              const watched = watchedIds.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all text-sm ${
                    isCurrent ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                  }`}
                >
                  {watched ? (
                    <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">
                      <span className="text-muted-foreground mr-1">{idx + 1}.</span>
                      {item.title}
                    </p>
                  </div>
                  {isCurrent && <Play className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
