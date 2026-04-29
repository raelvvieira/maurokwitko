import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, Sparkles, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getArrayTranslation } from '@/i18n';

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
  const { t } = useTranslation();
  const COURSE_URL = 'https://chk.eduzz.com/801EN21NW7';
  const includes = getArrayTranslation<string>(t('cursoOnline.priceIncludes', { returnObjects: true }));

  return (
    <div className="pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-5 md:px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('cursoOnline.eyebrow')}</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {t('cursoOnline.titleStart')}<span className="italic font-serif text-primary">{t('cursoOnline.titleAccent')}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t('cursoOnline.desc')}
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
              {t('cursoOnline.subscribe')} <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* VSL — abaixo da hero, centralizado */}
      <section className="max-w-[360px] mx-auto px-5 md:px-6 mt-12">
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
      <section className="max-w-3xl mx-auto px-5 md:px-6 mt-16 space-y-5 text-center text-base md:text-lg leading-relaxed text-foreground/85">
        <p>
          Este projeto é a realização de um sonho e iniciei sua produção já há alguns meses. O meu objetivo com ele é o de levar para o maior número de pessoas possível todo o conhecimento que adquiri, ao longo dos cerca de 30 anos que atuo com a Psicoterapia Reencarnacionista.
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
      <section className="max-w-6xl mx-auto px-5 md:px-6 mt-16">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('cursoOnline.modulesEyebrow')}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">{t('cursoOnline.modulesTitle')}</h2>
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

      {/* AULAS GRATUITAS */}
      <section className="max-w-6xl mx-auto px-5 md:px-6 mt-24">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('cursoOnline.freeEyebrow')}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">{t('cursoOnline.freeTitle')}</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            {t('cursoOnline.freeDesc')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Introdução', subtitle: 'O que você vai aprender neste curso', id: 'd5bS3cEPna0' },
            { title: 'O Mapa do Ego', subtitle: 'A chave para a Reforma Íntima', id: 'yZmad3txI74' },
          ].map((aula) => (
            <div key={aula.id} className="rounded-3xl overflow-hidden bg-background ring-1 ring-border/40 shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${aula.id}`}
                  title={aula.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">{t('cursoOnline.freeBadge')}</p>
                  <h3 className="text-lg font-bold leading-tight mt-0.5">{aula.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{aula.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARD DE PREÇO */}
      <section className="max-w-xl mx-auto px-5 md:px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-8 md:p-10 bg-background ring-2 ring-primary shadow-2xl text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" /> {t('cursoOnline.priceBadge')}
          </div>
          <h3 className="text-xl font-bold">{t('cursoOnline.priceTitle')}</h3>
          <div className="mt-5 flex items-end justify-center gap-1">
            <span className="text-2xl font-bold text-muted-foreground">R$</span>
            <span className="text-6xl font-bold tracking-tight">297</span>
            <span className="text-base text-muted-foreground mb-2">,00</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {t('cursoOnline.priceInstall', { value: '12x R$ 30,72' })} <span className="text-xs">*</span>
          </p>
          <ul className="mt-7 space-y-3 text-left">
            {includes.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
          <motion.a
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-8 block w-full px-6 py-4 rounded-full bg-emerald-600 text-white text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
          >
            {t('cursoOnline.subscribe')}
          </motion.a>
          <p className="text-[11px] text-muted-foreground mt-3">{t('cursoOnline.priceNote')}</p>
        </motion.div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="max-w-5xl mx-auto px-5 md:px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">{t('cursoOnline.reviewsEyebrow')}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">{t('cursoOnline.reviewsTitle')}</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-3xl font-bold">5,0</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{t('cursoOnline.reviewsCount', { count: REVIEWS.length })}</span>
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
      <section className="max-w-3xl mx-auto px-5 md:px-6 mt-12 text-center">
        <motion.a
          href={COURSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          {t('cursoOnline.accessCourse')} <ArrowRight className="w-5 h-5" />
        </motion.a>
      </section>
    </div>
  );
};

export default CursoOnline;
