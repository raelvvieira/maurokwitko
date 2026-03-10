import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingPlayer = () => {
  const { currentTrack, isPlaying, playerProgress, togglePlay, sidebarCollapsed } = useApp();
  const isMobile = useIsMobile();

  const marginLeft = isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64';

  return (
    <div className={`floating-player ${marginLeft} h-14 md:h-16 flex items-center px-3 md:px-6 gap-3 md:gap-6 transition-all duration-300`}>
      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-shrink">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
          <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs md:text-sm font-medium leading-tight truncate">{currentTrack.title}</p>
          {!isMobile && <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3 md:gap-4">
          {!isMobile && (
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          {!isMobile && (
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          )}
        </div>
        {!isMobile && (
          <div className="w-full max-w-md flex items-center gap-2">
            <span className="text-xs text-muted-foreground">1:18</span>
            <div className="flex-1 h-1 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${playerProgress}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{currentTrack.duration}</span>
          </div>
        )}
      </div>

      {!isMobile && <div className="w-24" />}
    </div>
  );
};

export default FloatingPlayer;
