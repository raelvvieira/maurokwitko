import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

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

const CursoOnline = () => {
  const COURSE_URL = 'https://reformaintimaonline.com.br';

  return (
    <div className="pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 text-center space-y-6">
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
          <div className="flex justify-center">
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
          </div>
        </motion.div>
      </section>

      {/* VSL — abaixo da hero, centralizado */}
      <section className="max-w-[360px] mx-auto px-4 md:px-6 mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
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
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-16 space-y-5 text-center text-base md:text-lg leading-relaxed text-foreground/85">
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
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-16">
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
              className="rounded-2xl p-5 bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">· {r.date}</span>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{r.text}</p>
              <p className="mt-3 text-sm font-semibold">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-12 text-center">
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
