import { motion } from 'framer-motion';
import { Headphones, Play } from 'lucide-react';

const tracks = [
  { title: 'Focus Flow - Lo-Fi Study', artist: 'ChillBeats', duration: '3:45' },
  { title: 'Deep Work Ambient', artist: 'StudyVibes', duration: '5:20' },
  { title: 'Morning Motivation Mix', artist: 'EduFlow Radio', duration: '4:10' },
  { title: 'Coding in the Rain', artist: 'DevBeats', duration: '6:15' },
  { title: 'Concentration Station', artist: 'BrainWaves', duration: '4:55' },
  { title: 'Midnight Study Session', artist: 'NightOwl', duration: '7:30' },
];

const Library = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Headphones className="w-6 h-6 text-primary" /> Biblioteca de Áudio</h1>
        <p className="text-sm text-muted-foreground mt-1">Músicas e podcasts para estudar com foco</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tracks.map((track, i) => (
          <motion.div
            key={track.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex items-center gap-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{track.title}</p>
              <p className="text-xs text-muted-foreground">{track.artist} · {track.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Library;
