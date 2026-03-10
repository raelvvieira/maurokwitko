import { motion } from 'framer-motion';
import { BookMarked, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Ebooks = () => {
  const { ebooks } = useApp();

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BookMarked className="w-5 h-5 md:w-6 md:h-6 text-primary" /> E-books
        </h1>
        <p className="text-sm text-muted-foreground mt-1">E-books digitais do Dr. Mauro Kwitko</p>
      </div>

      {ebooks.length === 0 && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Nenhum e-book disponível ainda.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ebooks.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex flex-col"
          >
            <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
              <BookMarked className="w-12 h-12 text-primary/40" />
            </div>
            <h3 className="text-base font-semibold mb-1">{book.title}</h3>
            <p className="text-xs text-muted-foreground mb-1">{book.author}</p>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{book.description}</p>
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Acessar o E-book <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Ebooks;
