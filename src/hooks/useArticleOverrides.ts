import { useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ARTICLES, type Article } from '@/data/articles';

export type ArticleOverride = {
  slug: string;
  title_pt: string;
  excerpt_pt: string;
  body_pt: string[];
  title_en: string | null;
  excerpt_en: string | null;
  body_en: string[] | null;
  title_es: string | null;
  excerpt_es: string | null;
  body_es: string[] | null;
  is_custom: boolean;
  image_url: string | null;
  updated_at: string;
};

export function useArticleOverrides() {
  const [overrides, setOverrides] = useState<Map<string, ArticleOverride>>(new Map());
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    const { data } = await supabase
      .from('article_overrides')
      .select('*')
      .order('updated_at', { ascending: false });
    if (data) {
      const m = new Map<string, ArticleOverride>();
      for (const row of data as any[]) m.set(row.slug, row as ArticleOverride);
      setOverrides(m);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // List of custom articles (not in static ARTICLES) as Article-like objects
  const customArticles: Article[] = useMemo(() => {
    const list: Article[] = [];
    for (const ov of overrides.values()) {
      if (ov.is_custom) {
        list.push({
          slug: ov.slug,
          title: ov.title_pt,
          excerpt: ov.excerpt_pt,
          body: ov.body_pt ?? [],
        });
      }
    }
    return list;
  }, [overrides]);

  return { overrides, loading, refetch, customArticles };
}

export function pickLang(language: string): 'pt' | 'en' | 'es' {
  if (language?.startsWith('en')) return 'en';
  if (language?.startsWith('es')) return 'es';
  return 'pt';
}

export function applyOverride(
  article: Article,
  override: ArticleOverride | undefined,
  lang: 'pt' | 'en' | 'es',
): { title: string; excerpt: string; body: string[] } {
  if (!override) {
    return { title: article.title, excerpt: article.excerpt, body: article.body };
  }
  if (lang === 'pt') {
    return {
      title: override.title_pt || article.title,
      excerpt: override.excerpt_pt || article.excerpt,
      body: Array.isArray(override.body_pt) && override.body_pt.length > 0 ? override.body_pt : article.body,
    };
  }
  const t = lang === 'en' ? override.title_en : override.title_es;
  const e = lang === 'en' ? override.excerpt_en : override.excerpt_es;
  const b = lang === 'en' ? override.body_en : override.body_es;
  return {
    title: t || override.title_pt || article.title,
    excerpt: e || override.excerpt_pt || article.excerpt,
    body: Array.isArray(b) && b.length > 0 ? b : (override.body_pt?.length ? override.body_pt : article.body),
  };
}

export function findArticle(slug: string, customArticles: Article[]): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug) || customArticles.find((a) => a.slug === slug);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}
