import { motion } from 'framer-motion';
import { Tag, ArrowRight, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Discounts = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Tag className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Descontos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Promoções exclusivas para membros do Clube</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card border-accent/30 bg-accent/5"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
              20% de desconto nos livros físicos!
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Como membro do Clube de Estudos, você tem acesso a um desconto exclusivo de <strong className="text-foreground">20%</strong> em todos os livros físicos do Dr. Mauro Kwitko disponíveis na loja da <strong className="text-foreground">Editora BesouroBox</strong>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Para aproveitar, basta acessar a página de livros, escolher os que deseja, adicionar ao carrinho na BesouroBox e aplicar o cupom{' '}
              <span className="inline-block bg-accent/20 text-accent font-mono font-bold px-2 py-0.5 rounded text-sm">MAURO20</span>{' '}
              no checkout.
            </p>
            <button
              onClick={() => navigate('/app/livros')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-transform"
            >
              Ver Livros <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Discounts;
