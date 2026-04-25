import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, ExternalLink } from 'lucide-react';
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
    ...BOOKS.map((b) => ({ key: 'f-' + b.slug, cover: b.cover, title: b.title, to: `/livros-e-ebooks/fisico/${b.slug}`, coverScale: b.coverScale })),
    ...ebooks.map((e) => ({ key: 'e-' + e.id, cover: e.cover_url || '', title: e.title, to: `/livros-e-ebooks/ebook/${e.id}`, coverScale: undefined as number | undefined })),
  ].filter((i) => i.cover);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-5 md:px-6">
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
      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
                Edições impressas
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Livros Físicos</h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
                    style={b.coverScale ? { transform: `scale(${b.coverScale})` } : undefined}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>
                <div className="p-3 md:p-5 flex flex-col gap-2 md:gap-3 flex-1">
                  <h3 className="font-semibold text-xs md:text-base leading-snug line-clamp-3 min-h-[3rem] md:min-h-[3.5rem]">
                    {b.title}
                  </h3>
                  <p className="text-base md:text-lg font-bold text-primary">{b.price}</p>
                  <Link
                    to={`/livros-e-ebooks/fisico/${b.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-secondary text-foreground text-xs md:text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Saber mais <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amazon card */}
      <section className="px-5 md:px-6">
        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#232F3E] via-[#2a3645] to-[#131A22] shadow-xl ring-1 ring-[#FF9900]/30"
        >
          <div className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-5 md:gap-6 text-white">
            <div className="shrink-0 w-20 h-20 rounded-full bg-white flex items-center justify-center ring-1 ring-white/30 shadow-md">
              <svg viewBox="0 0 256 80" className="w-14 h-auto" aria-hidden="true">
                <path
                  fill="#FF9900"
                  d="M158.6 64.7c-14.9 11-36.5 16.8-55.1 16.8-26 0-49.4-9.6-67.2-25.6-1.4-1.3-.1-3 1.5-2 19.2 11.2 42.9 17.9 67.4 17.9 16.5 0 34.6-3.4 51.4-10.5 2.5-1.1 4.6 1.6 2 3.4z"
                />
                <path
                  fill="#FF9900"
                  d="M164.8 57.6c-1.9-2.4-12.5-1.1-17.3-.6-1.5.2-1.7-1.1-.4-2 8.5-6 22.4-4.2 24-2.2 1.6 2-.5 16-8.4 22.7-1.2 1-2.4.5-1.8-.9 1.8-4.5 5.8-14.6 3.9-17z"
                />
                <text
                  x="0"
                  y="40"
                  fill="#fff"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="44"
                  letterSpacing="-2"
                >
                  amazon
                </text>
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold">Prefere comprar pela Amazon?</h3>
              <p className="text-sm md:text-base text-white/80 mt-2 leading-relaxed">
                Os e-books do Dr. Mauro Kwitko também podem ser adquiridos e lidos fora
                do Clube de Estudos, direto no seu Kindle ou no app da Amazon.
              </p>
            </div>
            <a
              href="https://www.amazon.com.br/s?k=Dr.+Mauro+Kwitko&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=QBT7ZW1JZBXW&sprefix=dr.+mauro+kwitko%2Caps%2C187&ref=nb_sb_noss_2"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF9900] text-[#131A22] text-sm font-bold hover:bg-[#ffad33] transition-colors shadow-md"
            >
              Ver na Amazon <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>
      <section className="py-12 md:py-16 px-5 md:px-6 bg-secondary/30">
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
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
                  <div className="p-3 md:p-5 flex flex-col gap-2 flex-1">
                    <h3 className="font-semibold text-xs md:text-base leading-snug line-clamp-3 min-h-[3rem] md:min-h-[3.5rem]">
                      {e.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-1">{e.author}</p>
                    <Link
                      to={`/livros-e-ebooks/ebook/${e.id}`}
                      className="mt-auto inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-secondary text-foreground text-xs md:text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
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
        <section className="py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-7xl mx-auto mb-8 md:mb-10 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
              Para conhecer
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Todas as obras do autor</h2>
          </div>
          <Marquee
            items={carouselItems}
            duration={50}
            renderItem={(item) => (
              <Link
                to={item.to}
                className="block w-[112px] h-[168px] md:w-[200px] md:h-[300px] rounded-xl overflow-hidden bg-muted shadow-md hover:shadow-xl transition-shadow relative"
              >
                <img
                  src={item.cover}
                  alt={item.title}
                  style={item.coverScale ? { transform: `scale(${item.coverScale})` } : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Link>
            )}
          />
        </section>
      )}
    </div>
  );
};

export default LivrosEbooks;
