import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Article } from '@/data/articles';
import type { ArticleOverride } from '@/hooks/useArticleOverrides';

type BlockType = 'paragraph' | 'sub' | 'list' | 'quote';
type Block = { type: BlockType; text: string; author?: string };

function parseBody(body: string[]): Block[] {
  return body.map((p) => {
    if (p.startsWith('__SUB__')) return { type: 'sub' as const, text: p.replace('__SUB__', '') };
    if (p.startsWith('__LIST__')) return { type: 'list' as const, text: p.replace('__LIST__', '') };
    if (p.startsWith('__QUOTE__')) {
      const [text, author] = p.replace('__QUOTE__', '').split('||');
      return { type: 'quote' as const, text, author: author ?? '' };
    }
    return { type: 'paragraph' as const, text: p };
  });
}

function serializeBody(blocks: Block[]): string[] {
  return blocks.map((b) => {
    switch (b.type) {
      case 'sub': return `__SUB__${b.text}`;
      case 'list': return `__LIST__${b.text}`;
      case 'quote': return `__QUOTE__${b.text}${b.author ? `||${b.author}` : ''}`;
      default: return b.text;
    }
  });
}

const TYPE_LABELS: Record<BlockType, string> = {
  paragraph: 'Parágrafo',
  sub: 'Subtítulo',
  list: 'Lista (itens separados por ||)',
  quote: 'Citação',
};

export default function ArticleEditorDrawer({
  open,
  onClose,
  article,
  override,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  article: Article;
  override?: ArticleOverride;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = override?.title_pt || article.title;
    const e = override?.excerpt_pt || article.excerpt;
    const b = override?.body_pt?.length ? override.body_pt : article.body;
    setTitle(t);
    setExcerpt(e);
    setBlocks(parseBody(b));
  }, [open, article, override]);

  const update = (i: number, patch: Partial<Block>) =>
    setBlocks((bs) => bs.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  const remove = (i: number) => setBlocks((bs) => bs.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) =>
    setBlocks((bs) => {
      const j = i + dir;
      if (j < 0 || j >= bs.length) return bs;
      const copy = [...bs];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  const add = (type: BlockType) =>
    setBlocks((bs) => [...bs, { type, text: '', author: type === 'quote' ? '' : undefined }]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Título obrigatório');
      return;
    }
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('translate-article', {
        body: {
          slug: article.slug,
          title_pt: title.trim(),
          excerpt_pt: excerpt.trim(),
          body_pt: serializeBody(blocks).filter((s) => s.trim().length > 0),
        },
      });
      if (error || (data as any)?.error) {
        throw new Error((data as any)?.error || error?.message || 'Erro');
      }
      toast.success('Artigo atualizado e traduzido');
      onSaved();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!override) return;
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-3xl bg-background shadow-2xl flex flex-col">
        <header className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-lg font-bold">Editar artigo (português)</h2>
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold">Blocos do artigo</label>
              <div className="flex gap-1.5 flex-wrap">
                {(['paragraph', 'sub', 'list', 'quote'] as BlockType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => add(t)}
                    type="button"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-[11px] font-semibold hover:bg-primary/20"
                  >
                    <Plus className="w-3 h-3" /> {TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {blocks.map((b, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold uppercase tracking-wide">{TYPE_LABELS[b.type]}</span>
                    <div className="flex gap-1">
                      <button onClick={() => move(i, -1)} className="p-1 hover:text-foreground" title="Mover para cima"><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button onClick={() => move(i, 1)} className="p-1 hover:text-foreground" title="Mover para baixo"><ArrowDown className="w-3.5 h-3.5" /></button>
                      <button onClick={() => remove(i)} className="p-1 hover:text-destructive" title="Remover"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <textarea
                    value={b.text}
                    onChange={(e) => update(i, { text: e.target.value })}
                    rows={b.type === 'paragraph' ? 4 : 2}
                    className="w-full px-3 py-2 rounded-lg bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {b.type === 'quote' && (
                    <input
                      placeholder="Autor (opcional)"
                      value={b.author ?? ''}
                      onChange={(e) => update(i, { author: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  )}
                </div>
              ))}
              {blocks.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-6">Nenhum bloco. Adicione um acima.</div>
              )}
            </div>
          </div>
        </div>

        <footer className="p-5 border-t border-border flex items-center justify-between gap-3">
          {override ? (
            <button
              onClick={handleReset}
              disabled={saving}
              className="text-xs text-destructive hover:underline disabled:opacity-50"
            >
              Restaurar versão original
            </button>
          ) : <span />}
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
