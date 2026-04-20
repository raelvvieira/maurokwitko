import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake, Sprout, Users } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const VALORES = [
  { icon: Sparkles, title: 'Fusão de saberes', text: 'Trabalhar pela fusão entre a Psicologia, a Psiquiatria e a Reencarnação.' },
  { icon: HeartHandshake, title: 'Aproveitar a encarnação', text: 'Ajudar as pessoas a aproveitarem ao máximo a sua encarnação.' },
  { icon: Sprout, title: 'Semear o bem', text: 'Ser mais um a semear o bem no mundo, todos os dias.' },
  { icon: Users, title: 'Somos irmãos', text: 'Relembrar a todos que somos irmãos, parte de um mesmo Todo.' },
];

const LIVROS_TITULOS = [
  'A Terapia da Reforma Íntima',
  'Como Aproveitar a Sua Encarnação',
  'Doutor, eu ouço vozes!',
  'Como Evoluir Espiritualmente em um Mundo de Drogas',
  'Jovens Guerreiros e Guerreiras da Luz',
  'Como Matar o Pensamento Suicida',
  'A Força Espiritual',
];

const QuemSouEu = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
              Quem Sou Eu
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Quem é <span className="text-primary">Dr. Mauro Kwitko</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Médico, fundador da Psicoterapia Reencarnacionista e Diretor de Ensino da
              Associação Brasileira de Psicoterapia Reencarnacionista (ABPR).
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-2xl">
              <img
                src="https://i.ibb.co/MDn6WZRV/DR-MAURO-1.png"
                alt="Dr. Mauro Kwitko"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* O Começo */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              O Começo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              De um pequeno consultório em Porto Alegre ao mundo
            </h2>
            <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                A jornada começa em um pequeno consultório em Porto Alegre/RS, quando atuava
                apenas como médico homeopata.
              </p>
              <p>
                Durante um atendimento, fui inspirado pelo Mundo Espiritual a agregar a
                Reencarnação ao meu trabalho terapêutico. Assim nasceu a{' '}
                <strong className="text-foreground">Psicoterapia Reencarnacionista</strong> e
                a sua ferramenta <em>“Investigação do Inconsciente”</em> (Regressão), ética,
                dirigida pelos Mentores Espirituais das pessoas, obedecendo a Lei do
                Esquecimento.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meus Valores */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              Meus Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              O que move meu trabalho
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALORES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABPR */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-muted">
            <img
              src="https://i.ibb.co/ksCJ5Jbw/ENCONTRO-NACIONAL-DA-ABPR.jpg"
              alt="Encontro Nacional da ABPR"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              A ABPR
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Associação Brasileira de Psicoterapia Reencarnacionista
            </h2>
            <div className="space-y-4 text-base text-foreground/80 leading-relaxed">
              <p>
                Em <strong>10 de agosto de 2004</strong> foi criada a Associação Brasileira
                de Psicoterapia Reencarnacionista — ABPR — por um pequeno grupo de idealistas.
              </p>
              <p>
                Ela é responsável pela sedimentação e expansão deste novo método psicoterapêutico,
                sempre respeitando a fidelidade aos Ensinos enviados pelo Mundo Espiritual.
              </p>
              <p>
                Atualmente já somos cerca de <strong>28 ministrantes</strong> do Curso de
                Formação em <strong>17 estados brasileiros</strong>, centenas de
                psicoterapeutas reencarnacionistas formados e em formação, e milhares de
                pessoas atendidas e beneficiadas por essa nova visão psicológica do ser humano
                encarnado.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Psicoterapia Reencarnacionista */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              Psicoterapia Reencarnacionista
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              O que é
            </h2>
            <div className="space-y-4 text-base text-foreground/80 leading-relaxed">
              <p>
                A Psicoterapia Reencarnacionista é uma moderna escola psicológica que agrega
                a Reencarnação, desenvolvendo o conceito de que a nossa vida não se inicia na
                infância, e que a nossa personalidade é, simplesmente, a continuação de como
                éramos na encarnação anterior — estando aí a chave para o entendimento de
                nossa proposta de <strong>Reforma Íntima</strong>.
              </p>
              <p>
                Mais profundamente, entende que somos o Todo (Deus) e uma micro-manifestação
                deste Todo, mas esquecemos disto e acreditamos que somos o nosso personagem
                atual, seus rótulos e suas ilusões.
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-xl aspect-[4/5] bg-muted">
            <img
              src="https://i.ibb.co/358FCytk/DR-MAURO-2.jpg"
              alt="Dr. Mauro Kwitko em atendimento"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Carreira */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              Mais sobre minha carreira
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Cinco décadas dedicadas a curar e ensinar
            </h2>
            <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                Sou médico formado pela <strong>Faculdade de Medicina da UFRGS em 1971</strong>.
                Desde 1996 me dedico a essa nova visão psicológica — a Escola de Psicoterapia
                Reencarnacionista. Sou Fundador, Patrono, ex-Presidente por vários mandatos
                e, atualmente, Diretor de Ensino da Associação Brasileira de Psicoterapia
                Reencarnacionista (ABPR).
              </p>
              <p>
                Fui um escritor russo em minha encarnação anterior e continuo sendo, até o
                momento, autor de <strong>19 livros</strong>, alguns físicos, alguns em
                e-book, entre eles:
              </p>
            </div>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {LIVROS_TITULOS.map((titulo) => (
                <li
                  key={titulo}
                  className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-medium text-foreground/80"
                >
                  “{titulo}”
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Aprofunde-se nos meus ensinamentos
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Acesse cursos, livros, e-books e lives exclusivas no Clube de Estudos.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Entrar no Clube de Estudos <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default QuemSouEu;
