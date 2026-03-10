import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

const books = [
  { id: '1', title: 'O Poder da Oração', description: 'Uma jornada profunda sobre o poder transformador da oração na vida cristã.', pages: 320 },
  { id: '2', title: 'Cura Interior e Libertação', description: 'Fundamentos bíblicos para a cura interior e o processo de libertação espiritual.', pages: 280 },
  { id: '3', title: 'Batalha Espiritual', description: 'Estratégias bíblicas para vencer a batalha espiritual no dia a dia.', pages: 350 },
  { id: '4', title: 'Vida Cristã Vitoriosa', description: 'Princípios práticos para viver uma vida cristã plena e vitoriosa.', pages: 240 },
  { id: '5', title: 'Fé e Ciência', description: 'A harmonia entre fé e ciência sob a perspectiva do Dr. Mauro Kwitko.', pages: 300 },
  { id: '6', title: 'Discipulado Avançado', description: 'Um guia completo para o crescimento espiritual e formação de discípulos.', pages: 260 },
];

const Biblioteca = () => {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Biblioteca
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Catálogo de livros do Dr. Mauro Kwitko</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {books.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex flex-col"
          >
            <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-primary/40" />
            </div>
            <h3 className="text-base font-semibold mb-1">{book.title}</h3>
            <p className="text-xs text-muted-foreground mb-1">Dr. Mauro Kwitko</p>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{book.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{book.pages} páginas</span>
              <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Ler mais <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Biblioteca;
