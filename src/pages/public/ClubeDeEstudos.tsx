import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Users,
  Video,
  BookOpen,
  Music,
  GraduationCap,
  Sparkles,
  Heart,
  Gift,
  Tag,
} from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';

const HINOS_COVERS = [
  'https://i.ibb.co/v6fpPVzb/HINOS-DE-PAZ-2.png',
  'https://i.ibb.co/q3GHxr4p/HINOS-DE-AMOR-2.png',
  'https://i.ibb.co/TDs4sdxQ/HINOS-DE-F-2-2.png',
];

const BENEFIT_ICONS = [Users, MessageCircle, Video, BookOpen];
const FEATURE_ICONS = [BookOpen, Video, GraduationCap];
const FEATURE_COVERS = [
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80',
];

const ClubeDeEstudos = () => {
  const { t } = useTranslation();
  const { ebooks } = useEbooks();
  const ebookCovers = ebooks.filter((e) => e.cover_url);

  const benefits = t('clube.benefits', { returnObjects: true }) as { title: string; desc: string }[];
  const features = t('clube.features', { returnObjects: true }) as { title: string; desc: string }[];
  const priceIncludes = t('clube.price.includes', { returnObjects: true }) as string[];
  const communityItems = t('clube.community.items', { returnObjects: true }) as string[];
  const faq = t('clube.faq.items', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('clube.hero.eyebrow')}</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {t('clube.hero.titleStart')} <br />
            <span className="italic font-serif text-primary">{t('clube.hero.titleAccent')}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t('clube.hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <a
                href="https://chk.eduzz.com/2445141"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 text-white text-sm md:text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                {t('clube.hero.cta')} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <span className="text-xs text-muted-foreground">{t('clube.hero.cancel')}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 to-accent/20 rounded-[2rem] blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/40">
            <img
              src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
              alt="Dr. Mauro Kwitko"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="max-w-6xl mx-auto px-5 md:px-6 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
            const palettes = [
              { ring: 'ring-primary/30', grad: 'from-primary/15 via-primary/5 to-transparent', icon: 'bg-primary/15 text-primary', title: 'text-primary' },
              { ring: 'ring-emerald-500/30', grad: 'from-emerald-500/15 via-emerald-500/5 to-transparent', icon: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400', title: 'text-emerald-700 dark:text-emerald-400' },
              { ring: 'ring-amber-500/30', grad: 'from-amber-500/15 via-amber-500/5 to-transparent', icon: 'bg-amber-500/20 text-amber-700 dark:text-amber-400', title: 'text-amber-700 dark:text-amber-400' },
              { ring: 'ring-accent/40', grad: 'from-accent/20 via-accent/5 to-transparent', icon: 'bg-accent/20 text-accent-foreground', title: 'text-foreground' },
            ];
            const p = palettes[i % palettes.length];
            return (
              <div
                key={i}
                className={`rounded-3xl p-6 md:p-7 bg-gradient-to-br ${p.grad} ring-1 ${p.ring} shadow-md hover:shadow-lg transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-2xl ${p.icon} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-lg md:text-xl font-bold tracking-tight ${p.title}`}>{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PERKS */}
      <section className="max-w-5xl mx-auto px-5 md:px-6 mt-20">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent ring-1 ring-emerald-500/30 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              {t('clube.perks.ebooksTitleA')} <span className="text-emerald-700 dark:text-emerald-400">{t('clube.perks.ebooksTitleB')}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {t('clube.perks.ebooksDesc')}
            </p>
          </div>
          <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent ring-1 ring-primary/30 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-4">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-primary">{t('clube.perks.discountTitleA')}</span> {t('clube.perks.discountTitleB')}
            </h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {t('clube.perks.discountDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* ACERVO */}
      <section className="mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-6 text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('clube.acervo.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
            {t('clube.acervo.title')}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t('clube.acervo.desc')}
          </p>
        </div>
        {ebookCovers.length > 0 && (
          <Marquee
            items={ebookCovers}
            duration={Math.max(40, ebookCovers.length * 8)}
            renderItem={(e) => (
              <div className="block w-[160px] h-[226px] md:w-[200px] md:h-[283px] rounded-xl overflow-hidden bg-muted shadow-md ring-1 ring-border/40 relative">
                <img src={e.cover_url ?? ''} alt={e.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}
          />
        )}
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-5 md:px-6 mt-24 space-y-16">
        {features.map((f, idx) => {
          const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg ring-1 ring-border/40">
                <img src={FEATURE_COVERS[idx]} alt={f.title} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              </div>
            </motion.div>
          );
        })}

        {/* Hinários */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{t('clube.hinarios.title')}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('clube.hinarios.desc')}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {HINOS_COVERS.map((c) => (
              <div key={c} className="rounded-xl overflow-hidden ring-1 ring-border/40 shadow-md aspect-square">
                <img src={c} alt="Hinário" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* COMMUNITY */}
      <section className="max-w-5xl mx-auto px-5 md:px-6 mt-24">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-primary/10 via-background to-accent/10 ring-1 ring-border/40 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('clube.community.eyebrow')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('clube.community.title')}</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-base md:text-lg">
            {t('clube.community.desc')}
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mt-6">
            {communityItems.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRICE */}
      <section className="max-w-xl mx-auto px-5 md:px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-8 md:p-10 bg-background ring-2 ring-primary shadow-2xl text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" /> {t('clube.price.badge')}
          </div>
          <h3 className="text-xl font-bold">{t('clube.price.title')}</h3>
          <div className="mt-5 flex items-end justify-center gap-1">
            <span className="text-2xl font-bold text-muted-foreground">R$</span>
            <span className="text-6xl font-bold tracking-tight">29</span>
            <span className="text-base text-muted-foreground mb-2">{t('clube.price.perMonth')}</span>
          </div>
          <ul className="mt-7 space-y-3 text-left">
            {priceIncludes.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-8"
          >
            <a
              href="https://chk.eduzz.com/2445141"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 rounded-full bg-emerald-600 text-white text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              {t('clube.price.cta')}
            </a>
          </motion.div>
          <p className="text-xs text-muted-foreground mt-3">{t('clube.price.note')}</p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-5 md:px-6 mt-24">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('clube.faq.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">{t('clube.faq.title')}</h2>
        </div>
        <div className="space-y-3">
          {faq.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl p-5 bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40"
            >
              <h3 className="font-bold text-base">{f.q}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-3xl mx-auto px-5 md:px-6 mt-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('clube.ctaFinal.title')}</h2>
        <p className="text-muted-foreground mt-4">{t('clube.ctaFinal.desc')}</p>
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-7 inline-block"
        >
          <a
            href="https://chk.eduzz.com/2445141"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
          >
            {t('clube.ctaFinal.button')} <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default ClubeDeEstudos;
