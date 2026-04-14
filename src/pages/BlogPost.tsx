import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const { blogPosts } = useApp();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
        </button>
        <div className="glass-card text-center text-sm text-muted-foreground py-12">Post não encontrado.</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
      </button>

      <article className="glass-card">
        {post.imageUrl && (
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-muted">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
