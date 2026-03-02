import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Heart, Share2, MessageSquare, BookOpen } from 'lucide-react';
import { useState } from 'react';

const Community = () => {
  const { posts, toggleLike, courses } = useApp();
  const [newPost, setNewPost] = useState('');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Comunidade</h1>

      {/* New post */}
      <div className="glass-card">
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="Compartilhe uma dica ou experiência..."
          className="w-full bg-transparent resize-none text-sm placeholder:text-muted-foreground focus:outline-none min-h-[80px]"
        />
        <div className="flex justify-end mt-2">
          <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:shadow-lg transition-shadow">
            Publicar
          </button>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
            >
              <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
              {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="w-4 h-4" /> Comentar
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" /> {post.shares}
            </button>
          </div>
        </motion.div>
      ))}

      {/* Course recommendation */}
      <div className="glass-card border-l-4 border-l-primary">
        <p className="text-xs font-semibold text-primary mb-2">📚 Curso Recomendado</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">{courses[0].title}</p>
            <p className="text-xs text-muted-foreground">{courses[0].instructor} · {courses[0].totalLessons} aulas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
