import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Quote, Mail, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { BOOKS } from '@/data/books';
import { ARTICLES } from '@/data/articles';
import { getArticleImage } from '@/data/articleImages';
import { supabase } from '@/integrations/supabase/client';
import { Marquee } from '@/components/public/Marquee';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const RECENT_ARTICLES = ARTICLES.slice(0, 3);

const GALLERY = [
  { src: 'https://i.ibb.co/MDJBY2J0/AULAS-TE-RICAS.jpg', label: 'Aulas Teóricas' },
  { src: 'https://i.ibb.co/HDQbPzRX/AULAS-PR-TICAS.jpg', label: 'Aulas Práticas' },
  { src: 'https://i.ibb.co/bjyq508N/DR-MAURO-CURSO-DE-FORMA-O.jpg', label: 'Curso de Formação' },
  { src: 'https://i.ibb.co/ksCJ5Jbw/ENCONTRO-NACIONAL-DA-ABPR.jpg', label: 'Encontro Nacional ABPR' },
  { src: 'https://i.ibb.co/hJ0mBLYW/TURMA-DO-CURSO-DE-FORMA-O.jpg', label: 'Turma do Curso' },
  { src: 'https://i.ibb.co/6JTKCKpx/EVOLU-O-CONSCIENCIAL.jpg', label: 'Evolução Consciencial' },
];

type Ebook = { id: string; title: string; cover_url: string | null };

const greenButtonAnim = {
  animate: { scale: [1, 1.03, 1] },
  transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
};

type Slide = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  caption: string;
};

const SLIDE_IMAGES: { ctaHref: string; image: string; imageAlt: string }[] = [
  { ctaHref: '/formacao', image: 'https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg', imageAlt: 'Dr. Mauro Kwitko' },
  { ctaHref: '/clube-de-estudos', image: 'https://i.ibb.co/HDQbPzRX/AULAS-PR-TICAS.jpg', imageAlt: 'Clube de Estudos' },
  { ctaHref: '/curso-online', image: 'https://i.ibb.co/MDJBY2J0/AULAS-TE-RICAS.jpg', imageAlt: 'Curso Online' },
];

const useHeroSlides = (): Slide[] => {
  const { t } = useTranslation();
  return SLIDE_IMAGES.map((s, i) => {
    const k = `home.slides.${i + 1}`;
    return {
      eyebrow: t(`${k}.eyebrow`),
      titleStart: t(`${k}.titleStart`),
      titleAccent: t(`${k}.titleAccent`),
      description: t(`${k}.description`),
      ctaLabel: t(`${k}.cta`),
      ctaHref: s.ctaHref,
      image: s.image,
      imageAlt: s.imageAlt,
      caption: t(`${k}.caption`),
    };
  });
};

const HeroCarousel = ({ navigate }: { navigate: (path: string) => void }) => {
  const HERO_SLIDES = useHeroSlides();
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const autoplayRef = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    prefersReducedMotion ? [] : [autoplayRef.current]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi]);

  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="absolute inset-0 -z-10 mesh-gradient opacity-60" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <div className="rounded-[2rem] border border-border/60 ring-1 ring-border/40 bg-card/60 backdrop-blur-sm shadow-sm p-5 sm:p-8 md:p-16 lg:p-20">
          <div className="overflow-hidden rounded-[1.5rem]" ref={emblaRef} aria-roledescription="carousel">
            <div className="flex -ml-6 md:-ml-10">
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.titleAccent}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-6 md:pl-10"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${idx + 1} de ${HERO_SLIDES.length}`}
                >
                  <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div className="space-y-6">
                      <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                        {slide.eyebrow}
                      </span>
                      <h1 className="font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] break-words">
                        {slide.titleStart}
                        <span className="italic font-serif text-primary">{slide.titleAccent}</span>
                        {slide.titleEnd}
                      </h1>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg hyphens-auto">
                        {slide.description}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <motion.button
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                          onClick={() => navigate(slide.ctaHref)}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md"
                        >
                          {slide.ctaLabel} <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-secondary shadow-lg ring-1 ring-border/40">
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-5 text-center text-sm md:text-base font-medium text-foreground/70 tracking-wide">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Ir para slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  selected === idx ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const formacaoItems = t('home.formacao.items', { returnObjects: true }) as string[];
  const aboutItems = t('home.about.items', { returnObjects: true }) as string[];

  useEffect(() => {
    supabase
      .from('ebooks')
      .select('id,title,cover_url')
      .not('cover_url', 'is', null)
      .limit(20)
      .then(({ data }) => {
        if (data) setEbooks(data as Ebook[]);
      });
  }, []);

  return (
    <div id="home" className="overflow-hidden">
      {/* HERO CAROUSEL */}
      <HeroCarousel navigate={navigate} />

      {/* LIVROS — Marquee */}
      <section id="livros" className="relative py-12 md:py-16">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-6xl mx-auto px-5 md:px-6 mb-10">
          <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('home.books.eyebrow')}</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">{t('home.books.title')}</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                {t('home.books.desc')}
              </p>
            </div>
          </motion.div>
        </div>

        <Marquee
          items={BOOKS}
          duration={60}
          renderItem={(book) => (
            <Link
              to={`/livros-e-ebooks/fisico/${book.slug}`}
              className="group block w-[112px] md:w-[200px]"
            >
              <div className="relative w-[112px] h-[168px] md:w-[200px] md:h-[300px] rounded-2xl overflow-hidden bg-muted shadow-md ring-1 ring-border/40 group-hover:shadow-xl group-hover:ring-primary/30 transition-all duration-500 group-hover:-translate-y-1">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-xs md:text-sm font-semibold leading-snug line-clamp-2">{book.title}</h3>
              <motion.span
                {...greenButtonAnim}
                className="mt-2 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                {t('common.readMore')} <ArrowRight className="w-3 h-3" />
              </motion.span>
            </Link>
          )}
        />
      </section>

      {/* FORMAÇÃO — Course CTA */}
      <section id="formacao" className="py-12 md:py-16 bg-secondary/30 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm p-8 md:p-14 lg:p-16 grid md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <div className="relative space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold tracking-wider uppercase">
                {t('home.formacao.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {t('home.formacao.titleStart')}<span className="italic font-serif text-primary">{t('home.formacao.titleAccent')}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {t('home.formacao.desc')}
              </p>
              <ul className="space-y-3 pt-2">
                {formacaoItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/formacao')}
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
              >
                {t('home.formacao.cta')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-secondary ring-1 ring-border/40">
              <img
                src="https://i.ibb.co/bjyq508N/DR-MAURO-CURSO-DE-FORMA-O.jpg"
                alt="Curso de Formação"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* E-books do Clube */}
      {ebooks.length > 0 && (
        <section className="relative py-12 md:py-16">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
          <div className="max-w-6xl mx-auto px-5 md:px-6 mb-10">
            <motion.div {...fadeUp}>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('home.ebooks.eyebrow')}</span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">{t('home.ebooks.title')}</h3>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm md:text-base">
                {t('home.ebooks.desc')}
              </p>
            </motion.div>
          </div>

          <Marquee
            items={ebooks}
            duration={Math.max(60, Math.round(ebooks.length * 8.5))}
            renderItem={(eb) => (
              <Link
                to={`/livros-e-ebooks/ebook/${eb.id}`}
                className="group block w-[112px] md:w-[200px] text-left"
              >
                <div className="relative w-[112px] h-[168px] md:w-[200px] md:h-[300px] rounded-2xl overflow-hidden bg-muted shadow-md ring-1 ring-border/40 group-hover:shadow-xl group-hover:ring-primary/30 transition-all duration-500 group-hover:-translate-y-1">
                  {eb.cover_url && (
                    <img
                      src={eb.cover_url}
                      alt={eb.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <h4 className="mt-3 text-xs font-semibold leading-snug line-clamp-2">{eb.title}</h4>
                <motion.span
                  {...greenButtonAnim}
                  className="mt-2 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  {t('common.readMore')} <ArrowRight className="w-3 h-3" />
                </motion.span>
              </Link>
            )}
          />
        </section>
      )}

      {/* QUEM SOU EU */}
      <section id="quem-sou-eu" className="py-12 md:py-16 bg-secondary/30 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-5 md:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div {...fadeUp} className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 to-transparent rounded-[2rem] blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-border/40">
              <img
                src="https://i.ibb.co/358FCytk/DR-MAURO-2.jpg"
                alt="Dr. Mauro Kwitko"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-6 order-1 md:order-2">
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('home.about.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {t('home.about.titleStart')}<span className="italic font-serif text-primary">{t('home.about.titleAccent')}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {t('home.about.desc')}
            </p>
            <ul className="space-y-3 pt-2">
              {aboutItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-foreground/85">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/40">
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">10k+</p>
                <p className="text-xs text-muted-foreground mt-1">{t('home.about.stats.atendimentos')}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">25</p>
                <p className="text-xs text-muted-foreground mt-1">{t('home.about.stats.livros')}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">70+</p>
                <p className="text-xs text-muted-foreground mt-1">{t('home.about.stats.turmas')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('home.gallery.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">{t('home.gallery.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((g, i) => (
              <motion.div
                key={g.src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-secondary shadow-md ring-1 ring-border/40"
              >
                <img
                  src={g.src}
                  alt={g.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs md:text-sm font-semibold tracking-wide">{g.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-12 md:py-16 border-y border-border/40 bg-secondary/30">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-5 md:px-6 text-center">
          <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground">
            "{t('home.quote.text')}"
          </p>
          <p className="mt-8 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            {t('home.quote.author')}
          </p>
        </motion.div>
      </section>

      {/* ARTIGOS */}
      <section id="artigos" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('home.articles.eyebrow')}</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">{t('home.articles.title')}</h2>
            </div>
            <Link to="/artigos" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              {t('common.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {RECENT_ARTICLES.map((art, i) => (
              <motion.article
                key={art.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm hover:shadow-lg transition-all"
              >
                <Link to={`/artigos/${art.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={getArticleImage(art.slug)}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
                      {art.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{art.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      {t('common.readArticle')} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-12 md:py-16 bg-secondary/30 border-t border-border/40">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-5 md:px-6 text-center">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('home.contact.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 leading-tight">
            {t('home.contact.titleStart')}<span className="italic font-serif text-primary">{t('home.contact.titleAccent')}</span>
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed text-base md:text-lg">
            {t('home.contact.desc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="mailto:contato@maurokwitko.com.br"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" /> {t('home.contact.email')}
            </a>
            <a
              href="https://wa.me/5551999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success text-success-foreground text-sm font-semibold hover:bg-success/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> {t('home.contact.whatsapp')}
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
