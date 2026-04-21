import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Disc3, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const getVideoId = (url: string) => {
  const match = url.match(/(?:embed\/|watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : '';
};

const PLAYLIST_MAP: Record<string, string> = {
  'HINOS DE PAZ': 'https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg1lkiGi6HLMAJhCq7NLfk7X',
  'HINOS DE AMOR': 'https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg2Pn2UzVXanS5k7_8beIBVy',
  'HINOS DE FÉ': 'https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg26AzCi0oOcrNZVir0SOc1j',
};

const ALBUM_COVER_MAP: Record<string, string> = {
  'HINOS DE PAZ': 'https://i.ibb.co/v6fpPVzb/HINOS-DE-PAZ-2.png',
  'HINOS DE AMOR': 'https://i.ibb.co/q3GHxr4p/HINOS-DE-AMOR-2.png',
  'HINOS DE FÉ': 'https://i.ibb.co/TDs4sdxQ/HINOS-DE-F-2-2.png',
};

const Library = () => {
  const { albums } = useApp();
  const navigate = useNavigate();
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState<{ title: string; url: string } | null>(null);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Headphones className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Hinos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Hinos e áudios para edificação</p>
      </div>

      {albums.length === 0 && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Nenhum álbum disponível ainda.</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {albums.map((album, i) => {
          const isOpen = openAlbum === album.id;
          return (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card flex flex-col cursor-pointer ${isOpen ? 'col-span-2 sm:col-span-3 lg:col-span-4' : ''}`}
            >
              <div
                className="flex flex-col items-center"
                onClick={() => setOpenAlbum(isOpen ? null : album.id)}
              >
                {ALBUM_COVER_MAP[album.title.toUpperCase()] ? (
                  <img
                    src={ALBUM_COVER_MAP[album.title.toUpperCase()]}
                    alt={album.title}
                    className="w-32 h-32 rounded-xl object-cover mb-3"
                  />
                ) : (
                  <div className={`w-32 h-32 mx-auto rounded-xl bg-gradient-to-br ${album.coverColor} flex items-center justify-center mb-3`}>
                    <Disc3 className="w-10 h-10 text-foreground/20" />
                  </div>
                )}
                <h3 className="text-sm font-semibold text-center mb-1">{album.title}</h3>
                <p className="text-xs text-muted-foreground">{album.tracks.length} faixas</p>
                <div className="mt-2">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4 space-y-2"
                  >
                    {PLAYLIST_MAP[album.title.toUpperCase()] && (
                      <div
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-primary/10 gap-3 cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTrack({ title: `${album.title} — Todas as faixas`, url: PLAYLIST_MAP[album.title.toUpperCase()] });
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs text-primary font-bold w-5 shrink-0">▶</span>
                          <span className="text-sm font-semibold text-primary">Ouvir Todas em Sequência</span>
                        </div>
                        <Play className="w-4 h-4 text-primary shrink-0" />
                      </div>
                    )}
                    {album.tracks.map((track, ti) => {
                      const videoId = getVideoId(track.youtubeUrl);
                      const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';
                      return (
                        <div key={track.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/30 gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-xs text-muted-foreground w-5 shrink-0">{ti + 1}</span>
                            {thumbnail && (
                              <img
                                src={thumbnail}
                                alt={track.title}
                                className="w-20 h-14 rounded object-cover shrink-0"
                                loading="lazy"
                              />
                            )}
                            <span className="text-sm break-words">{track.title}</span>
                          </div>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              navigate(`/app/watch/album/${album.id}/${track.id}`);
                            }}
                            className="shrink-0 p-1.5 rounded-full hover:bg-primary/10 text-primary"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!activeTrack} onOpenChange={(open) => !open && setActiveTrack(null)}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-background border-border">
          <DialogTitle className="px-4 pt-4 text-sm font-semibold truncate">
            {activeTrack?.title}
          </DialogTitle>
          <div className="w-full aspect-video">
            {activeTrack && (
              <iframe
                src={activeTrack.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Library;
