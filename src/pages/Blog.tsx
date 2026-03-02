import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
  { id: 1, title: '10 React Patterns que Todo Dev Deveria Conhecer', excerpt: 'Descubra os padrões mais utilizados em projetos profissionais e como aplicá-los.', author: 'Ana Silva', date: '28 Fev 2026', readTime: '8 min' },
  { id: 2, title: 'Como Subir no Ranking: Dicas dos Top 10', excerpt: 'Entrevistamos os melhores alunos para descobrir suas estratégias de estudo.', author: 'Carlos Mendes', date: '25 Fev 2026', readTime: '5 min' },
  { id: 3, title: 'O Futuro do Design System', excerpt: 'Tendências e ferramentas que estão moldando a forma como construímos interfaces.', author: 'Beatriz Costa', date: '20 Fev 2026', readTime: '6 min' },
];

const Blog = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Blog</h1>
        <p className="text-sm text-muted-foreground mt-1">Artigos, dicas e novidades da comunidade</p>
      </div>

      {posts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card group cursor-pointer"
        >
          <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
          <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
              <span>{post.readTime} leitura</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default Blog;
