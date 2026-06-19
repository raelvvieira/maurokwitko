import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Check,
  Clock,
  BookOpen,
  Users,
  Shield,
  GraduationCap,
  Radio,
  Music,
  Video,
  Lock,
  Star,
  Sparkles,
} from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';
import { getArrayTranslation } from '@/i18n';

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141';

const STAT_ICONS = [Clock, BookOpen, Users, Shield];

const CARD_ICONS = [BookOpen, GraduationCap, Radio, Users, Music, Video];

const FOOTER_STRIP_ICONS = [Star, Sparkles, BookOpen, GraduationCap];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ClubeDeEstudos = () => {
  const { t } = useTranslation();
  const { ebooks } = useEbooks();
  const ebookCovers = ebooks.filter((e) => e.cover_url);

  const heroStats = getArrayTranslation<string>(t('clube.hero.stats', { returnObjects: true }));
  const contentCards = getArrayTranslation<{ title: string; desc: string }>(
    t('clube.contentCards.items', { returnObjects: true })
  );
  const communityItems = getArrayTranslation<string>(t('clube.community.items', { returnObjects: true }));
  const testimonials = getArrayTranslation<{ text: string; name: string; role: string }>(
    t('clube.testimonials.items', { returnObjects: true })
  );
  const priceIncludes = getArrayTranslation<string>(t('clube.price.includes', { returnObjects: true }));
  const footerStrip = getArrayTranslation<string>(t('clube.footerStrip', { returnObjects: true }));

  return (
    <div className="bg-[#f5f2ed] min-h-screen overflow-hidden">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-36 md:pt-40 pb-0 grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-0 items-end">
        {/* left */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="space-y-6 pb-10 md:pb-16 z-10"
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-amber-700 uppercase">
            {t('clube.hero.eyebrow')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
            {t('clube.hero.title')}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md">
            {t('clube.hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <motion.a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-700 text-white text-sm font-bold hover:bg-amber-800 transition-colors shadow-md"
            >
              {t('clube.hero.cta')} <ArrowRight className="w-4 h-4" />
            </motion.a>
            <a
              href="#tudo-em-um-lugar"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 hover:bg-white/60 transition-colors"
            >
              {t('clube.hero.cta2')}
            </a>
          </div>
          {/* social proof pill */}
          <div className="inline-flex items-center gap-3 bg-white/80 border border-slate-200 rounded-full px-4 py-2 shadow-sm">
            <div className="flex -space-x-2">
              {['#a78bfa','#60a5fa','#34d399'].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-xs text-slate-600 font-medium">{t('clube.hero.socialProof')}</span>
          </div>
        </motion.div>

        {/* right — photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-end items-end"
        >
          <div className="w-full max-w-md md:max-w-none rounded-t-3xl overflow-hidden shadow-2xl">
            <img
              src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
              alt="Dr. Mauro Kwitko"
              className="w-full object-cover object-top"
              style={{ maxHeight: 520 }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-white border-y border-slate-200/80 py-5">
        <div className="max-w-4xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {heroStats.map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <div key={i} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">{s}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TUDO EM UM SÓ LUGAR ── */}
      <section id="tudo-em-um-lugar" className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12"
          >
            {t('clube.contentCards.title')}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {contentCards.map((card, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length];
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } } }}
                  className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight mb-1.5">{card.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-snug">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMUNIDADE ── */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20 md:pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* left — text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              {t('clube.community.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('clube.community.desc')}
            </p>
            <ul className="space-y-3">
              {communityItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                  <Check className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* right — photo + testimonial overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Comunidade"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
            {/* testimonial card overlay */}
            {testimonials[0] && (
              <div className="absolute bottom-5 left-5 right-10 bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
                <p className="text-xs text-slate-600 italic leading-relaxed mb-3">
                  "{testimonials[0].text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xs shrink-0">
                    {testimonials[0].name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{testimonials[0].name}</div>
                    <div className="text-[10px] text-slate-500">{testimonials[0].role}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── ACERVO ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 text-center mb-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {t('clube.acervo.title')}
            </h2>
          </motion.div>
        </div>
        {ebookCovers.length > 0 && (
          <Marquee
            items={ebookCovers}
            duration={Math.max(40, ebookCovers.length * 8)}
            renderItem={(e) => (
              <div className="block w-[120px] h-[170px] md:w-[150px] md:h-[212px] rounded-xl overflow-hidden shadow-md ring-1 ring-slate-200 relative shrink-0">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-amber-700 transition-colors"
          >
            Ver biblioteca completa <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-16 md:py-24 bg-[#f5f2ed]">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 items-center shadow-sm"
          >
            {/* left — description */}
            <div className="space-y-4 md:col-span-1">
              <h3 className="text-xl font-bold text-slate-900">{t('clube.price.title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t('clube.price.desc')}</p>
              <ul className="space-y-2">
                {priceIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-4 h-4 rounded-full border border-amber-700/40 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-amber-700" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* center — price */}
            <div className="text-center md:border-x border-slate-200 md:px-8">
              <span className="text-sm text-slate-500 font-medium">R$</span>
              <div className="text-7xl font-bold text-slate-900 leading-none my-1">29</div>
              <span className="text-slate-500 text-sm">/mês</span>
              <div className="mt-3 inline-block text-[11px] font-medium text-slate-400 bg-slate-100 rounded-full px-3 py-1">
                {t('clube.price.badge')}
              </div>
            </div>

            {/* right — CTA */}
            <div className="flex flex-col items-center gap-3">
              <motion.a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-amber-700 text-white font-bold text-sm hover:bg-amber-800 transition-colors shadow-md"
              >
                {t('clube.price.cta')} <ArrowRight className="w-4 h-4" />
              </motion.a>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Lock className="w-3 h-3" />
                {t('clube.price.note')}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <section className="bg-white border-t border-slate-200 py-5">
        <div className="max-w-4xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {footerStrip.map((s, i) => {
            const Icon = FOOTER_STRIP_ICONS[i % FOOTER_STRIP_ICONS.length];
            return (
              <div key={i} className="flex items-center gap-2.5 justify-center md:justify-start">
                <Icon className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs text-slate-600">{s}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ClubeDeEstudos;
