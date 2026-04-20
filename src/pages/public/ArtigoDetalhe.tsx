import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/data/articles';

const ArtigoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/artigos" replace />;

  return (
    <div className="bg-background">
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/artigos"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Artigos
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14"
          >
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
              Artigo
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {article.title}
            </h1>
            <p className="mt-5 text-sm font-medium text-muted-foreground">por Dr. Mauro Kwitko</p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/85"
          >
            {article.body.map((para, idx) => {
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
              return (
                <p key={idx} className={idx === 0 ? 'text-lg md:text-xl text-foreground' : ''}>
                  {para}
                </p>
              );
            })}
          </motion.div>

          <div className="mt-16 md:mt-20 rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Quer aprofundar seus estudos?
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Faça parte do Clube de Estudos do Dr. Mauro Kwitko e tenha acesso à biblioteca completa de e-books, cursos, hinos e materiais exclusivos.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              Conhecer o Clube de Estudos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtigoDetalhe;
