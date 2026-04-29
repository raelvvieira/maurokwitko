import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ARTICLES } from '@/data/articles';
import { getArticleImage } from '@/data/articleImages';
import { getArrayTranslation } from '@/i18n';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const article = ARTICLES.find((a) => a.slug === id);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate('/app/blog')} className="flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> {t('artigoDetalhe.backShort')}
        </button>
        <div className="glass-card text-center text-sm text-muted-foreground py-12">{t('artigoDetalhe.notFound')}</div>
      </div>
    );
  }

  const translatedTitle = t(`articleTitles.${article.slug}`, { defaultValue: article.title });
  const translatedBodyRaw = t(`articleBodies.${article.slug}`, { returnObjects: true, defaultValue: article.body });
  const translatedBody = getArrayTranslation<string>(translatedBodyRaw);
  const body = translatedBody.length === article.body.length ? translatedBody : article.body;

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/app/blog')}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> {t('artigoDetalhe.backShort')}
      </button>

      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
          {t('artigoDetalhe.label')}
        </span>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight leading-[1.15]">
          {translatedTitle}
        </h1>
        <p className="mt-3 text-sm font-medium text-muted-foreground">{t('artigoDetalhe.by')}</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="aspect-[21/9] rounded-2xl overflow-hidden bg-muted ring-1 ring-border/40 shadow-md mb-10"
      >
        <img
          src={getArticleImage(article.slug)}
          alt={translatedTitle}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
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
              <h2 key={idx} className="text-xl md:text-2xl font-bold tracking-tight text-foreground pt-4">
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
    </div>
  );
};

export default BlogPost;
