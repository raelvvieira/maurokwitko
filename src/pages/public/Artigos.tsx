import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import { getArticleImage } from '@/data/articleImages';

const Artigos = () => {
  return (
    <div className="bg-background">
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
            Reflexões e Pesquisas
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Artigos do <span className="italic font-serif text-primary">Dr. Mauro Kwitko</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Textos sobre Psicoterapia Reencarnacionista, vidas passadas e a fronteira entre ciência e espiritualidade.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ARTICLES.map((art, i) => (
            <motion.article
              key={art.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-3xl overflow-hidden bg-secondary/40 border border-border/60 hover:border-primary/40 hover:shadow-xl transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={getArticleImage(art.slug)}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
                {art.title}
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                {art.excerpt}
              </p>
              <Link
                to={`/artigos/${art.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all"
              >
                Ler artigo <ArrowRight className="w-4 h-4" />
              </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Artigos;
