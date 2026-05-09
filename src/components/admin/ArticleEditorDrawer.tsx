import { useEffect, useRef, useState } from 'react';
import { Loader2, X, Upload, ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Article } from '@/data/articles';
import { type ArticleOverride, slugify } from '@/hooks/useArticleOverrides';

type Mode = 'edit' | 'create';

function bodyToText(body: string[]): string {
  return (body ?? []).join('\n\n');
}
function textToBody(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export default function ArticleEditorDrawer({
  open,
  onClose,
  mode = 'edit',
  article,
  override,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  mode?: Mode;
  article?: Article;
  override?: ArticleOverride;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    if (mode === 'create') {
      setTitle('');
      setExcerpt('');
      setBodyText('');
      setImageUrl(null);
      return;
    }
    const t = override?.title_pt || article?.title || '';
    const e = override?.excerpt_pt || article?.excerpt || '';
    const b = override?.body_pt?.length ? override.body_pt : (article?.body ?? []);
    setTitle(t);
    setExcerpt(e);
    setBodyText(bodyToText(b));
    setImageUrl(override?.image_url ?? null);
  }, [open, mode, article, override]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Selecione uma imagem');
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('article-images')
        .upload(path, file, { cacheControl: '3600', upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('article-images').getPublicUrl(path);
      setImageUrl(data.publicUrl);
      toast.success('Imagem enviada');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha no upload');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Título obrigatório');
      return;
    }
    const body_pt = textToBody(bodyText);
    if (body_pt.length === 0) {
      toast.error('Adicione o texto do artigo');
      return;
    }
    setSaving(true);
    try {
      const slug = mode === 'create' ? slugify(title) : article!.slug;
      if (!slug) {
        toast.error('Não foi possível gerar o slug do título');
        setSaving(false);
        return;
      }
      const { data, error } = await supabase.functions.invoke('translate-article', {
        body: {
          slug,
          title_pt: title.trim(),
          excerpt_pt: excerpt.trim(),
          body_pt,
          ...(mode === 'create' ? { is_custom: true } : {}),
          image_url: imageUrl,
        },
      });
      if (error || (data as any)?.error) {
        throw new Error((data as any)?.error || error?.message || 'Erro');
      }
      toast.success(mode === 'create' ? 'Artigo criado e traduzido' : 'Artigo atualizado e traduzido');
      onSaved();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!override || !article) return;
    if (!confirm('Remover edição e voltar ao texto original?')) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('translate-article', {
        body: { slug: article.slug, deleteOverride: true },
      });
      if (error || (data as any)?.error) throw new Error((data as any)?.error || error?.message);
      toast.success('Edição removida');
      onSaved();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCustom = async () => {
    if (!article) return;
    if (!confirm('Apagar este artigo definitivamente?')) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('translate-article', {
        body: { slug: article.slug, deleteOverride: true },
      });
      if (error || (data as any)?.error) throw new Error((data as any)?.error || error?.message);
      toast.success('Artigo apagado');
      onSaved();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;
  const isCustom = !!override?.is_custom || mode === 'create';

  return (
    <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-3xl bg-background shadow-2xl flex flex-col">
        <header className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-lg font-bold">
              {mode === 'create' ? 'Novo artigo (português)' : 'Editar artigo (português)'}
            </h2>
            <p className="text-xs text-muted-foreground">As traduções para EN e ES serão geradas automaticamente.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary"><X className="w-5 h-5" /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold mb-1.5">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5">Resumo (excerpt)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {isCustom && (
            <div>
              <label className="block text-xs font-semibold mb-1.5">Capa do artigo</label>
              <div className="flex items-center gap-3">
                <div className="w-28 h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center ring-1 ring-border">
                  {imageUrl ? (
                    <img src={imageUrl} alt="capa" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 disabled:opacity-60"
                  >
                    {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    {imageUrl ? 'Trocar imagem' : 'Enviar imagem'}
                  </button>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl(null)}
                      className="text-[11px] text-muted-foreground hover:text-destructive"
                    >
                      Remover imagem
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    e.currentTarget.value = '';
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5">Texto do artigo</label>
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              rows={20}
              placeholder="Cole ou escreva o artigo completo. Separe parágrafos com uma linha em branco."
              className="w-full px-3 py-3 rounded-lg bg-secondary/50 text-sm leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[400px]"
            />
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              Separe parágrafos com uma <strong>linha em branco</strong>. Marcadores opcionais no início de um parágrafo:
              {' '}<code className="px-1 rounded bg-secondary">__SUB__</code> subtítulo,
              {' '}<code className="px-1 rounded bg-secondary">__LIST__</code> itens separados por <code>||</code>,
              {' '}<code className="px-1 rounded bg-secondary">__QUOTE__</code> citação<code>||</code>autor.
            </p>
          </div>
        </div>

        <footer className="p-5 border-t border-border flex items-center justify-between gap-3">
          <div className="flex gap-3">
            {mode === 'edit' && override && !override.is_custom && (
              <button
                onClick={handleReset}
                disabled={saving}
                className="text-xs text-destructive hover:underline disabled:opacity-50"
              >
                Restaurar versão original
              </button>
            )}
            {mode === 'edit' && override?.is_custom && (
              <button
                onClick={handleDeleteCustom}
                disabled={saving}
                className="text-xs text-destructive hover:underline disabled:opacity-50"
              >
                Apagar artigo
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} disabled={saving} className="px-4 py-2 rounded-lg bg-secondary text-sm font-semibold">Cancelar</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
            >
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Traduzindo…</> : 'Salvar e traduzir'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
