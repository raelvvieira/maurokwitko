import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Mail, ArrowLeft, ShoppingCart, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo-mauro-kwitko.png';

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141';

type StatusKind =
  | 'active' | 'admin' | 'legacy' | 'grace_period'
  | 'overdue' | 'revoked' | 'not_found' | 'pending_new_subscriber'
  | 'invalid' | 'error';

type BlockedInfo = {
  status: StatusKind;
  title: string;
  message: string;
  showCheckout: boolean;
  checkoutLabel?: string;
  showManualRequest?: boolean;
};

function buildBlockedInfo(status: StatusKind): BlockedInfo {
  switch (status) {
    case 'pending_new_subscriber':
      return {
        status,
        title: 'Estamos confirmando seu pagamento',
        message:
          'Não localizamos seu e-mail ainda — pode ser que a Eduzz esteja terminando de processar sua compra. Aguarde alguns minutos e tente novamente. Se você já pagou, clique no botão abaixo e nossa equipe libera seu acesso manualmente.',
        showCheckout: true,
        checkoutLabel: 'Ainda não comprei, quero adquirir',
        showManualRequest: true,
      };
    case 'overdue':
      return {
        status,
        title: 'Sua mensalidade está pendente',
        message:
          'Identificamos seu cadastro no Clube, mas a última mensalidade ainda não foi confirmada. Regularize o pagamento para voltar a acessar todo o conteúdo — enviamos também um e-mail com as instruções.',
        showCheckout: true,
        checkoutLabel: 'Regularizar mensalidade',
      };
    case 'revoked':
      return {
        status,
        title: 'Seu acesso ao Clube está pausado',
        message:
          'Sua assinatura foi encerrada. Para voltar a acessar o Clube, basta refazer sua assinatura aqui — também enviamos um e-mail explicando.',
        showCheckout: true,
        checkoutLabel: 'Voltar para o Clube',
      };
    case 'not_found':
      return {
        status,
        title: 'Não encontramos seu pagamento',
        message:
          'Para entrar no Clube de Estudos é preciso ter o acesso liberado. Se você já comprou, use o mesmo e-mail informado no checkout. Caso ainda não tenha, é só adquirir aqui:',
        showCheckout: true,
        checkoutLabel: 'Adquirir acesso ao Clube',
        showManualRequest: true,
      };
    case 'invalid':
      return {
        status,
        title: 'E-mail inválido',
        message: 'Confira se digitou seu e-mail corretamente e tente novamente.',
        showCheckout: false,
      };
    case 'error':
    default:
      return {
        status,
        title: 'Tivemos um problema',
        message:
          'Não conseguimos validar seu acesso agora. Aguarde alguns instantes e tente novamente.',
        showCheckout: false,
      };
  }
}

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState<BlockedInfo | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleManualRequest = async () => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;
    setRequesting(true);
    try {
      await supabase.from('access_requests').insert({ email: normalized });
      setRequestSent(true);
    } catch (err) {
      console.error('access request failed', err);
    } finally {
      setRequesting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlocked(null);
    setLoading(true);

    try {
      const normalized = email.trim().toLowerCase();
      const { data, error } = await supabase.functions.invoke('passwordless-login', {
        body: { email: normalized },
      });

      if (error || !data) {
        setBlocked(buildBlockedInfo('error'));
        return;
      }

      if (!data.ok) {
        setBlocked(buildBlockedInfo((data.status as StatusKind) || 'error'));
        return;
      }

      // Create session immediately on the front-end
      const verify = await supabase.auth.verifyOtp({
        token_hash: data.token_hash,
        type: 'magiclink',
      });

      if (verify.error) {
        console.error('verifyOtp failed', verify.error);
        setBlocked(buildBlockedInfo('error'));
        return;
      }

      // Fire-and-forget: send the welcome / how-to-access email
      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'clube-welcome-access',
          recipientEmail: normalized,
          idempotencyKey: `clube-welcome-${normalized}-${new Date().toISOString().slice(0, 10)}`,
          templateData: { name: data.name ?? undefined },
        },
      }).catch((err) => console.warn('welcome email failed', err));

      navigate('/app');
    } catch (err) {
      console.error('login error', err);
      setBlocked(buildBlockedInfo('error'));
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, send straight to /app
  if (user) {
    navigate('/app', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-4"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site
        </Link>

        <div className="glass-card space-y-6">
          <div className="text-center space-y-2">
            <img
              src={logo}
              alt="Dr. Mauro Kwitko"
              className="w-42 h-42 object-contain rounded-2xl mx-auto"
            />
            <h1 className="text-lg font-bold">Clube de Estudos</h1>
            <p className="text-sm text-muted-foreground">Dr. Mauro Kwitko</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="login-email" className="block text-sm font-medium text-foreground">
              Digite seu e-mail para entrar
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-secondary/50 text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            {blocked && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm font-semibold text-foreground">{blocked.title}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{blocked.message}</p>
                {blocked.showCheckout && (
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {blocked.checkoutLabel ?? 'Adquirir acesso ao Clube'}
                  </a>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Validando...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" /> Entrar no Clube
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            Acesso simples, sem senha. Use o mesmo e-mail da sua compra e entre na hora.
          </p>
        </div>

        {/* Card destacado para o primeiro acesso */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative overflow-hidden rounded-2xl p-4 border border-accent/40 bg-gradient-to-br from-accent/15 via-primary/10 to-transparent backdrop-blur-md shadow-lg"
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
                Simples — use o mesmo e-mail utilizado por você no ato da compra no checkout.
                Com ele você já entra direto no Clube, sem precisar de senha.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
