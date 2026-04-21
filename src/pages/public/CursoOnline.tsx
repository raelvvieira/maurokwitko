import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Star, Award } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const MODULES = [
  'Introdução: O que você vai aprender neste curso',
  'O Mapa do ego: A chave para a Reforma Íntima',
  'A Releitura da Infância sob a ótica reencarnacionista: Início de mais uma jornada terrena',
  'As crianças: espíritos recém chegando do Mundo Espiritual',
  'Os Adolescentes: jovens guerreiros e guerreiras da Luz',
  'Os Adultos: na metade da encarnação',
  'Os Casais: uma oportunidade para a Reforma Íntima de cada um',
  'Os Pais: canais para a vinda de Espíritos para a Terra',
  'A Família: um agrupamento de espíritos unidos por laços energéticos',
  'As pessoas encarnadas há mais tempo: enxergando a Linha do Horizonte',
  'As Armadilhas terrenas: testes para a nossa fidelidade ao Divino',
  'Os gatilhos terrenos: as nossas inferioridades e superioridades',
  'A Saúde e a Doença: do ponto de vista físico, emocional, mental e reencarnacionista',
  'A Sexualidade: a sexualidade consciente. O Feminino Sagrado. O Masculino Sagrado',
  'O Suicídio: a ilusão da "morte" e do "final de tudo"',
  'O aborto: a cegonha não erra a chaminé',
  'O Perdão e o autoperdão: uma oportunidade de libertação',
  'Os nossos Mentores Espirituais e os Espíritos obsessores: cuidando com os nossos pensamentos',
  'Por que a Psicologia e a Psiquiatria não lidam com a Reencarnação',
  'Quem somos nós: o Divino e suas micro manifestações',
  'Bônus',
];

const REVIEWS = [
  { date: '22/11/2024', name: 'Luciana', text: 'Material muito bom, desde os assuntos abordados até a qualidade das aulas.' },
  { date: '17/04/2024', name: 'Almir', text: 'Estou gostando de aprender com o Dr. Mauro. Ele é bem didático e esclarece bem cada tópico dos estudos sobre terapia Reencarnacionista.' },
  { date: '16/01/2024', name: 'Aline', text: 'Excelente.. sou muito fã' },
  { date: '19/03/2023', name: 'Suely', text: 'Curso transformador, recomendo a todos que buscam autoconhecimento.' },
  { date: '04/04/2021', name: 'Viviane', text: 'Tem sido maravilhoso, os vídeos me trouxeram um conteúdo de grande importância para minha vida, adoro poder rever quantas vezes eu tiver vontade. Gratidão Mauro, por ter feito esses vídeos e por nos passar tanto conhecimento.' },
];

const FAQS = [
  { q: 'Quem avaliou Curso On-Line com Dr. Mauro Kwitko - A Psicologia da Reencarnação?', a: 'Apenas alunos que efetivamente compraram e acessaram o curso podem deixar avaliações.' },
  { q: 'O que é e como funciona a Nota Média do curso?', a: 'A nota média é calculada com base nas avaliações dos alunos que concluíram o curso.' },
  { q: 'Como funciona o "Prazo de Garantia"?', a: 'Você tem 7 dias para solicitar o reembolso integral, sem necessidade de justificativa.' },
  { q: 'O que é e como funciona o Certificado de Conclusão digital?', a: 'Após concluir todos os módulos, você recebe um certificado digital de conclusão.' },
  { q: 'Quais diferenciais os produtos podem ter?', a: 'Aulas em vídeo de alta qualidade, materiais complementares e acesso vitalício ao conteúdo.' },
  { q: 'Como acesso meu produto?', a: 'Após a compra, você recebe um e-mail com as instruções de acesso à plataforma.' },
  { q: 'Tenho interesse neste curso, como posso comprar?', a: 'Acesse reformaintimaonline.com.br e siga as instruções para inscrição.' },
  { q: 'Como faço para me afiliar?', a: 'Entre em contato pela plataforma Hotmart para informações sobre o programa de afiliados.' },
  { q: 'Posso denunciar um produto que possui informações inadequadas?', a: 'Sim, utilize os canais oficiais da Hotmart para denúncias.' },
  { q: 'Tenho outras dúvidas, quem pode me respondê-las?', a: 'Entre em contato pelo e-mail contato@maurokwitko.com.br ou via WhatsApp.' },
];

const CursoOnline = () => {
  const [expandBio, setExpandBio] = useState(false);
  const COURSE_URL = 'https://reformaintimaonline.com.br';

  return (
    <div className="pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* HERO + VSL */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Curso On-Line</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            A <span className="italic font-serif text-primary">Psicologia da Reencarnação</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Encontre as respostas para suas maiores questões: como abandonar velhos hábitos, cultivar foco e disciplina, compreender o que é essencial e viver uma versão superior de si mesmo.
          </p>
          <motion.a
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md"
          >
            Quero me Inscrever <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-[360px]"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-accent/20 rounded-[2rem] blur-2xl" />
          <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/40 bg-black">
            <iframe
              src="https://www.youtube.com/embed/eT7wOH_YkC4"
              title="Curso On-Line Dr. Mauro Kwitko"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-16 space-y-5 text-base md:text-lg leading-relaxed text-foreground/85">
        <p>
          Este projeto é a realização de um sonho e iniciei sua produção já há alguns meses. O meu objetivo com ele é o de levar para o maior número de pessoas possível todo o conhecimento que adquiri, ao longo dos mais de 20 anos que atuo com a psicoterapia reencarnacionista.
        </p>
        <p>
          Aprender sobre a Psicoterapia Reencarnacionista para assim realizar uma Reforma Íntima, requer vontade de ser melhor a cada dia e de alcançar a felicidade. E, para a psicoterapia reencarnacionista, sempre é tempo de iniciar.
        </p>
        <p>
          Por isso, convido você a iniciar essa jornada linda de autoconhecimento e conscientização de si mesmo. Espero que goste e divulgue com seus amigos. Alguém pode estar precisando mergulhar dentro de si mesmo, fazer diferente e ter uma vida feliz.
        </p>
        <p className="font-semibold">Abraço do Mauro Kwitko.</p>
      </section>

      {/* MÓDULOS */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Conteúdo</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">Módulos do Curso</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="rounded-2xl p-5 bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex gap-4"
            >
              <div className="text-3xl font-serif font-bold text-primary/60 leading-none shrink-0 w-10">
                {i === 20 ? '★' : String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-sm font-semibold leading-snug">{m}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOBRE O AUTOR */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-20">
        <div className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm grid md:grid-cols-[200px_1fr] gap-8 items-start">
          <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-border/40">
            <img
              src="https://i.ibb.co/358FCytk/DR-MAURO-2.jpg"
              alt="Dr. Mauro Kwitko"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Sobre o autor</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-2">Dr. Mauro Kwitko</h3>
              <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Award className="w-3.5 h-3.5" /> 5 Anos Hotmarter
              </span>
            </div>
            <div className={`text-sm md:text-base text-foreground/80 leading-relaxed space-y-3 ${expandBio ? '' : 'line-clamp-6'}`}>
              <p>
                Sou médico formado pela Faculdade de Medicina da UFRGS em 1971 (CRM 5761), psicoterapeuta reencarnacionista, professor, escritor, músico e palestrante. Em 1996 recebi, e aceitei, uma missão do Mundo Espiritual de ser o divulgador da Psicoterapia Reencarnacionista aqui na Terra.
              </p>
              <p>
                Em 10 de agosto de 2004, com um pequeno grupo de psicoterapeutas reencarnacionistas, fundamos a Associação Brasileira de Psicoterapia Reencarnacionista (ABPR), na qual sou Presidente honorário.
              </p>
              <p>
                Já publiquei, até o momento, nove livros pela Editora BesouroBox e também tenho cinco e-books publicados e disponíveis para venda na Amazon. Resido em Porto Alegre, e continuo cumprindo a missão, escrevendo livros e artigos, dando entrevistas e realizando palestras a respeito da Psicoterapia Reencarnacionista.
              </p>
            </div>
            <button
              onClick={() => setExpandBio((v) => !v)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {expandBio ? 'Mostrar menos' : 'Mostrar mais'}
            </button>
          </div>
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">Avaliações</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-3xl font-bold">5,0</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({REVIEWS.length} avaliações)</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name + r.date}
              className="rounded-2xl p-5 bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{r.text}</p>
              <p className="mt-3 text-sm font-semibold">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Dúvidas</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">Perguntas Frequentes</h2>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm px-5">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-b-0">
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-20 text-center">
        <motion.a
          href={COURSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          Acessar o Curso On-Line <ArrowRight className="w-5 h-5" />
        </motion.a>
      </section>
    </div>
  );
};

export default CursoOnline;
