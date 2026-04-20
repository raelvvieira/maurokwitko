import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Quote, Calendar } from 'lucide-react';
import { BOOKS } from '@/data/books';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const ARTICLES = [
  {
    category: 'Regressão',
    date: '12 Mar 2025',
    title: 'O que a memória de vidas passadas revela sobre o presente',
    excerpt: 'Uma reflexão sobre como recordações antigas iluminam padrões emocionais atuais.',
  },
  {
    category: 'Espiritualidade',
    date: '02 Mar 2025',
    title: 'Karma e responsabilidade: além do conceito popular',
    excerpt: 'Compreendendo o karma como um princípio de aprendizado, não de punição.',
  },
  {
    category: 'Clínica',
    date: '18 Fev 2025',
    title: 'Quando a psicoterapia tradicional encontra a regressão',
    excerpt: 'Como integrar abordagens científicas e transcendentais no consultório.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const featuredBooks = BOOKS.slice(0, 3);

  return (
    <div id="home" className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="absolute inset-0 -z-10 mesh-gradient opacity-60" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div {...fadeUp} className="space-y-7">
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              30+ anos de excelência clínica
            </span>
            <h1 className="font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Ciência e{' '}
              <span className="italic font-serif text-primary">Despertar Espiritual</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Dr. Mauro Kwitko integra a Psicoterapia de Regressão à psicologia clínica há mais de três décadas, oferecendo um caminho onde o rigor científico encontra a profundidade da alma.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#cursos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                Conheça o Método <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#artigos"
                className="inline-flex items-center px-6 py-3 rounded-full bg-secondary/80 text-foreground text-sm font-semibold hover:bg-secondary transition-colors"
              >
                Pesquisas Recentes
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-[2.5rem] blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-secondary shadow-2xl">
              <img
                src="https://i.ibb.co/MDn6WZRV/DR-MAURO-1.png"
                alt="Dr. Mauro Kwitko"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-16 md:py-24 border-y border-border/40 bg-secondary/30">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground">
            "Curar não é apenas a ausência de sintomas, mas a presença de sentido encontrado na jornada da alma através do tempo."
          </p>
          <p className="mt-8 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            — Dr. Mauro Kwitko
          </p>
        </motion.div>
      </section>

      {/* COURSE CTA */}
      <section id="cursos" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl overflow-hidden bg-[hsl(210_25%_14%)] text-white p-8 md:p-14 lg:p-16 grid md:grid-cols-2 gap-10 items-center"
          >
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.5), transparent 50%), radial-gradient(circle at 20% 80%, hsl(var(--accent) / 0.4), transparent 50%)',
              }}
            />
            <div className="relative space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-success/20 text-success text-[11px] font-bold tracking-wider uppercase">
                Inscrições Abertas
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Curso de Formação em Psicoterapia Reencarnacionista
              </h2>
              <p className="text-white/70 leading-relaxed max-w-md">
                Uma jornada profunda de formação para terapeutas que desejam integrar a Terapia de Regressão à sua prática clínica com fundamentação técnica e ética.
              </p>
              <ul className="space-y-3 pt-2">
                {['Técnicas Avançadas de Regressão', 'Anatomia Espiritual & Karma', 'Casos Clínicos & Supervisão'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-success" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-success text-success-foreground text-sm font-semibold hover:bg-success/90 transition-colors">
                Entrar para a Lista de Espera <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-square md:aspect-auto md:h-[420px] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.7), hsl(210 30% 8%) 70%)',
                }}
              />
              <div className="absolute inset-0 opacity-60 mix-blend-screen"
                   style={{
                     background:
                       'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 70%, white, transparent), radial-gradient(1.5px 1.5px at 80% 10%, white, transparent), radial-gradient(1px 1px at 30% 80%, white, transparent), radial-gradient(2px 2px at 90% 60%, white, transparent), radial-gradient(1px 1px at 10% 50%, white, transparent), radial-gradient(1.5px 1.5px at 70% 40%, white, transparent), radial-gradient(1px 1px at 45% 15%, white, transparent)',
                   }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOKS */}
      <section id="livros" className="py-20 md:py-28 bg-secondary/30 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Bibliografia</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Últimas Publicações</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              Ver bibliografia completa <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {featuredBooks.map((book, i) => (
              <motion.a
                key={book.title}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group block"
              >
                <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-contain p-4" />
                </div>
                <h3 className="mt-5 font-semibold text-base leading-snug line-clamp-2">{book.title}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Saiba Mais <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img src="https://i.ibb.co/358FCytk/DR-MAURO-2.jpg" alt="Dr. Mauro Kwitko na ABPR" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 to-accent/20" />
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-primary/30" />
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img src="https://i.ibb.co/358FCytk/DR-MAURO-2.jpg" alt="Dr. Mauro palestrando" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-6">
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Sobre o Dr. Mauro</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              A Sabedoria da Experiência
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Médico psiquiatra e psicoterapeuta, Dr. Mauro Kwitko dedicou mais de 30 anos ao estudo e à prática da Terapia de Regressão a vidas passadas, tornando-se uma das principais referências brasileiras no tema.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Autor de mais de uma dezena de livros e fundador do Curso de Formação em Psicoterapia Reencarnacionista, ele segue formando terapeutas em todo o país com base sólida em ética, técnica e espiritualidade.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <p className="text-3xl md:text-4xl font-bold tracking-tight">15k+</p>
                <p className="text-sm text-muted-foreground mt-1">Horas Clínicas</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold tracking-tight">12</p>
                <p className="text-sm text-muted-foreground mt-1">Livros Publicados</p>
              </div>
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all pt-2">
              Conheça mais sobre sua trajetória <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES */}
      <section id="artigos" className="py-20 md:py-28 bg-secondary/30 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Reflexões</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Artigos Recentes</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {ARTICLES.map((art, i) => (
              <motion.article
                key={art.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-secondary mb-5 group-hover:shadow-lg transition-shadow" />
                <div className="flex items-center gap-3 text-[11px] font-bold tracking-wider uppercase text-muted-foreground mb-2">
                  <span className="text-primary">{art.category}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {art.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {art.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{art.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* HINOS placeholder anchor */}
      <div id="hinos" className="sr-only" />
    </div>
  );
};

export default Home;
