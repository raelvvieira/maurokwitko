import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Trophy, Flame, Medal } from 'lucide-react';

const Ranking = () => {
  const { ranking } = useApp();

  const getBadge = (pos: number) => {
    if (pos === 1) return <span className="badge-gold px-2 py-0.5 rounded-full text-xs font-bold">🥇 Ouro</span>;
    if (pos === 2) return <span className="badge-silver px-2 py-0.5 rounded-full text-xs font-bold">🥈 Prata</span>;
    if (pos === 3) return <span className="badge-bronze px-2 py-0.5 rounded-full text-xs font-bold">🥉 Bronze</span>;
    return null;
  };

  const getGrowthIcon = (g: number) => {
    if (g > 0) return <span className="flex items-center gap-1 text-success text-xs font-medium"><TrendingUp className="w-3 h-3" /> +{g}%</span>;
    if (g < 0) return <span className="flex items-center gap-1 text-destructive text-xs font-medium"><TrendingDown className="w-3 h-3" /> {g}%</span>;
    return <span className="flex items-center gap-1 text-muted-foreground text-xs"><Minus className="w-3 h-3" /> 0%</span>;
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy className="w-6 h-6 text-gold" /> Ranking Global</h1>
        <p className="text-sm text-muted-foreground mt-1">Baseado em progresso dos cursos e atividade na comunidade</p>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4">
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
            <div className="flex items-center justify-center gap-2">
              {getBadge(user.position)}
              {getGrowthIcon(user.growth)}
            </div>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
              <Flame className="w-3 h-3 text-destructive" /> {user.streak} dias
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full table */}
      <div className="glass-card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 text-xs text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">#</th>
              <th className="text-left px-5 py-3 font-medium">Usuário</th>
              <th className="text-right px-5 py-3 font-medium">Score</th>
              <th className="text-right px-5 py-3 font-medium">Crescimento</th>
              <th className="text-right px-5 py-3 font-medium">Streak</th>
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
                <td className="px-5 py-3 text-sm font-bold">{user.position}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className={`text-sm font-medium ${user.name === 'Você' ? 'text-primary' : ''}`}>{user.name}</span>
                    {getBadge(user.position)}
                  </div>
                </td>
                <td className="px-5 py-3 text-right text-sm font-semibold">{user.score.toLocaleString()}</td>
                <td className="px-5 py-3 text-right">{getGrowthIcon(user.growth)}</td>
                <td className="px-5 py-3 text-right">
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    <Flame className="w-3 h-3 text-destructive" /> {user.streak}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
