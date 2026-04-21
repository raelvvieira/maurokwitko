import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PLAYLISTS = [
  {
    title: 'Hinos de Paz',
    description: 'Composições suaves para meditação e tranquilidade interior.',
    color: 'from-sky-200 to-sky-50',
  },
  {
    title: 'Hinos de Amor',
    description: 'Cânticos que celebram o amor universal e a fraternidade.',
    color: 'from-rose-200 to-rose-50',
  },
  {
    title: 'Hinos de Fé',
    description: 'Hinos que fortalecem a conexão com o Divino e a fé interior.',
    color: 'from-amber-200 to-amber-50',
  },
];

const HinosEspirituais = () => {
  const navigate = useNavigate();
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
            <div className={`aspect-video bg-gradient-to-br ${p.color} flex items-center justify-center`}>
              <Music className="w-14 h-14 text-foreground/60" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Ouvir no Clube <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HinosEspirituais;
