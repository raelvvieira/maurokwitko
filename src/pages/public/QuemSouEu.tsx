import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake, Sprout, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const VALORES_ICONS = [Sparkles, HeartHandshake, Sprout, Users];

const VALORES_KEYS = [
  { titleKey: 'Fusão de saberes', textKey: 'Trabalhar pela fusão entre a Psicologia, a Psiquiatria e a Reencarnação.' },
  { titleKey: 'Aproveitar a encarnação', textKey: 'Ajudar as pessoas a aproveitarem ao máximo a sua encarnação.' },
  { titleKey: 'Semear o bem', textKey: 'Ser mais um a semear o bem no mundo, todos os dias.' },
  { titleKey: 'Somos irmãos', textKey: 'Relembrar a todos que somos irmãos, parte de um mesmo Todo.' },
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
              {t('quemSouEu.eyebrow')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              {t('quemSouEu.titleStart')}<span className="text-primary">{t('quemSouEu.titleAccent')}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('quemSouEu.desc')}
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
      <section className="py-16 md:py-24 px-5 md:px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              {t('quemSouEu.beginEyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              {t('quemSouEu.beginTitle')}
            </h2>
            <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>{t('quemSouEu.beginP1')}</p>
              <p>{t('quemSouEu.beginP2')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meus Valores */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              {t('quemSouEu.valuesEyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t('quemSouEu.valuesTitle')}
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALORES_KEYS.map((v, i) => {
              const Icon = VALORES_ICONS[i];
              return (
                <motion.div
                  key={v.titleKey}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{v.titleKey}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.textKey}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABPR */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-muted">
            <img
              src="https://i.ibb.co/ksCJ5Jbw/ENCONTRO-NACIONAL-DA-ABPR.jpg"
              alt="ABPR"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              {t('quemSouEu.abprEyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t('quemSouEu.abprTitle')}
            </h2>
            <div className="space-y-4 text-base text-foreground/80 leading-relaxed">
              <p>{t('quemSouEu.abprP1')}</p>
              <p>{t('quemSouEu.abprP2')}</p>
              <p>{t('quemSouEu.abprP3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Psicoterapia Reencarnacionista */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              {t('quemSouEu.prEyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t('quemSouEu.prTitle')}
            </h2>
            <div className="space-y-4 text-base text-foreground/80 leading-relaxed">
              <p>{t('quemSouEu.prP1')}</p>
              <p>{t('quemSouEu.prP2')}</p>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-xl aspect-[4/5] bg-muted">
            <img
              src="https://i.ibb.co/358FCytk/DR-MAURO-2.jpg"
              alt="Dr. Mauro Kwitko"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Carreira */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
              {t('quemSouEu.careerEyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              {t('quemSouEu.careerTitle')}
            </h2>
            <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>{t('quemSouEu.careerP1')}</p>
              <p>{t('quemSouEu.careerP2')}</p>
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
      <section className="py-20 md:py-28 px-5 md:px-6">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t('quemSouEu.ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('quemSouEu.ctaDesc')}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            {t('quemSouEu.ctaButton')} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default QuemSouEu;
