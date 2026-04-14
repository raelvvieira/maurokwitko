import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Trash2, Plus, Youtube, Disc3, FileText, PenSquare, BookMarked, BookOpen, FolderPlus, Image as ImageIcon, Bell, Send } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

const getYoutubeId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|.*&v=))([^&#?]*)/);
  return match?.[1] ?? null;
};

// ── Notificações Admin ────────────────────────────────

function NotificacoesAdmin() {
  const [type, setType] = useState('custom');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [destUrl, setDestUrl] = useState('/');
  const [allUsers, setAllUsers] = useState(true);
  const [targetEmail, setTargetEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');

  const { data: stats } = useQuery({
    queryKey: ['admin-notification-stats'],
    queryFn: async () => {
      const { count: total } = await supabase.from('notifications').select('*', { count: 'exact', head: true });
      const { count: readCount } = await supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('read', true);
      return { total: total ?? 0, read: readCount ?? 0 };
    },
  });

  const { data: recentNotifications = [] } = useQuery({
    queryKey: ['admin-recent-notifications'],
    queryFn: async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      return data ?? [];
    },
  });

  const typeOptions = [
    { value: 'community_highlight', label: 'Destaque da comunidade' },
    { value: 'live_event', label: 'Evento ao vivo' },
    { value: 'weekly_reflection', label: 'Reflexão da semana' },
    { value: 'custom', label: 'Personalizada' },
  ];

  const handleSend = async () => {
    if (!title || !message) return;
    setSending(true);
    setResult('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      let payload: any = { type, title, message, metadata: { url: destUrl } };

      if (allUsers) {
        payload.all_users = true;
      } else {
        payload.all_users = true;
      }

      const response = await supabase.functions.invoke('send-notification', { body: payload });
      if (response.error) throw response.error;
      setResult(`✅ Enviado! ${response.data?.sent ? response.data.sent + ' usuários' : 'Sucesso'}`);
      setTitle('');
      setMessage('');
    } catch (err: any) {
      setResult(`❌ Erro: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  const readRate = stats && stats.total > 0 ? Math.round((stats.read / stats.total) * 100) : 0;

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card text-center">
          <p className="text-2xl font-bold">{stats?.total ?? 0}</p>
          <p className="text-xs text-muted-foreground">Total enviadas</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-2xl font-bold">{stats?.read ?? 0}</p>
          <p className="text-xs text-muted-foreground">Total lidas</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-2xl font-bold">{readRate}%</p>
          <p className="text-xs text-muted-foreground">Taxa de leitura</p>
        </div>
      </div>

      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Bell className="w-4 h-4" /> Enviar Notificação</h3>
        <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm">
          {typeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Mensagem..." rows={3} className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        <input value={destUrl} onChange={e => setDestUrl(e.target.value)} placeholder="URL de destino (ex: /cursos)" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={allUsers} onChange={e => setAllUsers(e.target.checked)} className="rounded" />
          Enviar para todos os membros
        </label>

        <button
          onClick={handleSend}
          disabled={sending || !title || !message}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {sending ? 'Enviando...' : 'Enviar Notificação'}
        </button>
        {result && <p className="text-sm">{result}</p>}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Últimas notificações enviadas</h3>
        {recentNotifications.map((n: any) => (
          <div key={n.id} className="glass-card">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold">{n.title}</span>
                <span className="text-xs text-muted-foreground ml-2">{n.type}</span>
              </div>
              <span className={`text-xs ${n.read ? 'text-green-500' : 'text-muted-foreground'}`}>
                {n.read ? 'Lida' : 'Não lida'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const Admin = () => {
  const { isAdmin } = useApp();

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="glass-card text-center">
          <p className="text-lg font-semibold">Acesso Restrito</p>
          <p className="text-sm text-muted-foreground mt-1">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Administração</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerenciamento de conteúdo da plataforma</p>
      </div>

      <Tabs defaultValue="hinos" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1">
          <TabsTrigger value="hinos">Hinos</TabsTrigger>
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
          <TabsTrigger value="ebooks">E-books</TabsTrigger>
          <TabsTrigger value="livros">Livros</TabsTrigger>
          <TabsTrigger value="materiais">Materiais</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="hinos"><HinosAdmin /></TabsContent>
        <TabsContent value="cursos"><CursosAdmin /></TabsContent>
        <TabsContent value="ebooks"><EbooksAdmin /></TabsContent>
        <TabsContent value="livros"><LivrosAdmin /></TabsContent>
        <TabsContent value="materiais"><MateriaisAdmin /></TabsContent>
        <TabsContent value="blog"><BlogAdmin /></TabsContent>
        <TabsContent value="notificacoes"><NotificacoesAdmin /></TabsContent>
      </Tabs>
    </div>
  );
};

// ── Hinos Admin ────────────────────────────────────────

function HinosAdmin() {
  const { albums, addAlbum, removeAlbum, addTrackToAlbum, removeTrackFromAlbum } = useApp();
  const [albumTitle, setAlbumTitle] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [trackUrl, setTrackUrl] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');

  const colors = ['from-blue-500/30 to-purple-500/30', 'from-amber-500/30 to-red-500/30', 'from-green-500/30 to-teal-500/30', 'from-pink-500/30 to-rose-500/30'];

  return (
    <div className="space-y-4 mt-4">
      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Disc3 className="w-4 h-4" /> Novo Álbum (CD)</h3>
        <div className="flex gap-2">
          <input value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} placeholder="Nome do álbum" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={() => { if (albumTitle) { addAlbum({ title: albumTitle, coverColor: colors[albums.length % colors.length], tracks: [] }); setAlbumTitle(''); } }} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold"><Plus className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold">Adicionar Faixa a Álbum</h3>
        <select value={selectedAlbum} onChange={e => setSelectedAlbum(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm">
          <option value="">Selecione um álbum</option>
          {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
        </select>
        <input value={trackTitle} onChange={e => setTrackTitle(e.target.value)} placeholder="Nome da faixa" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <div className="flex gap-2">
          <input value={trackUrl} onChange={e => setTrackUrl(e.target.value)} placeholder="URL do YouTube" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={() => { if (selectedAlbum && trackTitle && trackUrl) { addTrackToAlbum(selectedAlbum, { title: trackTitle, youtubeUrl: trackUrl }); setTrackTitle(''); setTrackUrl(''); } }} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">Adicionar</button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Álbuns ({albums.length})</h3>
        {albums.map(album => (
          <div key={album.id} className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{album.title}</span>
              <button onClick={() => removeAlbum(album.id)} className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
            {album.tracks.map(track => (
              <div key={track.id} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-secondary/20 mb-1 text-sm">
                <span className="truncate">{track.title}</span>
                <button onClick={() => removeTrackFromAlbum(album.id, track.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Cursos Admin ───────────────────────────────────────

function CursosAdmin() {
  const { courseCategories, addCourseCategory, removeCourseCategory, addVideoToCategory, removeVideoFromCategory } = useApp();
  const [catName, setCatName] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDesc, setVideoDesc] = useState('');

  return (
    <div className="space-y-4 mt-4">
      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><FolderPlus className="w-4 h-4" /> Nova Categoria</h3>
        <div className="flex gap-2">
          <input value={catName} onChange={e => setCatName(e.target.value)} placeholder="Nome da categoria" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={() => { if (catName) { addCourseCategory(catName); setCatName(''); } }} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold"><Plus className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Youtube className="w-4 h-4" /> Adicionar Vídeo</h3>
        <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm">
          <option value="">Selecione uma categoria</option>
          {courseCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input value={videoTitle} onChange={e => setVideoTitle(e.target.value)} placeholder="Título do vídeo" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <input value={videoDesc} onChange={e => setVideoDesc(e.target.value)} placeholder="Descrição" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <div className="flex gap-2">
          <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="URL do YouTube" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={() => {
            const ytId = getYoutubeId(videoUrl);
            if (selectedCat && videoTitle && ytId) {
              addVideoToCategory(selectedCat, { title: videoTitle, youtubeId: `https://www.youtube.com/embed/${ytId}`, description: videoDesc });
              setVideoTitle(''); setVideoUrl(''); setVideoDesc('');
            }
          }} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">Adicionar</button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Categorias ({courseCategories.length})</h3>
        {courseCategories.map(cat => (
          <div key={cat.id} className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{cat.name} ({cat.videos.length} vídeos)</span>
              <button onClick={() => removeCourseCategory(cat.id)} className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
            {cat.videos.map(v => (
              <div key={v.id} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-secondary/20 mb-1 text-sm">
                <span className="truncate">{v.title}</span>
                <button onClick={() => removeVideoFromCategory(cat.id, v.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── E-books Admin ──────────────────────────────────────

function EbooksAdmin() {
  const { ebooks, addEbook, removeEbook } = useApp();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [pages, setPages] = useState('');

  return (
    <div className="space-y-4 mt-4">
      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><BookMarked className="w-4 h-4" /> Novo E-book</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descrição" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <div className="flex gap-2">
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL de acesso" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <input value={pages} onChange={e => setPages(e.target.value)} placeholder="Páginas" type="number" className="w-24 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button onClick={() => { if (title) { addEbook({ title, author: 'Dr. Mauro Kwitko', description: desc, pages: Number(pages) || 0, url }); setTitle(''); setDesc(''); setUrl(''); setPages(''); } }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">Adicionar E-book</button>
      </div>
      <div className="space-y-2">
        {ebooks.map(e => (
          <div key={e.id} className="glass-card flex items-center justify-between">
            <span className="text-sm font-semibold">{e.title}</span>
            <button onClick={() => removeEbook(e.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Livros Admin ───────────────────────────────────────

function LivrosAdmin() {
  const { livros, addLivro, removeLivro } = useApp();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [pages, setPages] = useState('');

  return (
    <div className="space-y-4 mt-4">
      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><BookOpen className="w-4 h-4" /> Novo Livro</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descrição" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <div className="flex gap-2">
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL de compra" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <input value={pages} onChange={e => setPages(e.target.value)} placeholder="Páginas" type="number" className="w-24 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button onClick={() => { if (title) { addLivro({ title, author: 'Dr. Mauro Kwitko', description: desc, pages: Number(pages) || 0, url }); setTitle(''); setDesc(''); setUrl(''); setPages(''); } }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">Adicionar Livro</button>
      </div>
      <div className="space-y-2">
        {livros.map(l => (
          <div key={l.id} className="glass-card flex items-center justify-between">
            <span className="text-sm font-semibold">{l.title}</span>
            <button onClick={() => removeLivro(l.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Materiais Admin ────────────────────────────────────

function MateriaisAdmin() {
  const { materialItems, addMaterialItem, removeMaterialItem } = useApp();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('PDF');
  const [size, setSize] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div className="space-y-4 mt-4">
      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><FileText className="w-4 h-4" /> Novo Material</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <div className="flex gap-2">
          <input value={type} onChange={e => setType(e.target.value)} placeholder="Tipo (PDF, DOC...)" className="w-32 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <input value={size} onChange={e => setSize(e.target.value)} placeholder="Tamanho (ex: 2.4 MB)" className="w-40 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL do arquivo" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button onClick={() => { if (title) { addMaterialItem({ title, type, size, url }); setTitle(''); setType('PDF'); setSize(''); setUrl(''); } }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">Adicionar Material</button>
      </div>
      <div className="space-y-2">
        {materialItems.map(m => (
          <div key={m.id} className="glass-card flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold">{m.title}</span>
              <span className="text-xs text-muted-foreground ml-2">{m.type} · {m.size}</span>
            </div>
            <button onClick={() => removeMaterialItem(m.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Blog Admin ─────────────────────────────────────────

function BlogAdmin() {
  const { blogPosts, addBlogPost, removeBlogPost } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="space-y-4 mt-4">
      <div className="glass-card space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><PenSquare className="w-4 h-4" /> Novo Post</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do post" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Conteúdo do post..." rows={4} className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        <div className="flex gap-2 items-center">
          <ImageIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL da imagem (opcional)" className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button onClick={() => { if (title && content) { addBlogPost({ title, content, imageUrl: imageUrl || undefined, author: 'Dr. Mauro Kwitko' }); setTitle(''); setContent(''); setImageUrl(''); } }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">Publicar Post</button>
      </div>
      <div className="space-y-2">
        {blogPosts.map(p => (
          <div key={p.id} className="glass-card flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold">{p.title}</span>
              <span className="text-xs text-muted-foreground ml-2">{new Date(p.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <button onClick={() => removeBlogPost(p.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
