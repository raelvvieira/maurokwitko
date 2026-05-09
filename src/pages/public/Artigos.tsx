import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Pencil, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { ARTICLES, type Article } from '@/data/articles';
import { getArticleImage } from '@/data/articleImages';
import { useArticleOverrides, applyOverride, pickLang } from '@/hooks/useArticleOverrides';
import { useAuth } from '@/hooks/useAuth';
import ArticleEditorDrawer from '@/components/admin/ArticleEditorDrawer';

const Artigos = () => {
  const { t, i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const { overrides, refetch, customArticles } = useArticleOverrides();
  const { isAdmin } = useAuth();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const allArticles: Article[] = useMemo(
    () => [...customArticles, ...ARTICLES],
    [customArticles],
  );

  const editingArticle = allArticles.find((a) => a.slug === editingSlug);

  return (
    <div className="bg-background">
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
            {t('artigos.eyebrow')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            {t('artigos.titleStart')}<span className="italic font-serif text-primary">{t('artigos.titleAccent')}</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('artigos.desc')}
          </p>
          {isAdmin && (
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setCreating(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" /> Adicionar artigo
              </button>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Pencil className="w-3.5 h-3.5" /> Modo admin
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-5 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allArticles.map((art, i) => {
            const ov = overrides.get(art.slug);
            const i18nTitle = t(`articleTitles.${art.slug}`, { defaultValue: art.title });
            const i18nExcerpt = t(`articleExcerpts.${art.slug}`, { defaultValue: art.excerpt });
            const view = ov
              ? applyOverride(art, ov, lang)
              : { title: i18nTitle, excerpt: i18nExcerpt, body: art.body };
            const cover = ov?.image_url || getArticleImage(art.slug);
            return (
              <motion.article
                key={art.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
                className="group relative rounded-3xl overflow-hidden bg-secondary/40 border border-border/60 hover:border-primary/40 hover:shadow-xl transition-all flex flex-col"
              >
                {isAdmin && (
                  <button
                    onClick={() => setEditingSlug(art.slug)}
                    className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/95 text-foreground text-xs font-semibold shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Editar
                  </button>
                )}
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={cover}
                    alt={view.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {view.title}
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {view.excerpt}
                  </p>
                  <Link
                    to={`/artigos/${art.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all"
                  >
                    {t('artigos.read')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {editingArticle && (
        <ArticleEditorDrawer
          open={!!editingSlug}
          onClose={() => setEditingSlug(null)}
          mode="edit"
          article={editingArticle}
          override={overrides.get(editingArticle.slug)}
          onSaved={refetch}
        />
      )}
      <ArticleEditorDrawer
        open={creating}
        onClose={() => setCreating(false)}
        mode="create"
        onSaved={refetch}
      />
    </div>
  );
};

export default Artigos;
