import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ARTICLES } from '@/data/articles';
import { getArticleImage } from '@/data/articleImages';
import { getArrayTranslation } from '@/i18n';
import { useArticleOverrides, applyOverride, pickLang, findArticle } from '@/hooks/useArticleOverrides';
import { useAuth } from '@/hooks/useAuth';
import ArticleEditorDrawer from '@/components/admin/ArticleEditorDrawer';

const ArtigoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { overrides, refetch, customArticles, loading } = useArticleOverrides();
  const { isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);

  const article = slug ? findArticle(slug, customArticles) : undefined;

  if (!article) {
    if (loading) return <div className="pt-32 text-center text-sm text-muted-foreground">…</div>;
    return <Navigate to="/artigos" replace />;
  }

  const lang = pickLang(i18n.language);
  const ov = overrides.get(article.slug);
  const cover = ov?.image_url || getArticleImage(article.slug);

  let translatedTitle: string;
  let body: string[];
  if (ov) {
    const v = applyOverride(article, ov, lang);
    translatedTitle = v.title;
    body = v.body;
  } else {
    translatedTitle = t(`articleTitles.${article.slug}`, { defaultValue: article.title });
    const translatedBodyRaw = t(`articleBodies.${article.slug}`, { returnObjects: true, defaultValue: article.body });
    const translatedBody = getArrayTranslation<string>(translatedBodyRaw);
    body = translatedBody.length === article.body.length ? translatedBody : article.body;
  }

  return (
    <div className="bg-background">
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/artigos"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t('artigoDetalhe.back')}
            </Link>
            {isAdmin && (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow hover:bg-primary/90"
              >
                <Pencil className="w-3.5 h-3.5" /> Editar artigo
              </button>
            )}
          </div>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14"
          >
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
              {t('artigoDetalhe.label')}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {translatedTitle}
            </h1>
            <p className="mt-5 text-sm font-medium text-muted-foreground">{t('artigoDetalhe.by')}</p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="aspect-[21/9] rounded-2xl overflow-hidden bg-muted ring-1 ring-border/40 shadow-md mb-10 md:mb-14"
          >
            <img
              src={cover}
              alt={translatedTitle}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/85"
          >
            {body.map((para, idx) => {
              if (para.startsWith('__LIST__')) {
                const items = para.replace('__LIST__', '').split('||');
                return (
                  <ul key={idx} className="space-y-3 pl-5 list-disc marker:text-primary">
                    {items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              }
              if (para.startsWith('__SUB__')) {
                return (
                  <h2 key={idx} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground pt-4">
                    {para.replace('__SUB__', '')}
                  </h2>
                );
              }
              if (para.startsWith('__QUOTE__')) {
                const parts = para.replace('__QUOTE__', '').split('||');
                return (
                  <blockquote
                    key={idx}
                    className="border-l-4 border-primary/60 bg-primary/5 rounded-r-2xl px-6 py-5 italic text-foreground/90"
                  >
                    <p>{parts[0]}</p>
                    {parts[1] && (
                      <footer className="mt-2 text-sm not-italic font-semibold text-primary">— {parts[1]}</footer>
                    )}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className={idx === 0 ? 'text-lg md:text-xl text-foreground' : ''}>
                  {para}
                </p>
              );
            })}
          </motion.div>

          <div className="mt-16 md:mt-20 rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              {t('artigoDetalhe.ctaTitle')}
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              {t('artigoDetalhe.ctaDesc')}
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              {t('artigoDetalhe.ctaButton')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <ArticleEditorDrawer
        open={editing}
        onClose={() => setEditing(false)}
        article={article}
        override={ov}
        onSaved={refetch}
      />
    </div>
  );
};

export default ArtigoDetalhe;
