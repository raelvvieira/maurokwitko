import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Sparkles,
  Download,
  Check,
  Stethoscope,
  Leaf,
  GraduationCap,
  HeartHandshake,
  School,
} from 'lucide-react';

const WhatsAppIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.892 6.994c-.003 5.45-4.437 9.884-9.884 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const PILARES = [
  'Infância, continuação da vida passada',
  'A finalidade e o aproveitamento da encarnação',
  'As armadilhas e os gatilhos terrenos como ferramentas de evolução',
  'Como promover a nossa Reforma Íntima',
  'O que é o Livre Arbítrio',
];

const MODULOS = [
  {
    icon: BookOpen,
    img: 'https://i.ibb.co/MDJBY2J0/AULAS-TE-RICAS.jpg',
    label: 'Aulas Teóricas',
    items: [
      'O que é a Psicoterapia Reencarnacionista',
      'A Investigação do Inconsciente (“Regressões”)',
      'Os níveis do ego',
      'A Ilusão dos Rótulos das Cascas (Maya)',
      'Somos o Todo e suas micro-manifestações',
    ],
  },
  {
    icon: Users,
    img: 'https://i.ibb.co/HDQbPzRX/AULAS-PR-TICAS.jpg',
    label: 'Aulas Práticas',
    items: [
      'Grupos de Prática de Investigação do Inconsciente',
      'Simulação de Plano Astral',
      'As gotinhas do Mar',
      'O Encontro consigo mesmo',
      'Rodadas de inferioridades e de virtudes',
    ],
  },
  {
    icon: Sparkles,
    img: 'https://i.ibb.co/6JTKCKpx/EVOLU-O-CONSCIENCIAL.jpg',
    label: 'Evolução Consciencial',
    items: [
      'A Personalidade Congênita',
      'A Programação para a atual encarnação',
      'O Livre-Arbítrio pré-reencarnatório',
      'O Livre-Arbítrio durante a encarnação',
      'Como libertar-se de si mesmo e alcançar o ego ancião',
    ],
  },
];

const CRITERIOS = [
  { icon: Stethoscope, titulo: 'Profissional da Saúde Oficial', desc: 'Médicos, psiquiatras, psicólogos, nutricionistas, fisioterapeutas, enfermeiros etc.' },
  { icon: Leaf, titulo: 'Profissional da Saúde Alternativa', desc: 'Terapeutas florais, reikianos, astrólogos, numerólogos, massoterapeutas etc.' },
  { icon: GraduationCap, titulo: 'Estudante na área da saúde', desc: 'Cursando áreas oficiais ou alternativas com objetivo de tornar-se profissional.' },
  { icon: HeartHandshake, titulo: 'Trabalhadores de Instituições Religiosas', desc: 'Médiuns atuantes em Centro Espírita ou Espiritualista.' },
  { icon: School, titulo: 'Profissional da Educação', desc: 'Professores, pedagogos, psicopedagogos etc.' },
];

const TURMAS = [
  { local: 'Rio de Janeiro', data: 'Junho 2026', link: 'https://chat.whatsapp.com/D2yhIa0pwqU789zytvfYKC' },
  { local: 'Porto Alegre', data: 'Junho 2026', link: 'https://chat.whatsapp.com/Cx0Z343wotY9FQrhKeBnXB' },
];

const Formacao = () => {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
              Curso de Formação
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Curso de Formação em <span className="text-primary">Psicoterapia Reencarnacionista</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Forme-se em uma escola psicoterapêutica que une psicologia, psiquiatria e o
              olhar reencarnacionista para auxiliar na cura e na evolução espiritual.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] max-w-md mx-auto md:max-w-none w-full bg-muted">
            <img
              src="https://i.ibb.co/bjyq508N/DR-MAURO-CURSO-DE-FORMA-O.jpg"
              alt="Dr. Mauro Kwitko ministrando o Curso de Formação"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        </div>
      </section>

      {/* O que é */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              O que é
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Um olhar reencarnacionista sobre a vida
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
              O Curso de Formação em Psicoterapia Reencarnacionista visa formar profissionais
              capazes de auxiliar a todos a enxergarem a vida sob o olhar reencarnacionista.
              A partir desta visão, podemos perceber que somos como somos porque nascemos
              assim, trazendo uma bagagem de outras vidas que precisa ser trabalhada para que
              possamos nos curar e evoluir espiritualmente.
            </p>
            <ul className="space-y-3">
              {PILARES.map((p) => (
                <li key={p} className="flex gap-3 items-start">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-base text-foreground/80">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo do Curso */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              Conteúdo do Curso
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Três pilares de aprendizado
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {MODULOS.map((m, i) => (
              <motion.div
                key={m.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={m.img} alt={m.label} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <m.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">{m.label}</h3>
                  </div>
                  <ul className="space-y-2">
                    {m.items.map((it) => (
                      <li key={it} className="flex gap-2 items-start text-sm text-foreground/75">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <a
              href="https://maurokwitko.com.br/wp-content/uploads/2022/09/PROGRAMA-DO-CURSO.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" /> Quero baixar o programa completo!
            </a>
          </motion.div>
        </div>
      </section>

      {/* Critérios */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="max-w-3xl mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              Critérios para Inscrição
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Quem pode se inscrever
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Para habilitar-se a realizar o Curso de Formação, o(a) candidato(a) deve
              enquadrar-se em pelo menos um dos critérios abaixo:
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CRITERIOS.map((c, i) => (
              <motion.div
                key={c.titulo}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg hover:border-primary/40 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-base mb-2">{c.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Turmas */}
      <section className="py-20 md:py-28 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              Tenho interesse, como me inscrever?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Entre no grupo da turma do seu estado
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Se você se enquadra em pelo menos um dos critérios e tem interesse em tornar-se
              um psicoterapeuta reencarnacionista, escolha um dos grupos abertos abaixo. São
              espaços sem compromisso, organizados por turma e estado, para tirar dúvidas e
              receber mais informações.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {TURMAS.map((t, i) => (
              <motion.a
                key={t.local}
                href={t.link}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 hover:border-emerald-500 hover:shadow-lg hover:bg-emerald-100/70 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-base text-emerald-950">Turma de {t.local}</p>
                    <p className="text-sm text-emerald-800/80">{t.data}</p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">Toque para entrar no grupo do WhatsApp</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  Entrar →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formacao;
