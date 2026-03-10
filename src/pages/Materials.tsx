import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Materials = () => {
  const { materialItems } = useApp();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Materiais</h1>
        <p className="text-sm text-muted-foreground mt-1">Recursos complementares para download</p>
      </div>

      {materialItems.length === 0 && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Nenhum material disponível ainda.</div>
      )}

      <div className="space-y-3">
        {materialItems.map((mat, i) => (
          <motion.div
            key={mat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{mat.title}</p>
                <p className="text-xs text-muted-foreground">{mat.type} · {mat.size}</p>
              </div>
            </div>
            <a href={mat.url} download className="p-2.5 rounded-xl hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
