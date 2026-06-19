import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  BadgeCheck,
  BookMarked,
  BookOpen,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Gift,
  HeartHandshake,
  Lightbulb,
  Lock,
  MessageCircle,
  Music,
  PlayCircle,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';
import { getArrayTranslation } from '@/i18n';

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141';

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

const HERO_IMAGE = 'https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg';
const COMMUNITY_IMAGE =
  'https://pikaso.cdnpk.net/private/production/4647065620/render.jpg?token=exp=1782259200~hmac=404c1dbc351fd1fb6e158256035fe73b5d1757665a82248cbea0cde7561afdd9';

const COMMUNITY_ICONS = [HeartHandshake, Users, MessageCircle, Sparkles, BookOpen, Lightbulb];
const EXTRAS_ICONS = [Music, PlayCircle, FileText, Gift];
const BIBLIOTECA_ICONS = [BookMarked, BookOpen, ScrollText, FileText, Sparkles, BadgeCheck];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: i * 0.055, ease: 'easeOut' },
  }),
};

const sectionTitle =
  'text-balance font-serif text-[1.9rem] leading-[1.06] tracking-tight text-[#1B120D] sm:text-4xl md:text-5xl';
const mutedText = 'text-[15px] leading-7 text-[#6E5E54] md:text-base';
const shell = 'border border-[#E9DED0] bg-[#FFFDFC]/85 shadow-[0_18px_55px_rgba(67,43,27,0.08)]';
const darkShell = 'border border-white/10 bg-white/[0.075] shadow-[0_24px_70px_rgba(0,0,0,0.28)]';

const IconSeal = ({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) => (
  <div
    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
      dark ? 'bg-[#D6A96B]/14 text-[#F0D3A5]' : 'bg-[#7A3F24]/10 text-[#7A3F24]'
    }`}
  >
    {children}
  </div>
);

const CtaButton = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.a
    href={CHECKOUT_URL}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#7A3F24] px-6 text-center text-[15px] font-bold text-white shadow-[0_16px_34px_rgba(122,63,36,0.28)] transition-colors hover:bg-[#65321C] focus:outline-none focus:ring-4 focus:ring-[#D6A96B]/35 ${className}`}
  >
    {children}
  </motion.a>
);

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${shell} overflow-hidden rounded-[1.4rem]`}>
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
      >
        <span className="text-[15px] font-bold leading-snug text-[#1B120D] md:text-base">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#7A3F24] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
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
            <p className="px-5 pb-5 text-[15px] leading-7 text-[#6E5E54] md:px-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ClubeDeEstudos = () => {
  const { t } = useTranslation();
  const { ebooks } = useEbooks();
  const ebookCovers = ebooks.filter((ebook) => ebook.cover_url);

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
    <div
      className="min-h-screen overflow-x-hidden bg-[#F8F2EA] text-[#1B120D]"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
    >
      <section className="relative isolate overflow-hidden bg-[#2A1A13] pt-24 text-white md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(214,169,107,0.22),transparent_30%),linear-gradient(135deg,#2A1A13_0%,#463020_56%,#1C120D_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#F8F2EA] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 md:grid-cols-[1.03fr_0.97fr] md:items-end md:px-10 md:pb-16">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-6 pb-2 md:pb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F0D3A5] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {t('clube.hero.eyebrow')}
            </div>
            <h1 className="text-balance font-serif text-[2.45rem] font-bold leading-[0.98] tracking-tight sm:text-6xl md:max-w-3xl md:text-7xl">
              {t('clube.hero.title')}
            </h1>
            <p className="max-w-2xl text-[1.02rem] leading-8 text-[#E8D8C6]/86 md:text-xl">
              {t('clube.hero.desc')}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton className="w-full bg-[#D6A96B] text-[#24150E] hover:bg-[#E0B879] sm:w-auto">
                {t('clube.hero.cta')} <ArrowRight className="h-4 w-4" />
              </CtaButton>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#E8D8C6]/78 sm:justify-start">
                <Lock className="h-3.5 w-3.5" />
                {t('clube.price.badgeBottom1')} | {t('clube.price.badgeBottom2')}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[430px] md:max-w-none"
          >
            <div className="absolute -left-3 top-8 z-10 rounded-2xl border border-white/12 bg-[#150D09]/72 px-4 py-3 text-white shadow-2xl backdrop-blur md:-left-8">
              <div className="text-3xl font-black leading-none">R$29</div>
              <div className="mt-1 text-[11px] font-semibold text-[#E8D8C6]/74">{t('clube.price.perMonth')}</div>
            </div>
            <div className="overflow-hidden rounded-t-[2.3rem] border border-white/10 bg-white/10 shadow-[0_32px_90px_rgba(0,0,0,0.38)]">
              <img src={HERO_IMAGE} alt="Dr. Mauro Kwitko" className="h-[440px] w-full object-cover object-top md:h-[610px]" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F8F2EA] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-8 max-w-3xl md:mb-12"
          >
            <h2 className={sectionTitle}>{t('clube.aprendizados.title')}</h2>
            <p className={`${mutedText} mt-4`}>{t('clube.aprendizados.subtitle')}</p>
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-4 px-4 sm:px-6 md:gap-5 md:px-10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
          >
            {[...aprendizados, ...aprendizados].map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="group relative h-[360px] w-[245px] shrink-0 overflow-hidden rounded-[1.7rem] bg-[#2A1A13] shadow-[0_22px_55px_rgba(67,43,27,0.16)] md:h-[410px] md:w-[300px]"
              >
                <img
                  src={APRENDIZADOS_IMAGES[index % APRENDIZADOS_IMAGES.length]}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17100C] via-[#17100C]/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-4 h-px w-12 bg-[#D6A96B]" />
                  <h3 className="text-lg font-black leading-tight text-white">{item.title}</h3>
                  <p className="mt-2 line-clamp-4 text-sm leading-6 text-white/72">{item.desc}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FFFDFC] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className={sectionTitle}>{t('clube.biblioteca.title')}</h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`${shell} rounded-[1.8rem] p-5 md:p-7`}
            >
              <p className={mutedText}>{t('clube.biblioteca.desc')}</p>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#7A3F24] hover:text-[#65321C]"
              >
                {t('clube.biblioteca.cta')} <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {ebookCovers.length > 0 && (
            <div className="my-10 -mx-4 overflow-hidden sm:-mx-6 md:-mx-10 md:my-14">
              <Marquee
                items={ebookCovers}
                duration={Math.max(40, ebookCovers.length * 8)}
                renderItem={(ebook) => (
                  <div className="relative h-[158px] w-[112px] shrink-0 overflow-hidden rounded-xl border border-[#E9DED0] shadow-[0_16px_35px_rgba(67,43,27,0.12)] md:h-[190px] md:w-[134px]">
                    <img src={ebook.cover_url ?? ''} alt={ebook.title} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                )}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {bibliotecaGrid.map((item, index) => {
              const Icon = BIBLIOTECA_ICONS[index % BIBLIOTECA_ICONS.length];
              return (
                <motion.div
                  key={item.title}
                  custom={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`${shell} rounded-[1.35rem] p-4 md:p-5`}
                >
                  <IconSeal>
                    <Icon className="h-5 w-5" />
                  </IconSeal>
                  <span className="mt-4 block text-sm font-black leading-snug text-[#1B120D] md:text-base">{item.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#2A1A13] py-12 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-[2rem] border border-white/10"
          >
            <img src={COMMUNITY_IMAGE} alt="Comunidade" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
            <h2 className="text-balance font-serif text-[1.9rem] leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl">
              {t('clube.community.title')}
            </h2>
            <p className="text-[15px] leading-7 text-[#E8D8C6]/78 md:text-base">{t('clube.community.desc')}</p>
            <div className="grid grid-cols-2 gap-3">
              {communityItems.map((item, index) => {
                const Icon = COMMUNITY_ICONS[index % COMMUNITY_ICONS.length];
                return (
                  <div key={item.title} className={`${darkShell} rounded-[1.25rem] p-3 md:p-4`}>
                    <IconSeal dark>
                      <Icon className="h-5 w-5" />
                    </IconSeal>
                    <span className="mt-3 block text-sm font-bold leading-snug text-white">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F8F2EA] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className={`${sectionTitle} mx-auto mb-8 max-w-3xl text-center md:mb-10`}
          >
            {t('clube.extras.title')}
          </motion.h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map((item, index) => {
              const Icon = EXTRAS_ICONS[index % EXTRAS_ICONS.length];
              return (
                <motion.article
                  key={item.title}
                  custom={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`${shell} rounded-[1.45rem] p-5`}
                >
                  <IconSeal>
                    <Icon className="h-5 w-5" />
                  </IconSeal>
                  <h3 className="mt-5 text-base font-black leading-tight text-[#1B120D]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6E5E54]">{item.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFDFC] py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:items-center md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[2rem] border border-[#E9DED0] bg-[#F8F2EA] shadow-[0_24px_65px_rgba(67,43,27,0.12)]"
          >
            <img src={HERO_IMAGE} alt="Dr. Mauro Kwitko" className="aspect-[3/4] w-full object-cover object-top" loading="lazy" />
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
            <h2 className={sectionTitle}>{t('clube.bio.title')}</h2>
            <p className={mutedText}>{t('clube.bio.desc')}</p>
            <div className="grid grid-cols-2 gap-3">
              {bioStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className={`${shell} rounded-[1.35rem] p-4 md:p-5`}>
                  <div className="font-serif text-3xl font-bold leading-none text-[#7A3F24] md:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-xs font-semibold leading-snug text-[#6E5E54] md:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F8F2EA] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
            <div>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${sectionTitle} mb-8`}
              >
                {t('clube.ancoragem.title')}
              </motion.h2>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-3">
                {ancoragemItems.map((item) => (
                  <div key={item.label} className={`${shell} flex items-center justify-between gap-5 rounded-[1.2rem] px-4 py-4 md:px-5`}>
                    <span className="text-sm font-bold leading-snug text-[#1B120D] md:text-base">{item.label}</span>
                    <span className="shrink-0 text-sm font-black text-[#7A3F24] md:text-base">{item.value}</span>
                  </div>
                ))}
                <div className={`${shell} mt-5 rounded-[1.5rem] bg-[#1F140F] p-5 text-white md:p-6`}>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6A96B]">{t('clube.ancoragem.totalLabel')}</div>
                  <div className="mt-2 font-serif text-5xl font-bold leading-none md:text-6xl">{t('clube.ancoragem.totalValue')}</div>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#E8D8C6]/78">{t('clube.ancoragem.totalNote')}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="sticky top-24 rounded-[2rem] border border-[#7A3F24]/18 bg-[#FFFDFC] p-5 shadow-[0_30px_80px_rgba(67,43,27,0.16)] md:p-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#7A3F24]/10 px-3 py-2 text-xs font-black text-[#7A3F24]">
                <CircleDollarSign className="h-4 w-4" />
                {t('clube.price.badge')}
              </div>
              <h2 className="mt-5 text-xl font-black leading-tight text-[#1B120D] md:text-2xl">{t('clube.price.title')}</h2>
              <div className="mt-5 flex items-end gap-1">
                <span className="mb-2 text-xl font-bold text-[#6E5E54]">R$</span>
                <span className="font-serif text-7xl font-bold leading-none text-[#1B120D] md:text-8xl">29</span>
                <span className="mb-3 text-sm font-bold text-[#6E5E54]">{t('clube.price.perMonth')}</span>
              </div>
              <div className="mt-7 grid gap-3">
                {priceIncludes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7A3F24] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-semibold leading-6 text-[#1B120D]">{item}</span>
                  </div>
                ))}
              </div>
              <CtaButton className="mt-7 w-full">
                {t('clube.price.cta')} <ArrowRight className="h-5 w-5" />
              </CtaButton>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px] font-bold text-[#6E5E54]">
                <div className="rounded-2xl bg-[#F8F2EA] px-3 py-3">
                  <Lock className="mx-auto mb-1 h-3.5 w-3.5" />
                  {t('clube.price.badgeBottom1')}
                </div>
                <div className="rounded-2xl bg-[#F8F2EA] px-3 py-3">
                  <ShieldCheck className="mx-auto mb-1 h-3.5 w-3.5" />
                  {t('clube.price.badgeBottom2')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFDFC] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8 max-w-3xl">
            <h2 className={sectionTitle}>{t('clube.paraQuem.title')}</h2>
            <p className={`${mutedText} mt-4`}>{t('clube.paraQuem.desc')}</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2">
            {paraQuemItems.map((item, index) => (
              <motion.div
                key={item}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${shell} flex items-start gap-3 rounded-[1.25rem] p-4 md:p-5`}
              >
                <IconSeal>
                  <Check className="h-5 w-5" />
                </IconSeal>
                <span className="pt-2 text-sm font-bold leading-6 text-[#1B120D] md:text-[15px]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F2EA] py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className={`${sectionTitle} mb-8 text-center`}
          >
            {t('clube.faq.title')}
          </motion.h2>
          <div className="space-y-3">
            {faq.map((item, index) => (
              <motion.div key={item.q} custom={index} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                <FaqItem q={item.q} a={item.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2A1A13] px-4 py-14 text-center text-white sm:px-6 md:py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-3xl">
          <p className="font-serif text-3xl font-bold italic leading-tight text-[#F0D3A5] md:text-5xl">
            "{t('clube.ctaFinal.quote')}"
          </p>
          <p className="mt-4 text-sm font-bold text-[#E8D8C6]/70">- {t('clube.ctaFinal.quoteAuthor')}</p>
          <div className="mx-auto my-8 h-px max-w-xs bg-white/12" />
          <h2 className="text-3xl font-black leading-tight md:text-4xl">{t('clube.ctaFinal.title')}</h2>
          <CtaButton className="mt-7 w-full bg-[#D6A96B] text-[#24150E] hover:bg-[#E0B879] sm:w-auto">
            {t('clube.ctaFinal.button')} <ArrowRight className="h-4 w-4" />
          </CtaButton>
        </motion.div>
      </section>
    </div>
  );
};

export default ClubeDeEstudos;
