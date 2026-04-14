import { motion } from 'framer-motion';
import { BookMarked, ExternalLink, Tag } from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';

const Ebooks = () => {
  const { ebooks, isLoading } = useEbooks();

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BookMarked className="w-5 h-5 md:w-6 md:h-6 text-primary" /> E-books
        </h1>
        <p className="text-sm text-muted-foreground mt-1">E-books digitais do Dr. Mauro Kwitko</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <Tag className="w-8 h-8 text-accent shrink-0" />
          <div>
            <h3 className="text-base md:text-lg font-bold text-foreground">
              20% de desconto em todos os e-books!
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Clique em <strong>Ler E-book</strong>, monte seu carrinho na BesouroBox e aplique o cupom
              {' '}<span className="inline-block bg-accent/20 text-accent font-mono font-bold px-2 py-0.5 rounded text-sm">MAURO20</span>{' '}
              no checkout para receber o desconto.
            </p>
          </div>
        </div>
      </motion.div>

      {isLoading && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Carregando...</div>
      )}

      {!isLoading && ebooks.length === 0 && (
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
            <div className="w-full aspect-[210/297] rounded-xl overflow-hidden mb-4 bg-muted">
              {book.cover_url ? (
                <img src={book.cover_url} alt={book.title} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <BookMarked className="w-12 h-12 text-primary/40" />
                </div>
              )}
            </div>
            <h3 className="text-base font-semibold mb-1">{book.title}</h3>
            <p className="text-xs text-muted-foreground mb-1">{book.author} · {book.pages} páginas</p>
            {book.description && <p className="text-sm text-muted-foreground mb-4 flex-1">{book.description}</p>}
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform mt-auto"
            >
              Ler E-book <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Ebooks;
