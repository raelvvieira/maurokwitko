import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const { blogPosts } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Blog</h1>
        <p className="text-sm text-muted-foreground mt-1">Artigos, dicas e novidades</p>
      </div>

      {blogPosts.length === 0 && (
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Nenhum post publicado ainda.</div>
      )}

      {blogPosts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card group cursor-pointer"
          onClick={() => navigate(`/blog/${post.id}`)}
        >
          {post.imageUrl && (
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-muted">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.content}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default Blog;
