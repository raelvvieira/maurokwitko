import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BOOKS } from '@/data/books';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const LivrosEbooks = () => {
  const { ebooks } = useEbooks();

  // Mix de capas para o carrossel final (até 12 itens, embaralhado leve)
  const carouselItems = [
    ...BOOKS.map((b) => ({ key: 'f-' + b.slug, cover: b.cover, title: b.title, to: `/livros-e-ebooks/fisico/${b.slug}` })),
    ...ebooks.map((e) => ({ key: 'e-' + e.id, cover: e.cover_url || '', title: e.title, to: `/livros-e-ebooks/ebook/${e.id}` })),
  ].filter((i) => i.cover);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
              Catálogo
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Livros e <span className="text-primary">E-books</span> do Dr. Mauro Kwitko
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Décadas de estudo, prática clínica e ensino reunidos em obras físicas e
              digitais. Conheça toda a coleção e aprofunde-se no olhar reencarnacionista.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Livros Físicos */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
                Edições impressas
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Livros Físicos</h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {BOOKS.map((b, i) => (
              <motion.div
                key={b.slug}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="group flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <Link to={`/livros-e-ebooks/fisico/${b.slug}`} className="relative aspect-[2/3] bg-muted overflow-hidden">
                  <img
                    src={b.cover}
                    alt={b.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>
                <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-semibold text-sm md:text-base leading-snug line-clamp-3 min-h-[3.5rem]">
                    {b.title}
                  </h3>
                  <p className="text-lg font-bold text-primary">{b.price}</p>
                  <Link
                    to={`/livros-e-ebooks/fisico/${b.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-secondary text-foreground text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Saber mais <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* E-books */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
                Edições digitais
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Livros Digitais (E-books)</h2>
            </div>
          </motion.div>

          {ebooks.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Nenhum e-book disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {ebooks.map((e, i) => (
                <motion.div
                  key={e.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                  className="group flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all"
                >
                  <Link to={`/livros-e-ebooks/ebook/${e.id}`} className="relative aspect-[2/3] bg-muted overflow-hidden">
                    {e.cover_url ? (
                      <img
                        src={e.cover_url}
                        alt={e.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <BookOpen className="w-10 h-10" />
                      </div>
                    )}
                  </Link>
                  <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
                    <h3 className="font-semibold text-sm md:text-base leading-snug line-clamp-3 min-h-[3.5rem]">
                      {e.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{e.author}</p>
                    <Link
                      to={`/livros-e-ebooks/ebook/${e.id}`}
                      className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-secondary text-foreground text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Saber mais <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Carrossel sugestões */}
      {carouselItems.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto mb-8 md:mb-10 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
              Para conhecer
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Outras obras do autor</h2>
          </div>
          <Marquee
            items={carouselItems}
            duration={50}
            renderItem={(item) => (
              <Link
                to={item.to}
                className="block w-[160px] h-[240px] md:w-[200px] md:h-[300px] rounded-xl overflow-hidden bg-muted shadow-md hover:shadow-xl transition-shadow"
              >
                <img src={item.cover} alt={item.title} className="absolute inset-0 w-full h-full object-cover" style={{ position: 'absolute' }} />
                <div className="relative w-full h-full">
                  <img src={item.cover} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </Link>
            )}
          />
        </section>
      )}
    </div>
  );
};

export default LivrosEbooks;
