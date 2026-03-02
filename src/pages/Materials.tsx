import { motion } from 'framer-motion';
import { FileText, Download, BookOpen, Code, Palette } from 'lucide-react';

const materials = [
  { title: 'Guia React Patterns 2024', type: 'PDF', icon: BookOpen, size: '2.4 MB' },
  { title: 'Cheat Sheet TypeScript', type: 'PDF', icon: Code, size: '1.1 MB' },
  { title: 'Template Design System', type: 'Figma', icon: Palette, size: '8.5 MB' },
  { title: 'Exercícios Machine Learning', type: 'ZIP', icon: FileText, size: '15 MB' },
  { title: 'Guia de Entrevistas Tech', type: 'PDF', icon: BookOpen, size: '3.2 MB' },
];

const Materials = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Materiais</h1>
        <p className="text-sm text-muted-foreground mt-1">Recursos complementares para download</p>
      </div>

      <div className="space-y-3">
        {materials.map((mat, i) => (
          <motion.div
            key={mat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <mat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{mat.title}</p>
                <p className="text-xs text-muted-foreground">{mat.type} · {mat.size}</p>
              </div>
            </div>
            <button className="p-2.5 rounded-xl hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
