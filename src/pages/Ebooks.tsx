import { motion } from 'framer-motion';
import { BookMarked, Download, BookOpen, Tag, ArrowRight } from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';
import { useNavigate } from 'react-router-dom';

const Ebooks = () => {
  const { ebooks, isLoading } = useEbooks();
  const navigate = useNavigate();

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
              20% de desconto em todos os livros físicos!
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Adquira os livros físicos do Dr. Mauro Kwitko na loja da BesouroBox com
              {' '}<span className="inline-block bg-accent/20 text-accent font-mono font-bold px-2 py-0.5 rounded text-sm">MAURO20</span>{' '}
              no checkout para receber o desconto de 20%.
            </p>
            <button
              onClick={() => navigate('/livros')}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-transform"
            >
              Ver Livros <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {isLoading && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Carregando...</div>
      )}

      {!isLoading && ebooks.length === 0 && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Nenhum e-book disponível ainda.</div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {ebooks.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex flex-col"
          >
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 md:mb-4 bg-muted">
              {book.cover_url ? (
                <img src={book.cover_url} alt={book.title} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <BookMarked className="w-12 h-12 text-primary/40" />
                </div>
              )}
            </div>
            <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-3">{book.title}</h3>
            <p className="text-xs text-muted-foreground mb-1">{book.author} · {book.pages} páginas</p>
            {book.description && <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 flex-1 line-clamp-2">{book.description}</p>}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => navigate(`/ebooks/${book.id}`)}
                className="flex-1 py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs md:text-sm font-semibold text-center flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform"
              >
                <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> Ler
              </button>
              <a
                href={`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ebook-download?id=${book.id}`}
                className="flex-1 py-2 md:py-2.5 rounded-xl border border-primary/30 text-primary text-xs md:text-sm font-semibold text-center flex items-center justify-center gap-1.5 hover:bg-primary/5 transition-colors"
              >
                <Download className="w-3 h-3 md:w-4 md:h-4" /> Baixar
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Ebooks;
