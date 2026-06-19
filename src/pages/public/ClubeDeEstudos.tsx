import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, Check, ChevronDown, Lock,
  ArrowLeftRight, Users, MessageCircle, Sparkles, BookOpen, Lightbulb,
  Music, Video, FileText, Gift,
} from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';
import { getArrayTranslation } from '@/i18n';

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141';

// imagens geradas com Magnif para a seção Aprendizados
const APRENDIZADOS_IMAGES = [
  'https://pikaso.cdnpk.net/private/production/4642693844/render.jpg?token=exp=1782259200~hmac=ec8384e8d2bd11300eb3ff728a763051d7139ec15db2f359500907a677da93ae',
  'https://pikaso.cdnpk.net/private/production/4642693561/render.jpg?token=exp=1782259200~hmac=59721a878b7640ac42cf927ca18502569a7b0077b5525ec49c62c9d6605a1449',
  'https://pikaso.cdnpk.net/private/production/4642693325/render.jpg?token=exp=1782259200~hmac=b57f6a27b685f68bda5cf623d0e198b5564afe3a20804c3ffbdf691bfb4d4067',
  'https://pikaso.cdnpk.net/private/production/4642693801/render.jpg?token=exp=1782259200~hmac=5d6dc27b4017d081c0502e87b0462cfb78e494e71e0ce2d54398e16539b31495',
  'https://pikaso.cdnpk.net/private/production/4642694314/render.jpg?token=exp=1782259200~hmac=f36978a576665f0334902999faf7dc607682f6b4e49ec58b098fc004654f169f',
  'https://pikaso.cdnpk.net/private/production/4642694195/render.jpg?token=exp=1782259200~hmac=e7968d4264e9e549482d5091c637a9e698fccee11e1e60aa6d4aa62b3e22151d',
  'https://pikaso.cdnpk.net/private/production/4642694326/render.jpg?token=exp=1782259200~hmac=7214c2832c5306f03be45a2b182cea7546cd4f9baf0cbf15b77e40e6c8bb7e08',
  'https://pikaso.cdnpk.net/private/production/4642694688/render.jpg?token=exp=1782259200~hmac=206d1b3b63ba7e26ffe2047979d89e15f39152448188ae43f5fd16f7ba2a6fcf',
];

const COMMUNITY_ICONS = [ArrowLeftRight, Users, MessageCircle, Sparkles, BookOpen, Lightbulb];
const EXTRAS_ICONS = [Music, Video, FileText, Gift];

const glass = 'bg-white/75 backdrop-blur-2xl border border-black/[0.06] shadow-sm';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
};

// ── FAQ item ──
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${glass} rounded-2xl overflow-hidden`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-semibold text-[#141414] text-base pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#5F5F5F] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#5F5F5F] text-base leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ClubeDeEstudos = () => {
  const { t } = useTranslation();
  const { ebooks } = useEbooks();
  const ebookCovers = ebooks.filter((e) => e.cover_url);

  const aprendizados = getArrayTranslation<{ title: string; desc: string }>(
    t('clube.aprendizados.items', { returnObjects: true })
  );
  const bibliotecaGrid = getArrayTranslation<{ title: string }>(
    t('clube.biblioteca.grid', { returnObjects: true })
  );
  const communityItems = getArrayTranslation<{ title: string }>(
    t('clube.community.items', { returnObjects: true })
  );
  const extras = getArrayTranslation<{ title: string; desc: string }>(
    t('clube.extras.items', { returnObjects: true })
  );
  const bioStats = getArrayTranslation<{ value: string; label: string }>(
    t('clube.bio.stats', { returnObjects: true })
  );
  const ancoragemItems = getArrayTranslation<{ label: string; value: string }>(
    t('clube.ancoragem.items', { returnObjects: true })
  );
  const priceIncludes = getArrayTranslation<string>(
    t('clube.price.includes', { returnObjects: true })
  );
  const paraQuemItems = getArrayTranslation<string>(
    t('clube.paraQuem.items', { returnObjects: true })
  );
  const faq = getArrayTranslation<{ q: string; a: string }>(
    t('clube.faq.items', { returnObjects: true })
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen overflow-x-hidden" style={{ fontFamily: 'Inter, SF Pro Display, sans-serif' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] max-w-7xl mx-auto px-5 md:px-10 pt-20 md:pt-24 pb-0 grid md:grid-cols-[60fr_40fr] gap-8 md:gap-0 items-end">
        {/* text */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="pb-10 md:pb-16 space-y-6 z-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-[#4F8F87] uppercase">
            {t('clube.hero.eyebrow')}
          </span>
          <h1
            className="font-bold leading-[1.05] tracking-tight text-[#141414]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', maxWidth: 900 }}
          >
            {t('clube.hero.title')}
          </h1>
          <p className="text-[#5F5F5F] leading-[1.6]" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: 700 }}>
            {t('clube.hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <motion.a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 px-7 font-semibold text-white rounded-2xl bg-[#4F8F87] hover:bg-[#3C726B] transition-colors shadow-md"
              style={{ height: 56, fontSize: 16 }}
            >
              {t('clube.hero.cta')} <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-end items-end self-end"
        >
          <div className="w-full rounded-t-[2rem] overflow-hidden shadow-2xl">
            <img
              src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
              alt="Dr. Mauro Kwitko"
              className="w-full object-cover object-top"
              style={{ maxHeight: 580 }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── APRENDIZADOS ── */}
      <section className="py-14 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-5xl mx-auto px-5 md:px-10 text-center mb-10"
        >
          <h2 className="font-bold text-[#141414] mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
            {t('clube.aprendizados.title')}
          </h2>
          <p className="text-[#5F5F5F] text-base">{t('clube.aprendizados.subtitle')}</p>
        </motion.div>

        {/* horizontal scroll carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-5 px-5 md:px-10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ width: 'max-content' }}
          >
            {[...aprendizados, ...aprendizados].map((item, i) => (
              <div
                key={i}
                className={`relative rounded-3xl overflow-hidden shrink-0 group hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-300 cursor-default`}
                style={{ width: 280, height: 380 }}
              >
                <img
                  src={APRENDIZADOS_IMAGES[i % APRENDIZADOS_IMAGES.length]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-base mb-1.5">{item.title}</h3>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BIBLIOTECA ── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start mb-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="font-bold text-[#141414] leading-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
                {t('clube.biblioteca.title')}
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-5"
            >
              <p className="text-[#5F5F5F] leading-relaxed text-base">
                {t('clube.biblioteca.desc')}
              </p>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F8F87] hover:text-[#3C726B] transition-colors"
              >
                {t('clube.biblioteca.cta')} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* book marquee */}
          {ebookCovers.length > 0 && (
            <div className="mb-10 -mx-5 md:-mx-10">
              <Marquee
                items={ebookCovers}
                duration={Math.max(40, ebookCovers.length * 8)}
                renderItem={(e) => (
                  <div
                    className="block w-[120px] h-[170px] rounded-xl overflow-hidden shadow-md border border-black/[0.06] relative shrink-0 hover:scale-105 transition-transform duration-300"
                  >
                    <img src={e.cover_url ?? ''} alt={e.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                )}
              />
            </div>
          )}

          {/* grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bibliotecaGrid.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${glass} rounded-2xl px-5 py-4 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300`}
              >
                <span className="text-sm font-semibold text-[#141414]">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMUNIDADE ── */}
      <section className="py-14 md:py-20" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F7F8 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          {/* photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src="https://pikaso.cdnpk.net/private/production/4647065620/render.jpg?token=exp=1782259200~hmac=404c1dbc351fd1fb6e158256035fe73b5d1757665a82248cbea0cde7561afdd9"
              alt="Comunidade"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-7"
          >
            <h2 className="font-bold text-[#141414] leading-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
              {t('clube.community.title')}
            </h2>
            <p className="text-[#5F5F5F] leading-relaxed text-base">{t('clube.community.desc')}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {communityItems.map((item, i) => {
                const Icon = COMMUNITY_ICONS[i % COMMUNITY_ICONS.length];
                return (
                  <div key={i} className={`${glass} rounded-2xl px-4 py-3 flex items-center gap-2.5`}>
                    <div className="w-7 h-7 rounded-lg bg-[#4F8F87]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#4F8F87]" />
                    </div>
                    <span className="text-sm font-semibold text-[#141414]">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXTRAS ── */}
      <section className="bg-[#FAF8F5] py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-bold text-[#141414] text-center mb-10"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}
          >
            {t('clube.extras.title')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {extras.map((item, i) => {
              const Icon = EXTRAS_ICONS[i % EXTRAS_ICONS.length];
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`${glass} rounded-2xl p-5 space-y-3 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#4F8F87]/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-[#4F8F87]" style={{ width: 18, height: 18 }} />
                  </div>
                  <h3 className="font-bold text-[#141414] text-sm">{item.title}</h3>
                  <p className="text-[#5F5F5F] text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BIO ── */}
      <section className="bg-[#FAF8F5] pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
              alt="Dr. Mauro Kwitko"
              className="w-full aspect-[3/4] object-cover object-top"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="font-bold text-[#141414]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
              {t('clube.bio.title')}
            </h2>
            <p className="text-[#5F5F5F] leading-relaxed text-base">{t('clube.bio.desc')}</p>
            <div className="grid grid-cols-2 gap-3">
              {bioStats.map((s, i) => (
                <div key={i} className={`${glass} rounded-2xl p-5`}>
                  <div className="text-2xl font-bold text-[#141414]">{s.value}</div>
                  <div className="text-xs text-[#5F5F5F] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ANCORAGEM DE PREÇO ── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-bold text-[#141414] text-center mb-10"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}
          >
            {t('clube.ancoragem.title')}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-3"
          >
            {ancoragemItems.map((item, i) => (
              <div
                key={i}
                className={`${glass} rounded-2xl px-6 py-4 flex items-center justify-between`}
              >
                <span className="text-[#141414] font-medium text-sm md:text-base">{item.label}</span>
                <span className="text-[#5F5F5F] font-semibold text-sm md:text-base">{item.value}</span>
              </div>
            ))}
            <div className="h-px bg-black/[0.08] my-6" />
            <div className={`${glass} rounded-2xl px-6 py-5 flex items-center justify-between`}>
              <div>
                <div className="text-xs text-[#5F5F5F] font-medium mb-0.5">{t('clube.ancoragem.totalLabel')}</div>
                <div className="text-3xl md:text-4xl font-bold text-[#141414]">{t('clube.ancoragem.totalValue')}</div>
              </div>
              <div className="text-right max-w-[160px]">
                <p className="text-xs text-[#5F5F5F] leading-snug">{t('clube.ancoragem.totalNote')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OFERTA / PRICE ── */}
      <section className="bg-[#FAF8F5] py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-5 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className={`${glass} rounded-3xl p-8 md:p-12 shadow-xl`}
          >
            <h2 className="font-bold text-[#141414] text-xl md:text-2xl mb-6">
              {t('clube.price.title')}
            </h2>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-[#5F5F5F] text-xl font-semibold mb-1">R$</span>
              <span className="text-7xl font-bold text-[#141414] leading-none">29</span>
              <span className="text-[#5F5F5F] mb-2">/mês</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {priceIncludes.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F8F87] shrink-0" />
                  <span className="text-sm text-[#141414] font-medium">{item}</span>
                </div>
              ))}
            </div>
            <motion.a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center gap-2 w-full text-white font-bold rounded-[18px] bg-[#4F8F87] hover:bg-[#3C726B] transition-colors shadow-md"
              style={{ height: 64, fontSize: 16 }}
            >
              {t('clube.price.cta')} <ArrowRight className="w-5 h-5" />
            </motion.a>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-[#5F5F5F]">
                <Lock className="w-3 h-3" />
                {t('clube.price.badgeBottom1')}
              </div>
              <div className="text-xs text-[#5F5F5F]">{t('clube.price.badgeBottom2')}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PARA QUEM É ── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-bold text-[#141414] mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}>
              {t('clube.paraQuem.title')}
            </h2>
            <p className="text-[#5F5F5F] text-base">{t('clube.paraQuem.desc')}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paraQuemItems.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${glass} rounded-2xl px-5 py-4 flex items-start gap-3`}
              >
                <Check className="w-4 h-4 text-[#4F8F87] mt-0.5 shrink-0" />
                <span className="text-sm text-[#141414] font-medium leading-snug">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#FAF8F5] py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-bold text-[#141414] text-center mb-8"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}
          >
            {t('clube.faq.title')}
          </motion.h2>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-white py-16 md:py-24 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-2xl mx-auto px-5 space-y-8"
        >
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-[#141414] leading-tight italic">
              "{t('clube.ctaFinal.quote')}"
            </p>
            <p className="text-[#5F5F5F] text-sm font-medium">— {t('clube.ctaFinal.quoteAuthor')}</p>
          </div>
          <div className="h-px bg-black/[0.06] max-w-xs mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#141414]">
            {t('clube.ctaFinal.title')}
          </h2>
          <motion.a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-9 font-bold text-white rounded-2xl bg-[#4F8F87] hover:bg-[#3C726B] transition-colors shadow-md"
            style={{ height: 56, fontSize: 16 }}
          >
            {t('clube.ctaFinal.button')} <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default ClubeDeEstudos;
