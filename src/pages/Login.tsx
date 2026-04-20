import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, UserPlus, Eye, EyeOff, Sparkles, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

const Login = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // First-access dialog state
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password);
    if (error) setError(error.message);
    else navigate('/app');
    setLoading(false);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);
    if (error) return setResetError(error.message);
    setResetSent(true);
  };

  const closeReset = () => {
    setResetOpen(false);
    setTimeout(() => { setResetSent(false); setResetEmail(''); setResetError(''); }, 200);
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-4"
      >
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site
        </Link>
        <div className="glass-card space-y-6">
          <div className="text-center space-y-2">
            <img src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png" alt="Dr. Mauro Kwitko" className="w-42 h-42 object-contain rounded-2xl mx-auto" />
            <h1 className="text-lg font-bold">Clube de Estudos</h1>
            <p className="text-sm text-muted-foreground">Dr. Mauro Kwitko</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Senha"
                required
                minLength={6}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && <p className="text-xs text-destructive text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Aguarde...' : isSignUp ? (<><UserPlus className="w-4 h-4" /> Criar conta</>) : (<><LogIn className="w-4 h-4" /> Entrar</>)}
            </button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            {isSignUp ? 'Já tem conta?' : 'Não tem conta?'}{' '}
            <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="text-primary font-semibold hover:underline">
              {isSignUp ? 'Entrar' : 'Criar conta'}
            </button>
          </p>
        </div>

        {/* First-access highlighted card */}
        <button
          type="button"
          onClick={() => setResetOpen(true)}
          className="w-full text-left rounded-2xl p-4 border border-accent/40 bg-gradient-to-br from-accent/15 via-primary/10 to-transparent backdrop-blur-md hover:scale-[1.01] transition-transform shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">
                É seu primeiro acesso no NOVO Clube de Estudos?
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Clique aqui para criar uma <strong>nova senha</strong> usando o mesmo e-mail
                que você já usava antes.
              </p>
            </div>
          </div>
        </button>
      </motion.div>

      <Dialog open={resetOpen} onOpenChange={(o) => !o && closeReset()}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-white/10 max-w-sm">
          {!resetSent ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" /> Criar nova senha
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Informe o mesmo e-mail que você já usava no Clube. Vamos te enviar um
                  link para criar sua senha de acesso.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleResetSubmit} className="space-y-4 pt-2">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {resetError && <p className="text-xs text-destructive text-center">{resetError}</p>}
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold disabled:opacity-50"
                >
                  {resetLoading ? 'Enviando...' : 'Enviar link por e-mail'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-3 py-4">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <DialogTitle className="text-base">E-mail enviado!</DialogTitle>
              <DialogDescription className="text-sm">
                Enviamos um link para <strong className="text-foreground">{resetEmail}</strong>.
                <br />
                Confira sua caixa de entrada (e a pasta de spam) e clique no link para criar sua nova senha.
              </DialogDescription>
              <button
                onClick={closeReset}
                className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold mt-2"
              >
                Entendi
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
