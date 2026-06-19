import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo-mauro-kwitko.png';
import LanguageSwitcher from './LanguageSwitcher';

const PublicHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkHero = false; // clube-de-estudos agora usa fundo claro
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);

  const COURSES = [
    { label: t('header.menu.formacao'), href: '/formacao' },
    { label: t('header.menu.cursoOnline'), href: '/curso-online' },
  ];

  const RADIO = [{ label: t('header.menu.radioCom'), href: '/radio' }];

  const NAV: { label: string; href?: string; children?: { label: string; href: string }[] }[] = [
    { label: t('header.menu.home'), href: '/' },
    { label: t('header.menu.quemSouEu'), href: '/quem-sou-eu' },
    { label: t('header.menu.clube'), href: '/clube-de-estudos' },
    { label: t('header.menu.cursos'), children: COURSES },
    { label: t('header.menu.livros'), href: '/livros-e-ebooks' },
    { label: t('header.menu.hinos'), href: '/hinos-espirituais' },
    { label: t('header.menu.radio'), children: RADIO },
    { label: t('header.menu.artigos'), href: '/artigos' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const drawer = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="lg:hidden fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ willChange: 'transform' }}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background z-[61] flex flex-col p-6 overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold">{t('header.menuLabel')}</span>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary/60" aria-label={t('header.closeMenu') as string}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <LanguageSwitcher variant="inline" />
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileOpenMenu((v) => (v === item.label ? null : item.label))}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary/60 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileOpenMenu === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="overflow-hidden pl-3"
                        >
                          {item.children.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              onClick={() => setOpen(false)}
                              className="block px-3 py-2.5 rounded-lg text-[13px] text-foreground/70 hover:bg-secondary/60"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href!}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary/60 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
            <button
              onClick={() => {
                setOpen(false);
                navigate('/login');
              }}
              className="mt-6 w-full whitespace-nowrap px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
            >
              {t('header.cta')}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm'
          : isDarkHero
          ? 'bg-[#0d1a11]/70 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Dr. Mauro Kwitko"
            className="h-16 md:h-24 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  onClick={() => setOpenMenu((v) => (v === item.label ? null : item.label))}
                  className={`inline-flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${!scrolled && isDarkHero ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground'}`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
                    >
                      <div className="rounded-2xl bg-background/95 backdrop-blur-xl border border-border/60 shadow-xl p-2">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setOpenMenu(null)}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href!}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${!scrolled && isDarkHero ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground'}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => navigate('/login')}
            className="hidden md:inline-flex items-center whitespace-nowrap px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            {t('header.cta')}
          </button>
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary/60 transition-colors"
            aria-label={t('header.openMenu') as string}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(drawer, document.body)}
    </header>
  );
};

export default PublicHeader;
