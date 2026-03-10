import { Search, Bell, User, Menu, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const TopBar = () => {
  const { profile, userEmail, setSidebarMobileOpen, signOut } = useApp();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <header className="h-14 md:h-16 glass-strong flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1">
        {isMobile && (
          <button onClick={() => setSidebarMobileOpen(true)} className="p-2 rounded-xl hover:bg-secondary/60 transition-colors">
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
        <div className={`relative ${isMobile ? 'flex-1' : 'w-80'}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={isMobile ? 'Buscar...' : 'Buscar cursos, aulas, materiais...'}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary/60 border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-2">
        <button className="relative p-2 rounded-xl hover:bg-secondary/60 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 pr-2 md:pr-4 py-1.5 rounded-xl hover:bg-secondary/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          {!isMobile && (
            <div className="text-left">
              <p className="text-sm font-semibold leading-tight">{userEmail?.split('@')[0] ?? profile.name}</p>
              <p className="text-xs text-muted-foreground">#{profile.rank} Ranking</p>
            </div>
          )}
        </button>

        <button
          onClick={() => signOut()}
          className="p-2 rounded-xl hover:bg-destructive/10 transition-colors"
          title="Sair"
        >
          <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
