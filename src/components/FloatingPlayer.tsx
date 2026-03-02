import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const FloatingPlayer = () => {
  const { currentTrack, isPlaying, playerProgress, togglePlay } = useApp();

  return (
    <div className="floating-player ml-64 h-16 flex items-center px-6 gap-6">
      <div className="flex items-center gap-3 min-w-[200px]">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium leading-tight">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full max-w-md flex items-center gap-2">
          <span className="text-xs text-muted-foreground">1:18</span>
          <div className="flex-1 h-1 rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${playerProgress}%` }} />
          </div>
          <span className="text-xs text-muted-foreground">{currentTrack.duration}</span>
        </div>
      </div>

      <div className="w-24" />
    </div>
  );
};

export default FloatingPlayer;
