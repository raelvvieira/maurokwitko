import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import logo from '@/assets/logo-mauro-kwitko.png';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const FN_URL = `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`;

type State = 'loading' | 'valid' | 'already' | 'invalid' | 'success' | 'submitting' | 'error';

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    if (!token) { setState('invalid'); return; }
    (async () => {
      try {
        const res = await fetch(`${FN_URL}?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON_KEY },
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 404) setState('invalid');
        else if (data.valid === false && data.reason === 'already_unsubscribed') setState('already');
        else if (data.valid === true) setState('valid');
        else setState('invalid');
      } catch {
        setState('error');
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState('submitting');
    try {
      const res = await fetch(FN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) setState('success');
      else if (data.reason === 'already_unsubscribed') setState('already');
      else setState('error');
    } catch {
      setState('error');
    }
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="glass-card space-y-6 text-center">
          <img src={logo} alt="Dr. Mauro Kwitko" className="w-32 h-32 object-contain rounded-2xl mx-auto" />

          {state === 'loading' && (
            <>
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Validando seu pedido...</p>
            </>
          )}

          {state === 'valid' && (
            <>
              <h1 className="text-lg font-bold">Cancelar inscrição</h1>
              <p className="text-sm text-muted-foreground">
                Tem certeza que deseja não receber mais e-mails do Clube de Estudos Dr. Mauro Kwitko?
              </p>
              <button
                onClick={confirm}
                className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold"
              >
                Confirmar cancelamento
              </button>
            </>
          )}

          {state === 'submitting' && (
            <>
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Processando...</p>
            </>
          )}

          {state === 'success' && (
            <>
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h1 className="text-lg font-bold">Tudo certo!</h1>
              <p className="text-sm text-muted-foreground">
                Você não receberá mais nossos e-mails. Sentiremos sua falta!
              </p>
            </>
          )}

          {state === 'already' && (
            <>
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h1 className="text-lg font-bold">Já cancelado</h1>
              <p className="text-sm text-muted-foreground">
                Sua inscrição já havia sido cancelada anteriormente.
              </p>
            </>
          )}

          {state === 'invalid' && (
            <>
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
              <h1 className="text-lg font-bold">Link inválido</h1>
              <p className="text-sm text-muted-foreground">
                Este link de cancelamento não é válido ou já expirou.
              </p>
            </>
          )}

          {state === 'error' && (
            <>
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
              <h1 className="text-lg font-bold">Erro inesperado</h1>
              <p className="text-sm text-muted-foreground">
                Tente novamente em alguns instantes.
              </p>
            </>
          )}

          <Link to="/" className="text-xs text-primary hover:underline inline-block">
            Voltar para o site
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unsubscribe;
