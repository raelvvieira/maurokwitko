import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const PLAYLISTS = [
  {
    title: 'Hinos de Paz',
    description: 'Composições suaves para meditação e tranquilidade interior.',
    cover: 'https://i.ibb.co/v6fpPVzb/HINOS-DE-PAZ-2.png',
    url: 'https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg1lkiGi6HLMAJhCq7NLfk7X',
  },
  {
    title: 'Hinos de Amor',
    description: 'Cânticos que celebram o amor universal e a fraternidade.',
    cover: 'https://i.ibb.co/q3GHxr4p/HINOS-DE-AMOR-2.png',
    url: 'https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg2Pn2UzVXanS5k7_8beIBVy',
  },
  {
    title: 'Hinos de Fé',
    description: 'Hinos que fortalecem a conexão com o Divino e a fé interior.',
    cover: 'https://i.ibb.co/TDs4sdxQ/HINOS-DE-F-2-2.png',
    url: 'https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg26AzCi0oOcrNZVir0SOc1j',
  },
];

const HinosEspirituais = () => {
  const [active, setActive] = useState<{ title: string; url: string } | null>(null);

  return (
    <div className="pt-24 md:pt-32 pb-16 max-w-5xl mx-auto px-4 md:px-6">
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
              <button
                onClick={() => setActive({ title: p.title, url: p.url })}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Ouvir Agora <Play className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black border-border/40">
          <DialogTitle className="sr-only">{active?.title ?? 'Player'}</DialogTitle>
          {active && (
            <div className="aspect-video w-full">
              <iframe
                src={`${active.url}&autoplay=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HinosEspirituais;
