import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Headphones, FileText, Trophy, Users, PenSquare, Sparkles, ChevronLeft, ChevronRight, Shield, Tag, X, Radio, BookMarked, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/courses', icon: BookOpen, label: 'Aulas' },
  { to: '/library', icon: Headphones, label: 'Hinos' },
  { to: '/ebooks', icon: BookMarked, label: 'E-books' },
  { to: '/livros', icon: ShoppingCart, label: 'Livros' },
  { to: '/radio', icon: Radio, label: 'Rádio' },
  { to: '/materials', icon: FileText, label: 'Materiais' },
  { to: '/ranking', icon: Trophy, label: 'Ranking' },
  { to: '/community', icon: Users, label: 'Comunidade' },
  { to: '/blog', icon: PenSquare, label: 'Blog' },
  { to: '/discounts', icon: Tag, label: 'Descontos' },
];

const adminItems = [
  { to: '/admin', icon: Shield, label: 'Administração' },
];

const GlassSidebar = () => {
  const { isAdmin, sidebarCollapsed, setSidebarCollapsed, sidebarMobileOpen, setSidebarMobileOpen } = useApp();
  const isMobile = useIsMobile();

  const collapsed = !isMobile && sidebarCollapsed;
  const width = collapsed ? 'w-16' : 'w-64';

  const renderNavItems = () => (
    <>
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => isMobile && setSidebarMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 ${collapsed ? 'justify-center px-2' : 'px-4'} py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary/10 text-primary shadow-sm'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            }`
          }
          title={collapsed ? label : undefined}
        >
          <Icon className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      ))}

      {isAdmin && (
        <>
          <div className="my-2 mx-2 border-t border-border/50" />
          {adminItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => isMobile && setSidebarMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 ${collapsed ? 'justify-center px-2' : 'px-4'} py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                }`
              }
              title={collapsed ? label : undefined}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </>
      )}
    </>
  );

  // Desktop sidebar
  if (!isMobile) {
    return (
      <aside className={`fixed left-0 top-0 bottom-0 ${width} glass-strong z-40 flex flex-col transition-all duration-300`}>
        <div className={`p-4 flex items-center justify-center ${collapsed ? '' : 'px-6'}`}>
          <img
            src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png"
            alt="Clube de Estudos Dr. Mauro Kwitko"
            className={`${collapsed ? 'w-12 h-12' : 'h-[4.2rem]'} object-contain shrink-0`}
          />
        </div>
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {renderNavItems()}
        </nav>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-50"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>
    );
  }

  // Mobile sidebar (drawer)
  return (
    <AnimatePresence>
      {sidebarMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setSidebarMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 top-0 bottom-0 w-64 glass-strong z-50 flex flex-col will-change-transform"
          >
            <div className="p-4 flex items-center justify-between px-6">
              <img
                src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png"
                alt="Clube de Estudos Dr. Mauro Kwitko"
                className="h-[4.2rem] object-contain shrink-0"
              />
              <button
                onClick={() => setSidebarMobileOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-2 space-y-1 overflow-y-auto overscroll-contain">
              {renderNavItems()}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlassSidebar;
