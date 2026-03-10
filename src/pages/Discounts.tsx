import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Tag, Copy, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Discounts = () => {
  const { discounts, courses } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeDiscounts = discounts.filter(d => d.active);
  const expiredDiscounts = discounts.filter(d => !d.active);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2"><Tag className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Descontos</h1>
        <p className="text-sm text-muted-foreground mt-1">Cupons e promoções disponíveis</p>
      </div>

      {activeDiscounts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeDiscounts.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-accent text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-xl">
                {d.percentage}% OFF
              </div>
              <h3 className="text-base font-bold mb-1 pr-16">{d.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{d.description}</p>

              {d.courseIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {d.courseIds.map(cid => {
                    const course = courses.find(c => c.id === cid);
                    return course ? (
                      <span key={cid} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{course.title}</span>
                    ) : null;
                  })}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Expira em {new Date(d.expiresAt).toLocaleDateString('pt-BR')}
                </div>
                <button
                  onClick={() => copyCode(d.id, d.couponCode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 text-xs font-mono font-semibold hover:bg-secondary transition-colors"
                >
                  {copiedId === d.id ? <><CheckCircle className="w-3 h-3 text-success" /> Copiado!</> : <><Copy className="w-3 h-3" /> {d.couponCode}</>}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {expiredDiscounts.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-muted-foreground">Inativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
            {expiredDiscounts.map(d => (
              <div key={d.id} className="glass-card">
                <h3 className="text-sm font-semibold">{d.title}</h3>
                <p className="text-xs text-muted-foreground">{d.percentage}% OFF · {d.couponCode}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Discounts;
