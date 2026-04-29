import { motion } from 'framer-motion';
import { Play, ExternalLink, ListMusic } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useAlbums } from '@/hooks/useSupabaseData';

type PlaylistMeta = {
  matchTitle: string; // matches album title in DB (case-insensitive, always pt)
  index: number; // index into i18n hinos.playlists array
  cover: string;
  playlistId: string;
};

const PLAYLISTS: PlaylistMeta[] = [
  {
    matchTitle: 'hinos de paz',
    index: 0,
    cover: 'https://i.ibb.co/v6fpPVzb/HINOS-DE-PAZ-2.png',
    playlistId: 'PLG7GxMRJ1lg1lkiGi6HLMAJhCq7NLfk7X',
  },
  {
    matchTitle: 'hinos de amor',
    index: 1,
    cover: 'https://i.ibb.co/q3GHxr4p/HINOS-DE-AMOR-2.png',
    playlistId: 'PLG7GxMRJ1lg2Pn2UzVXanS5k7_8beIBVy',
  },
  {
    matchTitle: 'hinos de fé',
    index: 2,
    cover: 'https://i.ibb.co/TDs4sdxQ/HINOS-DE-F-2-2.png',
    playlistId: 'PLG7GxMRJ1lg26AzCi0oOcrNZVir0SOc1j',
  },
];

const SPOTIFY_URL =
  'https://open.spotify.com/intl-pt/artist/4ca3uyMhCggB6s0XImv9ds?si=FxBhz20TTrGug9tEqfurqw';

// Extract a YouTube video ID from any common YouTube URL format
const extractYouTubeId = (url: string): string => {
  if (!url) return '';
  // /embed/<id>
  const embed = url.match(/\/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embed) return embed[1];
  // youtu.be/<id>
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (short) return short[1];
  // ?v=<id>
  const v = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (v) return v[1];
  return url; // assume already an id
};

type Track = { id: string; title: string };
type PlayerMode = 'tracks' | 'playlist';
type ActiveAlbum = { title: string; cover: string; tracks: Track[]; playlistId: string };

const HinosEspirituais = () => {
  const { albums } = useAlbums();
  const [activeAlbum, setActiveAlbum] = useState<ActiveAlbum | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [playerMode, setPlayerMode] = useState<PlayerMode>('tracks');

  const buildAlbum = (p: PlaylistMeta): ActiveAlbum => {
    const dbAlbum = albums.find((a) => a.title.trim().toLowerCase() === p.matchTitle);
    const tracks: Track[] = (dbAlbum?.tracks ?? []).map((t) => ({
      id: extractYouTubeId(t.youtubeUrl),
      title: t.title,
    }));
    return { title: p.title, cover: p.cover, tracks, playlistId: p.playlistId };
  };

  const openTracks = (p: PlaylistMeta) => {
    const album = buildAlbum(p);
    setActiveAlbum(album);
    setActiveTrackId(album.tracks[0]?.id ?? null);
    setPlayerMode('tracks');
  };

  const openPlaylist = (p: PlaylistMeta) => {
    const album = buildAlbum(p);
    setActiveAlbum(album);
    setActiveTrackId(null);
    setPlayerMode('playlist');
  };

  const playerSrc = activeAlbum
    ? playerMode === 'playlist'
      ? `https://www.youtube.com/embed/videoseries?list=${activeAlbum.playlistId}&autoplay=1`
      : activeTrackId
        ? `https://www.youtube.com/embed/${activeTrackId}?autoplay=1`
        : ''
    : '';

  return (
    <div className="pt-24 md:pt-32 pb-16 max-w-5xl mx-auto px-5 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Música & Espiritualidade</span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-3">Hinos Espirituais</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
          Coletâneas de hinos selecionados pelo Dr. Mauro Kwitko para acompanhar momentos de meditação, estudo e reflexão.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {PLAYLISTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group rounded-3xl overflow-hidden bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={p.cover}
                alt={p.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="space-y-2">
                <button
                  onClick={() => openTracks(p)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Ver Hinos <ListMusic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openPlaylist(p)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-emerald-600/40 text-emerald-700 dark:text-emerald-400 text-sm font-semibold hover:bg-emerald-600/10 transition-colors"
                >
                  Ouvir Álbum Completo <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Spotify card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-16 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 shadow-xl ring-1 ring-emerald-700/40"
      >
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-white">
          <div className="shrink-0 w-20 h-20 rounded-full bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/30">
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.561.3z"/>
            </svg>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold">Me encontre também no Spotify</h3>
            <p className="text-sm md:text-base text-white/85 mt-2 leading-relaxed">
              Ouça hinos, meditações e podcasts do Dr. Mauro direto no seu app preferido.
            </p>
          </div>
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-700 text-sm font-bold hover:bg-white/90 transition-colors shadow-md"
          >
            Abrir no Spotify <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* Player Dialog with track list */}
      <Dialog open={!!activeAlbum} onOpenChange={(o) => !o && setActiveAlbum(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background border-border/40">
          <DialogTitle className="sr-only">{activeAlbum?.title ?? 'Player'}</DialogTitle>
          {activeAlbum && (
            <div className="grid md:grid-cols-[1.6fr_1fr]">
              {/* Player */}
              <div className="bg-black">
                <div className="aspect-video w-full">
                  {playerSrc ? (
                    <iframe
                      key={playerSrc}
                      src={playerSrc}
                      title={activeAlbum.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
                      Nenhuma faixa disponível.
                    </div>
                  )}
                </div>
                <div className="p-5 flex items-center gap-4 border-t border-border/40">
                  <img src={activeAlbum.cover} alt="" className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Tocando</p>
                    <h3 className="font-bold leading-tight">{activeAlbum.title}</h3>
                  </div>
                </div>
              </div>

              {/* Track list / Playlist info */}
              <div className="border-l border-border/40 max-h-[480px] md:max-h-[560px] overflow-y-auto">
                {playerMode === 'playlist' ? (
                  <div className="p-6 text-sm text-muted-foreground space-y-2">
                    <p className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Modo álbum</p>
                    <p className="font-medium text-foreground">Reproduzindo álbum completo em sequência.</p>
                    <p>As faixas tocam automaticamente, uma após a outra, direto do YouTube.</p>
                  </div>
                ) : (
                  <>
                    {activeAlbum.tracks.length === 0 && (
                      <div className="p-6 text-sm text-muted-foreground">Nenhuma faixa cadastrada neste hinário.</div>
                    )}
                    {activeAlbum.tracks.map((t, idx) => {
                      const active = activeTrackId === t.id;
                      return (
                        <button
                          key={`${t.id}-${idx}`}
                          onClick={() => setActiveTrackId(t.id)}
                          className={`w-full text-left p-3 flex items-center gap-3 border-b border-border/40 transition-colors ${
                            active ? 'bg-primary/10' : 'hover:bg-secondary/60'
                          }`}
                        >
                          <div className="relative w-20 h-12 rounded-md overflow-hidden bg-muted shrink-0">
                            <img
                              src={`https://img.youtube.com/vi/${t.id}/mqdefault.jpg`}
                              alt=""
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Faixa {idx + 1}</p>
                            <p className="text-sm font-medium truncate">{t.title}</p>
                          </div>
                          {active && <Play className="w-4 h-4 text-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HinosEspirituais;
