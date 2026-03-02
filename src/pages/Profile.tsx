import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { User, Mail, Trophy, Flame, Camera, Award } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const { profile, ranking } = useApp();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const userRank = ranking.find(r => r.name === 'Você');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Perfil & Configurações</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-lg font-bold">{profile.name}</h2>
        <p className="text-sm text-muted-foreground">{profile.email}</p>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gold/10">
              <Trophy className="w-4 h-4 text-gold" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">#{userRank?.position}</p>
              <p className="text-xs text-muted-foreground">Ranking</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-destructive/10">
              <Flame className="w-4 h-4 text-destructive" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">{profile.streak}</p>
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Award className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">{profile.badge}</p>
              <p className="text-xs text-muted-foreground">Badge</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card space-y-4">
        <h3 className="text-sm font-semibold">Editar Perfil</h3>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Nome</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
        </div>
        <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:shadow-lg transition-shadow">
          Salvar Alterações
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
