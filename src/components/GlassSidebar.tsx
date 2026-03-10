import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Headphones, FileText, Trophy, Users, PenSquare, Sparkles, ChevronLeft, ChevronRight, Shield, Tag, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/courses', icon: BookOpen, label: 'Cursos' },
  { to: '/library', icon: Headphones, label: 'Biblioteca' },
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

  const sidebarContent = (
    <aside className={`fixed left-0 top-0 bottom-0 ${width} glass-strong z-40 flex flex-col transition-all duration-300`}>
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-6'}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-lg font-bold text-gradient">EduFlow</span>}
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
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
            <div className={`my-2 mx-2 border-t border-border/50`} />
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
      </nav>

      {!collapsed && (
        <div className="p-4 mx-3 mb-4 glass-card">
          <p className="text-xs font-semibold text-foreground mb-1">Upgrade Pro</p>
          <p className="text-xs text-muted-foreground mb-3">Acesso ilimitado a todos os cursos</p>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold transition-transform hover:scale-[1.02]">
            Atualizar Agora
          </button>
        </div>
      )}

      {/* Collapse toggle - desktop only */}
      {!isMobile && (
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-50"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      )}

      {/* Close button - mobile only */}
      {isMobile && (
        <button
          onClick={() => setSidebarMobileOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </aside>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {sidebarMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
              onClick={() => setSidebarMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="z-40"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return sidebarContent;
};

export default GlassSidebar;
