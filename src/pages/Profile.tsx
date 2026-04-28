import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { User, Mail, Camera } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { profile } = useApp();
  const [name, setName] = useState(profile.name);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Keep local input in sync once the real name resolves from the DB
  useEffect(() => {
    setName(profile.name);
  }, [profile.name]);

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast({ title: 'Informe um nome válido', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { name: trimmed } });
    setSaving(false);
    if (error) {
      toast({ title: 'Não foi possível salvar', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Perfil atualizado', description: 'Seu nome foi salvo.' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Perfil & Configurações</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Trocar foto">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-lg font-bold">{profile.name || '—'}</h2>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card space-y-4">
        <h3 className="text-sm font-semibold">Editar Perfil</h3>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Nome</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Email (não pode ser alterado)</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={profile.email}
              readOnly
              disabled
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            O e-mail é a sua chave de acesso ao Clube e é o mesmo usado na sua compra.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:shadow-lg transition-shadow disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
