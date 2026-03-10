import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Disc3, Play, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Library = () => {
  const { albums } = useApp();
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);

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
                <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${album.coverColor} flex items-center justify-center mb-3`}>
                  <Disc3 className="w-16 h-16 text-foreground/20" />
                </div>
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
                    {album.tracks.map((track, ti) => (
                      <div key={track.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs text-muted-foreground w-5">{ti + 1}</span>
                          <span className="text-sm truncate">{track.title}</span>
                        </div>
                        <a
                          href={track.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
                        >
                          <Play className="w-3 h-3" /> Tocar
                        </a>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
