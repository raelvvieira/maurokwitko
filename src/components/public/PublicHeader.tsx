import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Livros', href: '#livros' },
  { label: 'Hinos', href: '#hinos' },
  { label: 'Artigos', href: '#artigos' },
];

const PublicHeader = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png"
            alt="Dr. Mauro Kwitko"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <div className="hidden sm:block leading-tight">
            <p className="text-sm md:text-[15px] font-bold tracking-tight">Dr. Mauro Kwitko</p>
            <p className="text-[10px] md:text-[11px] text-muted-foreground tracking-wide uppercase">
              Psicoterapia de Regressão
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/login')}
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            Entrar no Clube
          </button>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/60 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-72 bg-background z-50 flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold">Menu</span>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary/60">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary/60 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <button
                onClick={() => { setOpen(false); navigate('/login'); }}
                className="mt-6 w-full px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                Entrar no Clube
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default PublicHeader;
