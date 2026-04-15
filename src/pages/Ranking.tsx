import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Trophy, Medal, BookOpen, Download, MessageSquare, Heart } from 'lucide-react';

const pointCriteria = [
  { icon: BookOpen, label: 'Assistir aulas', points: '10 pts/aula', color: 'text-primary' },
  { icon: Download, label: 'Baixar e-books', points: '5 pts/download', color: 'text-accent' },
  { icon: MessageSquare, label: 'Publicar relatos', points: '15 pts/publicação', color: 'text-success' },
  { icon: Heart, label: 'Comentar posts', points: '5 pts/comentário', color: 'text-destructive' },
];

const Ranking = () => {
  const { ranking } = useApp();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 md:w-6 md:h-6 text-gold" /> Alunos Engajados
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Os participantes mais engajados com o Clube</p>
      </div>

      {/* Como ganhar pontos */}
      <div className="glass-card">
        <h2 className="text-sm font-semibold mb-3">Como ganhar pontos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pointCriteria.map(c => (
            <div key={c.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50">
              <c.icon className={`w-5 h-5 ${c.color} shrink-0`} />
              <div>
                <p className="text-xs font-semibold">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ranking.slice(0, 3).map((user, i) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`glass-card text-center ${i === 0 ? 'ring-2 ring-gold/30' : ''}`}
          >
            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 ${
              i === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
              i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
              'bg-gradient-to-br from-amber-600 to-amber-700'
            }`}>
              <Medal className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-2xl font-bold my-1">{user.score.toLocaleString()}</p>
            {user.position === 1 && <span className="badge-gold px-2 py-0.5 rounded-full text-xs font-bold">🥇 Ouro</span>}
            {user.position === 2 && <span className="badge-silver px-2 py-0.5 rounded-full text-xs font-bold">🥈 Prata</span>}
            {user.position === 3 && <span className="badge-bronze px-2 py-0.5 rounded-full text-xs font-bold">🥉 Bronze</span>}
          </motion.div>
        ))}
      </div>

      {/* Full table */}
      <div className="glass-card p-0 overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-border/50 text-xs text-muted-foreground">
              <th className="text-left px-4 md:px-5 py-3 font-medium">#</th>
              <th className="text-left px-4 md:px-5 py-3 font-medium">Usuário</th>
              <th className="text-right px-4 md:px-5 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((user, i) => (
              <motion.tr
                key={user.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`border-b border-border/30 last:border-0 ${user.name === 'Você' ? 'bg-primary/5' : ''} hover:bg-secondary/30 transition-colors`}
              >
                <td className="px-4 md:px-5 py-3 text-sm font-bold">{user.position}</td>
                <td className="px-4 md:px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <span className={`text-sm font-medium ${user.name === 'Você' ? 'text-primary' : ''}`}>{user.name}</span>
                  </div>
                </td>
                <td className="px-4 md:px-5 py-3 text-right text-sm font-semibold">{user.score.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
