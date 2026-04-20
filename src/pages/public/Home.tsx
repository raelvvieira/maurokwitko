import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, Quote, Calendar, Mail, MessageCircle } from 'lucide-react';
import { BOOKS } from '@/data/books';
import { supabase } from '@/integrations/supabase/client';
import { Marquee } from '@/components/public/Marquee';

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

const GALLERY = [
  { src: 'https://i.ibb.co/MDJBY2J0/AULAS-TE-RICAS.jpg', label: 'Aulas Teóricas' },
  { src: 'https://i.ibb.co/HDQbPzRX/AULAS-PR-TICAS.jpg', label: 'Aulas Práticas' },
  { src: 'https://i.ibb.co/bjyq508N/DR-MAURO-CURSO-DE-FORMA-O.jpg', label: 'Curso de Formação' },
  { src: 'https://i.ibb.co/ksCJ5Jbw/ENCONTRO-NACIONAL-DA-ABPR.jpg', label: 'Encontro Nacional ABPR' },
  { src: 'https://i.ibb.co/hJ0mBLYW/TURMA-DO-CURSO-DE-FORMA-O.jpg', label: 'Turma do Curso' },
  { src: 'https://i.ibb.co/6JTKCKpx/EVOLU-O-CONSCIENCIAL.jpg', label: 'Evolução Consciencial' },
];

type Ebook = { id: string; title: string; cover_url: string | null };

const Home = () => {
  const navigate = useNavigate();
  const [ebooks, setEbooks] = useState<Ebook[]>([]);

  useEffect(() => {
    supabase
      .from('ebooks')
      .select('id,title,cover_url')
      .not('cover_url', 'is', null)
      .limit(20)
      .then(({ data }) => {
        if (data) setEbooks(data as Ebook[]);
      });
  }, []);

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
                href="#formacao"
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
                src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
                alt="Dr. Mauro Kwitko"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIVROS — Marquee */}
      <section id="livros" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12">
          <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Bibliografia</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Aprenda Com Meus Livros</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Quase 30 anos de experiência clínica condensados em obras que orientam o caminho da reforma íntima.
              </p>
            </div>
          </motion.div>
        </div>

        <Marquee
          items={BOOKS}
          duration={60}
          renderItem={(book) => (
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-[160px] md:w-[200px]"
            >
              <div className="relative w-[160px] h-[240px] md:w-[200px] md:h-[300px] rounded-2xl overflow-hidden bg-muted shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-xs md:text-sm font-semibold leading-snug line-clamp-2">{book.title}</h3>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                Saiba Mais <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          )}
        />
      </section>

      {/* FORMAÇÃO — Course CTA */}
      <section id="formacao" className="py-20 md:py-28 bg-secondary/30 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl overflow-hidden bg-background border border-border/60 shadow-sm p-8 md:p-14 lg:p-16 grid md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <div className="relative space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wider uppercase">
                Inscrições Abertas
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Formação em <span className="italic font-serif text-primary">Psicoterapia Reencarnacionista</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Uma nova visão psicológica baseada na Reencarnação, para que possamos realmente aproveitar a encarnação. Formação completa para terapeutas integrarem a Terapia de Regressão à prática clínica.
              </p>
              <ul className="space-y-3 pt-2">
                {['Técnicas Avançadas de Regressão', 'Anatomia Espiritual & Karma', 'Casos Clínicos & Supervisão'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/formacao')}
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
              >
                Conhecer a Formação <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
              <img
                src="https://i.ibb.co/bjyq508N/DR-MAURO-CURSO-DE-FORMA-O.jpg"
                alt="Curso de Formação"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* E-books do Clube */}
      {ebooks.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 md:px-6 mb-10">
            <motion.div {...fadeUp}>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">E-books</span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Disponíveis no Clube de Estudos</h3>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm md:text-base">
                Acesse a biblioteca completa de e-books como membro do Clube.
              </p>
            </motion.div>
          </div>

          <Marquee
            items={ebooks}
            duration={50}
            renderItem={(eb) => (
              <button
                onClick={() => navigate('/login')}
                className="group block w-[160px] md:w-[200px] text-left"
              >
                <div className="relative w-[160px] h-[240px] md:w-[200px] md:h-[300px] rounded-2xl overflow-hidden bg-muted shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                  {eb.cover_url && (
                    <img
                      src={eb.cover_url}
                      alt={eb.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-[11px] font-bold tracking-wider uppercase transition-opacity">
                      Disponível no Clube
                    </span>
                  </div>
                </div>
                <h4 className="mt-3 text-xs font-semibold leading-snug line-clamp-2">{eb.title}</h4>
              </button>
            )}
          />
        </section>
      )}

      {/* QUEM SOU EU */}
      <section id="quem-sou-eu" className="py-20 md:py-28 bg-secondary/30 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div {...fadeUp} className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 to-transparent rounded-[2rem] blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="https://i.ibb.co/358FCytk/DR-MAURO-2.jpg"
                alt="Dr. Mauro Kwitko"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-6 order-1 md:order-2">
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Quem Sou Eu</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Olá, sou <span className="italic font-serif text-primary">Dr. Mauro</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Há cerca de 30 anos venho me dedicando a orientar pessoas — no consultório, nas palestras e nos cursos — a recordarem que somos Espíritos encarnados, com finalidades próprias a cada um.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                'Fundador e patrono da Associação Brasileira de Psicoterapia Reencarnacionista (ABPR)',
                'Mais de 20.000 Investigações do Inconsciente (Regressões) realizadas',
                'Mais de 60 turmas formadas no Curso de Psicoterapia Reencarnacionista',
                '19 livros publicados (físicos e e-books)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-foreground/85">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/40">
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">20k+</p>
                <p className="text-xs text-muted-foreground mt-1">Atendimentos</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">19</p>
                <p className="text-xs text-muted-foreground mt-1">Livros</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">60+</p>
                <p className="text-xs text-muted-foreground mt-1">Turmas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Trajetória</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">Momentos da Jornada</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((g, i) => (
              <motion.div
                key={g.src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-secondary shadow-md"
              >
                <img
                  src={g.src}
                  alt={g.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs md:text-sm font-semibold tracking-wide">{g.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
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

      {/* ARTIGOS */}
      <section id="artigos" className="py-20 md:py-28">
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

      {/* CONTATO */}
      <section id="contato" className="py-20 md:py-28 bg-secondary/30 border-t border-border/40">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Contato</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 leading-tight">
            Vamos <span className="italic font-serif text-primary">conversar</span>
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed text-base md:text-lg">
            Me envie uma mensagem para que possamos conversar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="mailto:contato@maurokwitko.com.br"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" /> Enviar mensagem
            </a>
            <a
              href="https://wa.me/5551999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success text-success-foreground text-sm font-semibold hover:bg-success/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
