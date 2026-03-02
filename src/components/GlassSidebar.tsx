import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Headphones, FileText, Trophy, Users, PenSquare, Sparkles } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/courses', icon: BookOpen, label: 'Cursos' },
  { to: '/library', icon: Headphones, label: 'Biblioteca' },
  { to: '/materials', icon: FileText, label: 'Materiais' },
  { to: '/ranking', icon: Trophy, label: 'Ranking' },
  { to: '/community', icon: Users, label: 'Comunidade' },
  { to: '/blog', icon: PenSquare, label: 'Blog' },
];

const GlassSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 glass-strong z-40 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-gradient">EduFlow</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
              }`
            }
          >
            <Icon className="w-[18px] h-[18px]" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mx-3 mb-4 glass-card">
        <p className="text-xs font-semibold text-foreground mb-1">Upgrade Pro</p>
        <p className="text-xs text-muted-foreground mb-3">Acesso ilimitado a todos os cursos</p>
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold transition-transform hover:scale-[1.02]">
          Atualizar Agora
        </button>
      </div>
    </aside>
  );
};

export default GlassSidebar;
