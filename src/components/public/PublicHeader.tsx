import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COURSES = [
  { label: 'Formação em Psicoterapia Reencarnacionista', href: '/formacao' },
  { label: 'Curso On-line: A Psicologia da Reencarnação', href: '/#curso-online' },
];

const NAV: { label: string; href?: string; children?: typeof COURSES }[] = [
  { label: 'Quem Sou Eu', href: '/quem-sou-eu' },
  { label: 'Cursos', children: COURSES },
  { label: 'Livros e E-books', href: '/#livros' },
  { label: 'Artigos', href: '/#artigos' },
];

const PublicHeader = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
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

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <button
                  onClick={() => setCoursesOpen((v) => !v)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${coursesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {coursesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
                    >
                      <div className="rounded-2xl bg-background/95 backdrop-blur-xl border border-border/60 shadow-xl p-2">
                        {item.children.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setCoursesOpen(false)}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            )
          )}
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
            className="lg:hidden p-2 rounded-lg hover:bg-secondary/60 transition-colors"
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
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold">Menu</span>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary/60">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileCoursesOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary/60 transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileCoursesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-3"
                          >
                            {item.children.map((sub) => (
                              <a
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setOpen(false)}
                                className="block px-3 py-2.5 rounded-lg text-[13px] text-foreground/70 hover:bg-secondary/60"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary/60 transition-colors"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </nav>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/login');
                }}
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
