import { Search, Bell, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { profile } = useApp();
  const navigate = useNavigate();

  return (
    <header className="h-16 glass-strong flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar cursos, aulas, materiais..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary/60 border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-secondary/60 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-xl hover:bg-secondary/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold leading-tight">{profile.name}</p>
            <p className="text-xs text-muted-foreground">#{profile.rank} Ranking</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
