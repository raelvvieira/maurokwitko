import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Trash2, Send, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CommunityPost {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  likes_count: number;
  created_at: string;
}

interface CommunityComment {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [comments, setComments] = useState<Record<string, CommunityComment[]>>({});
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const userName = user?.email?.split('@')[0] ?? 'Anônimo';

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  const fetchComments = async (postId: string) => {
    const { data } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (data) setComments(prev => ({ ...prev, [postId]: data }));
  };

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel('community')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, () => fetchPosts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_comments' }, (payload: any) => {
        const postId = payload.new?.post_id || payload.old?.post_id;
        if (postId) fetchComments(postId);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handlePublish = async () => {
    if (!newPost.trim() || !user) return;
    const { error } = await supabase.from('community_posts').insert({
      user_id: user.id,
      user_name: userName,
      content: newPost.trim(),
    });
    if (error) {
      toast({ title: 'Erro ao publicar', description: error.message, variant: 'destructive' });
    } else {
      setNewPost('');
    }
  };

  const handleDeletePost = async (postId: string) => {
    await supabase.from('community_posts').delete().eq('id', postId);
  };

  const handleLike = async (post: CommunityPost) => {
    await supabase.from('community_posts').update({ likes_count: post.likes_count + 1 }).eq('id', post.id);
  };

  const handleComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text || !user) return;
    await supabase.from('community_comments').insert({
      post_id: postId,
      user_id: user.id,
      user_name: userName,
      content: text,
    });
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleDeleteComment = async (commentId: string) => {
    await supabase.from('community_comments').delete().eq('id', commentId);
  };

  const toggleComments = (postId: string) => {
    const isExpanded = expandedComments[postId];
    setExpandedComments(prev => ({ ...prev, [postId]: !isExpanded }));
    if (!isExpanded && !comments[postId]) fetchComments(postId);
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}min atrás`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h atrás`;
    return `${Math.floor(hours / 24)}d atrás`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-primary" /> Comunidade</h1>
        <p className="text-sm text-muted-foreground mt-1">Compartilhe relatos, experiências e dicas dos seus estudos com os membros do clube.</p>
      </div>

      {/* New post */}
      <div className="glass-card">
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="Compartilhe um relato ou experiência de estudo..."
          className="w-full bg-transparent resize-none text-sm placeholder:text-muted-foreground focus:outline-none min-h-[80px]"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePublish}
            disabled={!newPost.trim()}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            Publicar
          </button>
        </div>
      </div>

      {loading && <div className="glass-card text-center text-sm text-muted-foreground py-8">Carregando...</div>}

      {/* Posts */}
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold">
                {post.user_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold">{post.user_name}</p>
                <p className="text-xs text-muted-foreground">{timeAgo(post.created_at)}</p>
              </div>
            </div>
            {user?.id === post.user_id && (
              <button onClick={() => handleDeletePost(post.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLike(post)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <Heart className="w-4 h-4" /> {post.likes_count}
            </button>
            <button
              onClick={() => toggleComments(post.id)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Comentar
            </button>
          </div>

          {/* Comments section */}
          {expandedComments[post.id] && (
            <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
              {(comments[post.id] || []).map(comment => (
                <div key={comment.id} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                    {comment.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs"><span className="font-semibold">{comment.user_name}</span> <span className="text-muted-foreground">· {timeAgo(comment.created_at)}</span></p>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                  {user?.id === comment.user_id && (
                    <button onClick={() => handleDeleteComment(comment.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  value={commentInputs[post.id] || ''}
                  onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && handleComment(post.id)}
                  placeholder="Escreva um comentário..."
                  className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <button onClick={() => handleComment(post.id)} className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Community;
