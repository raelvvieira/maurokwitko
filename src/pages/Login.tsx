import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, UserPlus, Eye, EyeOff, Sparkles, Mail, CheckCircle2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo-mauro-kwitko.png';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141';
const ADMIN_EMAILS = new Set(['raelvvieira@gmail.com', 'mauroabpr@gmail.com']);

async function checkPaidAccess(email: string): Promise<{ paid: boolean; status: string }> {
  const e = email.trim().toLowerCase();
  if (ADMIN_EMAILS.has(e)) return { paid: true, status: 'admin' };
  try {
    const { data, error } = await supabase.functions.invoke('check-paid-access', { body: { email: e } });
    if (error) return { paid: false, status: 'error' };
    return data as { paid: boolean; status: string };
  } catch {
    return { paid: false, status: 'error' };
  }
}

const Login = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // First-access dialog state
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetBlocked, setResetBlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBlocked(false);
    setLoading(true);
    const access = await checkPaidAccess(email);
    if (!access.paid) {
      setLoading(false);
      setBlocked(true);
      return;
    }
    const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password);
    if (error) setError(error.message);
    else navigate('/app');
    setLoading(false);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetBlocked(false);
    setResetLoading(true);
    const access = await checkPaidAccess(resetEmail);
    if (!access.paid) {
      setResetLoading(false);
      setResetBlocked(true);
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);
    if (error) return setResetError(error.message);
    setResetSent(true);
  };

  const closeReset = () => {
    setResetOpen(false);
    setTimeout(() => { setResetSent(false); setResetEmail(''); setResetError(''); setResetBlocked(false); }, 200);
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
            <img src={logo} alt="Dr. Mauro Kwitko" className="w-42 h-42 object-contain rounded-2xl mx-auto" />
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

            {blocked && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 space-y-2">
                <p className="text-sm font-semibold text-foreground">Não encontramos seu pagamento</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Para entrar no Clube de Estudos é preciso adquirir o acesso. Se você já comprou,
                  use o mesmo e-mail informado no checkout.
                </p>
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Adquirir acesso ao Clube
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Aguarde...' : (<><LogIn className="w-4 h-4" /> Entrar</>)}
            </button>
          </form>

          <div className="text-xs text-center text-muted-foreground space-y-2">
            <p>Já possui acesso? Entre acima.</p>
            <button
              type="button"
              onClick={() => setResetOpen(true)}
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
            >
              <KeyRound className="w-3.5 h-3.5" /> Criar Nova Senha
            </button>
          </div>
        </div>

        {/* First-access highlighted card with zoom + glow */}
        <motion.button
          type="button"
          onClick={() => setResetOpen(true)}
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative overflow-hidden w-full text-left rounded-2xl p-4 border border-accent/40 bg-gradient-to-br from-accent/15 via-primary/10 to-transparent backdrop-blur-md shadow-lg"
        >
          <motion.span
            aria-hidden
            initial={{ x: '-120%' }}
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-overlay"
          />
          <div className="relative flex items-start gap-3">
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
        </motion.button>
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
                {resetBlocked && (
                  <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 space-y-2">
                    <p className="text-sm font-semibold text-foreground">E-mail não encontrado</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Esse e-mail não consta como pagante do Clube de Estudos. Confirme se digitou
                      o mesmo e-mail usado no checkout, ou adquira agora o seu acesso.
                    </p>
                    <a
                      href={CHECKOUT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" /> Adquirir acesso ao Clube
                    </a>
                  </div>
                )}
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
