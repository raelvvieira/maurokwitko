import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ARTICLES, type Article } from '@/data/articles';
import { getArticleImage } from '@/data/articleImages';
import { useArticleOverrides, applyOverride, pickLang } from '@/hooks/useArticleOverrides';

const Blog = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const { overrides, customArticles } = useArticleOverrides();

  const allArticles: Article[] = useMemo(
    () => [...customArticles, ...ARTICLES],
    [customArticles],
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Artigos</h1>
        <p className="text-sm text-muted-foreground mt-1">Reflexões e estudos do Dr. Mauro Kwitko</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {allArticles.map((article, i) => {
          const ov = overrides.get(article.slug);
          const i18nTitle = t(`articleTitles.${article.slug}`, { defaultValue: article.title });
          const i18nExcerpt = t(`articleExcerpts.${article.slug}`, { defaultValue: article.excerpt });
          const view = ov
            ? applyOverride(article, ov, lang)
            : { title: i18nTitle, excerpt: i18nExcerpt, body: article.body };
          const cover = ov?.image_url || getArticleImage(article.slug);
          return (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="glass-card group cursor-pointer flex flex-col"
              onClick={() => navigate(`/app/blog/${article.slug}`)}
            >
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-muted">
                <img
                  src={cover}
                  alt={view.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{view.title}</h2>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{view.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-muted-foreground">Dr. Mauro Kwitko</span>
                <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ler artigo <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
