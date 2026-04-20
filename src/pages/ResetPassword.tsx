import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase auto-handles the recovery token in the URL hash and creates a session.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) return setError('A senha deve ter pelo menos 6 caracteres.');
    if (password !== confirm) return setError('As senhas não coincidem.');
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="glass-card space-y-6">
          <div className="text-center space-y-2">
            <img src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png" alt="Dr. Mauro Kwitko" className="w-32 h-32 object-contain rounded-2xl mx-auto" />
            <h1 className="text-lg font-bold flex items-center justify-center gap-2">
              <KeyRound className="w-4 h-4 text-primary" /> Criar nova senha
            </h1>
            <p className="text-sm text-muted-foreground">Defina a senha que você usará para acessar o Clube.</p>
          </div>

          {!ready ? (
            <p className="text-sm text-center text-muted-foreground">
              Validando seu link...<br/>Se essa mensagem persistir, abra novamente o link recebido por e-mail.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nova senha"
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <input
                type={show ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Confirmar senha"
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              {error && <p className="text-xs text-destructive text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
