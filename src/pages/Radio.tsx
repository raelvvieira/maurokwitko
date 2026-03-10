import { motion } from 'framer-motion';
import { Radio as RadioIcon, ExternalLink } from 'lucide-react';

const RADIO_URL = 'https://www.drmauro.com.br';

const RadioPage = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <RadioIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Rádio
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Ouça a rádio do Dr. Mauro Kwitko</p>
      </div>

      <motion.a
        href={RADIO_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex flex-col items-center text-center py-12 cursor-pointer group hover:shadow-lg transition-shadow"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
          <RadioIcon className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-lg font-bold mb-2">Rádio Dr. Mauro Kwitko</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Acesse a programação ao vivo e conteúdos exclusivos da rádio do Dr. Mauro.
        </p>
        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold group-hover:scale-105 transition-transform">
          Ouvir Agora <ExternalLink className="w-4 h-4" />
        </span>
      </motion.a>
    </div>
  );
};

export default RadioPage;
