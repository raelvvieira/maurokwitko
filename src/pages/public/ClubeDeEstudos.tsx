import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Check,
  X,
  Clock,
  BookOpen,
  Users,
  Headphones,
  MessageCircle,
  Music,
  Video,
  Quote,
} from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';
import { getArrayTranslation } from '@/i18n';

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141';

const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  'https://i.ibb.co/v6fpPVzb/HINOS-DE-PAZ-2.png',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
];

const CARD_ICONS = [BookOpen, Video, Headphones, MessageCircle, Music, BookOpen];

const HERO_STATS_ICONS = [Clock, BookOpen, Users, Check];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const ClubeDeEstudos = () => {
  const { t } = useTranslation();
  const { ebooks } = useEbooks();
  const ebookCovers = ebooks.filter((e) => e.cover_url);

  const heroStats = getArrayTranslation<string>(t('clube.hero.stats', { returnObjects: true }));
  const painItems = getArrayTranslation<string>(t('clube.pain.items', { returnObjects: true }));
  const contentCards = getArrayTranslation<{ title: string; desc: string }>(
    t('clube.contentCards.items', { returnObjects: true })
  );
  const communityItems = getArrayTranslation<string>(t('clube.community.items', { returnObjects: true }));
  const bioStats = getArrayTranslation<{ value: string; label: string }>(
    t('clube.bio.stats', { returnObjects: true })
  );
  const testimonials = getArrayTranslation<{ text: string; name: string; role: string }>(
    t('clube.testimonials.items', { returnObjects: true })
  );
  const outsideItems = getArrayTranslation<string>(t('clube.comparison.outsideItems', { returnObjects: true }));
  const insideItems = getArrayTranslation<string>(t('clube.comparison.insideItems', { returnObjects: true }));
  const priceIncludes = getArrayTranslation<string>(t('clube.price.includes', { returnObjects: true }));
  const faq = getArrayTranslation<{ q: string; a: string }>(t('clube.faq.items', { returnObjects: true }));

  return (
    <div className="overflow-hidden">
      {/* ── HERO ── */}
      <section className="bg-[#0d1a11] text-white pt-32 md:pt-36 pb-0">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-end">
          {/* left */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="space-y-6 pb-12 md:pb-20"
          >
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-emerald-400 uppercase border border-emerald-400/40 rounded-full px-3 py-1">
              {t('clube.hero.eyebrow')}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              {t('clube.hero.titleStart')}{' '}
              <span className="text-[#c9a84c] italic font-serif">{t('clube.hero.titleAccent')}</span>{' '}
              {t('clube.hero.titleEnd')}
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-lg">
              {t('clube.hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <motion.a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-colors shadow-lg"
              >
                {t('clube.hero.cta')} <ArrowRight className="w-4 h-4" />
              </motion.a>
              <a
                href="#o-que-recebe"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:border-white/60 transition-colors"
              >
                {t('clube.hero.cta2')}
              </a>
            </div>
            {/* trust strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {heroStats.map((s, i) => {
                const Icon = HERO_STATS_ICONS[i % HERO_STATS_ICONS.length];
                return (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{s}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
          {/* right — photo flush to bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex items-end justify-center md:justify-end"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[70%] bg-emerald-900/30 blur-3xl rounded-full" />
            <img
              src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
              alt="Dr. Mauro Kwitko"
              className="relative w-full max-w-sm md:max-w-none md:w-[92%] object-cover object-top rounded-t-3xl"
              style={{ maxHeight: 560 }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── DOR ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        {/* left */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 md:mb-0">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
              alt="Estudante refletindo"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </motion.div>
        {/* right */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">
            {t('clube.pain.title')}
          </h2>
          <ul className="space-y-3">
            {painItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-border/60 pt-8 space-y-3">
            <h3 className="text-xl md:text-2xl font-bold">{t('clube.pain.solutionTitle')}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{t('clube.pain.solutionDesc')}</p>
          </div>
        </motion.div>
      </section>

      {/* ── O QUE VOCÊ RECEBE ── */}
      <section id="o-que-recebe" className="bg-secondary/30 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              {t('clube.contentCards.title')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contentCards.map((card, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length];
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { duration: 0.45, delay: i * 0.07 } } }}
                  className="bg-background rounded-2xl overflow-hidden shadow-md ring-1 ring-border/40 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={CARD_IMAGES[i]}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h3 className="font-bold text-base">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMUNIDADE ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#0d1a11]/85" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 text-white">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl space-y-6"
          >
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-emerald-400 uppercase border border-emerald-400/40 rounded-full px-3 py-1">
              {t('clube.community.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {t('clube.community.title')}
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              {t('clube.community.desc')}
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-4">
              {communityItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── BIO + TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* bio left */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t('clube.bio.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('clube.bio.desc')}</p>
            <div className="grid grid-cols-2 gap-4">
              {bioStats.map((s, i) => (
                <div key={i} className="rounded-2xl p-4 bg-secondary/50 border border-border/50">
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* photo + testimonials right */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-5"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
                alt="Dr. Mauro Kwitko"
                className="w-full aspect-[4/3] object-cover object-top"
              />
            </div>
            <h3 className="text-xl font-bold pt-2">{t('clube.testimonials.title')}</h3>
            {testimonials.map((t_item, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 bg-secondary/40 border border-border/50 space-y-3"
              >
                <Quote className="w-5 h-5 text-primary/50" />
                <p className="text-sm text-foreground/85 leading-relaxed italic">"{t_item.text}"</p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t_item.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t_item.name}</div>
                    <div className="text-xs text-muted-foreground">{t_item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ACERVO ── */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 text-center mb-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              {t('clube.acervo.eyebrow')}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3">
              {t('clube.acervo.title')}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              {t('clube.acervo.desc')}
            </p>
          </motion.div>
        </div>
        {ebookCovers.length > 0 && (
          <Marquee
            items={ebookCovers}
            duration={Math.max(40, ebookCovers.length * 8)}
            renderItem={(e) => (
              <div className="block w-[140px] h-[200px] md:w-[170px] md:h-[240px] rounded-xl overflow-hidden bg-muted shadow-md ring-1 ring-border/40 relative">
                <img
                  src={e.cover_url ?? ''}
                  alt={e.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          />
        )}
        <div className="text-center mt-8">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-secondary transition-colors"
          >
            Ver biblioteca completa
          </a>
        </div>
      </section>

      {/* ── COMPARISON + PRICE ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            {t('clube.comparison.title')}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* comparison table */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-border/60 overflow-hidden"
          >
            <div className="grid grid-cols-2">
              <div className="p-5 bg-secondary/40 border-b border-r border-border/60">
                <span className="text-sm font-bold text-muted-foreground">{t('clube.comparison.outside')}</span>
              </div>
              <div className="p-5 bg-primary/10 border-b border-border/60">
                <span className="text-sm font-bold text-primary">{t('clube.comparison.inside')}</span>
              </div>
            </div>
            {outsideItems.map((out, i) => (
              <div key={i} className={`grid grid-cols-2 ${i < outsideItems.length - 1 ? 'border-b border-border/40' : ''}`}>
                <div className="p-4 flex items-start gap-2 bg-secondary/20 border-r border-border/40">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{out}</span>
                </div>
                <div className="p-4 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs text-foreground/85">{insideItems[i]}</span>
                </div>
              </div>
            ))}
          </motion.div>
          {/* price card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl p-8 md:p-10 bg-[#0d1a11] text-white shadow-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold tracking-wider uppercase mb-5">
              {t('clube.price.badge')}
            </div>
            <h3 className="text-lg font-bold">{t('clube.price.title')}</h3>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-xl font-bold text-white/60">R$</span>
              <span className="text-6xl font-bold tracking-tight">29</span>
              <span className="text-base text-white/60 mb-2">{t('clube.price.perMonth')}</span>
            </div>
            <ul className="mt-6 space-y-2.5 grid grid-cols-2 gap-x-4">
              {priceIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-8 block w-full text-center px-6 py-4 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-lg"
            >
              {t('clube.price.cta')}
            </motion.a>
            <p className="text-xs text-white/40 mt-3 text-center">{t('clube.price.note')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
            {t('clube.faq.eyebrow')}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3">
            {t('clube.faq.title')}
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {faq.map((f, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { duration: 0.4, delay: i * 0.08 } } }}
              className="rounded-2xl p-5 border border-border/60 bg-secondary/20"
            >
              <h3 className="font-bold text-sm">{f.q}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-[#0d1a11] text-white py-20 md:py-28 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-2xl mx-auto px-5 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('clube.ctaFinal.title')}
          </h2>
          <p className="text-white/65 text-base">{t('clube.ctaFinal.desc')}</p>
          <motion.a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-xl text-base"
          >
            {t('clube.ctaFinal.button')} <ArrowRight className="w-5 h-5" />
          </motion.a>
          <p className="text-white/35 text-xs">Ambiente seguro e cancelamento fácil.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default ClubeDeEstudos;
