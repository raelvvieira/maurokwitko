import { useApp, MediaItem } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Upload, Trash2, Film, Music, FileText, Youtube, Play, X } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';

const categoryLabels: Record<string, string> = {
  courses: 'Cursos',
  library: 'Biblioteca',
  materials: 'Materiais',
};

const typeIcons: Record<string, React.ElementType> = {
  video: Film,
  audio: Music,
  document: FileText,
};

const getFileType = (file: File): 'video' | 'audio' | 'document' => {
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  return 'document';
};

const getYoutubeId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|.*&v=))([^&#?]*)/);
  return match?.[1] ?? null;
};

const Admin = () => {
  const { mediaItems, addMediaItem, removeMediaItem, isAdmin } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'courses' | 'library' | 'materials'>('courses');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const type = getFileType(file);
    const url = URL.createObjectURL(file);
    if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
    addMediaItem({ title: title || file.name.replace(/\.[^/.]+$/, ''), description, type, category, url, fileName: file.name });
    setTitle('');
    setDescription('');
  }, [title, description, category, addMediaItem]);

  const handleYoutube = () => {
    const ytId = getYoutubeId(youtubeUrl);
    if (!ytId || !title) return;
    addMediaItem({ title, description, type: 'video', category, url: youtubeUrl, youtubeId: ytId });
    setTitle('');
    setDescription('');
    setYoutubeUrl('');
  };

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
        <p className="text-sm text-muted-foreground mt-1">Upload e gerenciamento de conteúdo</p>
      </div>

      {/* Upload form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card space-y-4">
        <h2 className="text-sm font-semibold">Novo Upload</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Título</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nome do conteúdo" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Categoria</label>
            <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
              <option value="courses">Cursos</option>
              <option value="library">Biblioteca</option>
              <option value="materials">Materiais</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Descrição</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição opcional..." rows={2} className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </div>

        {/* Drag and drop */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}
        >
          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Arraste um arquivo ou clique para selecionar</p>
          <p className="text-xs text-muted-foreground mt-1">Vídeo, áudio ou documento</p>
          <input ref={fileRef} type="file" accept="video/*,audio/*,.pdf,.doc,.docx,.zip,.md,.txt" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
        </div>

        {/* YouTube */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} placeholder="Cole a URL do YouTube..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button onClick={handleYoutube} disabled={!youtubeUrl || !title} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold disabled:opacity-50 hover:shadow-lg transition-shadow">
            Adicionar Vídeo
          </button>
        </div>
      </motion.div>

      {/* Media list */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Conteúdo Enviado ({mediaItems.length})</h2>
        {mediaItems.length === 0 && (
          <div className="glass-card text-center text-sm text-muted-foreground py-8">
            Nenhum conteúdo enviado ainda.
          </div>
        )}
        {mediaItems.map((item, i) => {
          const Icon = typeIcons[item.type];
          return (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{categoryLabels[item.category]} · {item.type} · {new Date(item.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
              <button onClick={() => setPreviewItem(item)} className="p-2 rounded-xl hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                <Play className="w-4 h-4" />
              </button>
              <button onClick={() => removeMediaItem(item.id)} className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Preview modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setPreviewItem(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreviewItem(null)} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-semibold mb-3">{previewItem.title}</h3>

            {previewItem.type === 'video' && previewItem.youtubeId && (
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe src={`https://www.youtube.com/embed/${previewItem.youtubeId}`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            )}
            {previewItem.type === 'video' && !previewItem.youtubeId && (
              <video src={previewItem.url} controls className="w-full rounded-xl" />
            )}
            {previewItem.type === 'audio' && (
              <audio src={previewItem.url} controls className="w-full mt-2" />
            )}
            {previewItem.type === 'document' && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">{previewItem.fileName}</p>
                <a href={previewItem.url} download={previewItem.fileName} className="inline-block mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Download</a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
