import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import heroMauro from '@/assets/clube/generated-hero-mauro.png.asset.json';
import communityMauro from '@/assets/clube/generated-community-mauro.png.asset.json';
import mentorStudio from '@/assets/clube/mentor-studio-crossed.png.asset.json';
import platformScreen from '@/assets/clube/platform-screen.png.asset.json';
import finalBg from '@/assets/clube/final-cta-background.png.asset.json';
import topicEgo from '@/assets/clube/generated-topic-ego.png.asset.json';
import topicPersonalidade from '@/assets/clube/generated-topic-personalidade.png.asset.json';
import topicReforma from '@/assets/clube/generated-topic-reforma.png.asset.json';
import topicInconsciente from '@/assets/clube/generated-topic-inconsciente.png.asset.json';
import topicRelacoes from '@/assets/clube/generated-topic-relacoes.png.asset.json';
import topicProjecoes from '@/assets/clube/generated-topic-projecoes.png.asset.json';
import topicAnsiedade from '@/assets/clube/generated-topic-ansiedade.png.asset.json';
import topicMorte from '@/assets/clube/generated-topic-morte.png.asset.json';
import bookReforma from '@/assets/clube/book-reforma-intima.png.asset.json';
import bookEgo from '@/assets/clube/book-ego-aliado.png.asset.json';
import bookNossoLar from '@/assets/clube/book-nosso-lar.png.asset.json';
import bookMecanismos from '@/assets/clube/book-mecanismos.png.asset.json';
import bookObsessao from '@/assets/clube/book-obsessao.png.asset.json';
import bookDialogos from '@/assets/clube/book-dialogos.png.asset.json';
import { useEbooks } from '@/hooks/useSupabaseData';

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141';

const TOPICS = [
  { img: topicEgo.url, title: 'O Mapa do Ego' },
  { img: topicPersonalidade.url, title: 'Personalidade Congênita' },
  { img: topicReforma.url, title: 'Reforma Íntima' },
  { img: topicInconsciente.url, title: 'Investigação do Inconsciente' },
  { img: topicRelacoes.url, title: 'Relações Kármicas' },
  { img: topicProjecoes.url, title: 'Projeções Reencarnatórias' },
  { img: topicAnsiedade.url, title: 'Ansiedade e Sofrimento' },
  { img: topicMorte.url, title: 'A Morte Não Existe' },
];

const FALLBACK_BOOKS = [
  { img: bookReforma.url, alt: 'Livro A Reforma Íntima' },
  { img: bookEgo.url, alt: 'Livro Ego: Inimigo ou Aliado?' },
  { img: bookNossoLar.url, alt: 'Livro Nosso Lar' },
  { img: bookMecanismos.url, alt: 'Livro Mecanismos da Mediunidade' },
  { img: bookObsessao.url, alt: 'Livro Obsessão e Desobsessão' },
  { img: bookDialogos.url, alt: 'Livro Diálogos da Alma' },
];

const styles = `
.clube-page {
  --paper: #f7fbff;
  --mist: #eaf4ff;
  --ink: #102448;
  --muted: #5d6f8e;
  --line: rgba(29, 71, 133, .13);
  --blue: #1469d9;
  --blue-deep: #0f4fb0;
  --gold: #caa46a;
  --white: rgba(255, 255, 255, .74);
  --shadow: 0 24px 70px rgba(22, 66, 120, .12);
  --radius: 20px;
  font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at 10% 0%, rgba(212, 231, 255, .95), transparent 34rem),
    radial-gradient(circle at 88% 16%, rgba(255, 255, 255, .9), transparent 24rem),
    linear-gradient(180deg, #fbfdff 0%, var(--paper) 46%, #eef7ff 100%);
  min-height: 100vh;
  font-size: 16px;
  line-height: 1.5;
}
.clube-page * { box-sizing: border-box; font-weight: 400; }
.clube-page strong { font-weight: 500; }
.clube-page a { color: inherit; text-decoration: none; }
.clube-page img { max-width: 100%; display: block; }
.clube-page h1, .clube-page h2, .clube-page h3 { font-weight: 400; margin: 0; }

.clube-page .page { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }

.clube-page .button {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 48px; padding: 0 24px; border: 0; border-radius: 10px;
  background: linear-gradient(135deg, #25D366 0%, #1ebe57 55%, #128C7E 100%);
  color: #fff; font-weight: 600;
  box-shadow: 0 18px 34px rgba(18, 140, 126, .32);
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
  cursor: pointer;
}
.clube-page .button:hover {
  transform: translateY(-2px); filter: brightness(1.05);
  box-shadow: 0 22px 44px rgba(18, 140, 126, .42);
}

.clube-page .hero {
  min-height: 560px; display: grid; grid-template-columns: .98fr .9fr;
  align-items: center; gap: 42px; padding: 58px 0 38px; position: relative;
}
.clube-page .eyebrow {
  display: inline-flex; align-items: center; gap: 8px; width: fit-content;
  padding: 7px 11px; border-radius: 999px;
  border: 1px solid rgba(202, 164, 106, .32); background: rgba(255, 255, 255, .6);
  color: #7a653e; font-size: .77rem; font-weight: 500;
  text-transform: uppercase; letter-spacing: .12em; backdrop-filter: blur(14px);
  margin-bottom: 18px;
}
.clube-page .hero h1 {
  margin: 20px 0 18px; max-width: 680px;
  font-size: clamp(1.75rem, 3vw, 2.1rem); line-height: 1.28;
}
.clube-page .hero h1 span {
  color: transparent;
  background: linear-gradient(135deg, #142b54, #1d6ee3 58%, #ba8a47);
  -webkit-background-clip: text; background-clip: text;
}
.clube-page .lead {
  max-width: 610px; color: var(--muted);
  font-size: clamp(.95rem, 1vw, 1.05rem); line-height: 1.68; margin: 0 0 28px;
}
.clube-page .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }

.clube-page .portrait-card {
  position: relative; overflow: hidden; border-radius: 34px;
  border: 1px solid rgba(255, 255, 255, .78);
  background: linear-gradient(180deg, rgba(255, 255, 255, .42), rgba(255, 255, 255, .9));
  box-shadow: 0 30px 80px rgba(33, 72, 122, .18);
  min-height: 410px;
}
.clube-page .portrait-card img { width: 100%; height: 100%; min-height: inherit; object-fit: cover; }

.clube-page .section { padding: 72px 0; }
.clube-page .section-head { display: block; margin-bottom: 28px; text-align: center; }
.clube-page .section-head p { margin: 12px auto 0; max-width: 760px; color: var(--muted); line-height: 1.7; }
.clube-page h2 { font-size: clamp(1.4rem, 2.2vw, 2rem); line-height: 1.22; }
.clube-page h2 + p, .clube-page h2 + .plain-copy { margin-top: 16px; }
.clube-page .plain-copy { color: var(--muted); line-height: 1.7; margin: 0; }

.clube-page .topics-carousel {
  position: relative; display: grid; gap: 16px; overflow: hidden; padding: 8px 0 18px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.clube-page .topic-lane { overflow: hidden; }
.clube-page .topic-track {
  display: flex; width: max-content; gap: 16px;
  animation: clubeMarquee 46s linear infinite; will-change: transform;
}
.clube-page .topic {
  width: clamp(155px, 17vw, 220px); aspect-ratio: 3/4; overflow: hidden;
  border-radius: var(--radius); position: relative; flex: 0 0 auto;
  transition: transform .2s ease; isolation: isolate;
  border: 1px solid var(--line); background: var(--white);
}
.clube-page .topic:hover { transform: translateY(-4px); }
.clube-page .topic img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.03); }
.clube-page .topic::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(7,24,52,0) 48%, rgba(7,24,52,.68) 100%); z-index: 1;
}
.clube-page .topic h3 {
  position: absolute; left: 14px; right: 14px; bottom: 14px; z-index: 2;
  color: #fff; font-size: 1rem; line-height: 1.18;
  text-shadow: 0 2px 14px rgba(0,0,0,.32);
}

.clube-page .book-carousel {
  position: relative; overflow: hidden; margin-top: 28px; padding: 4px 0 18px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}
.clube-page .book-track {
  display: flex; width: max-content; gap: 18px;
  animation: clubeMarquee 46s linear infinite; will-change: transform;
}
.clube-page .book-card {
  width: clamp(118px, 13vw, 168px); aspect-ratio: 2/3; flex: 0 0 auto;
  overflow: hidden; border-radius: 12px; background: rgba(255,255,255,.72);
  border: 1px solid rgba(255,255,255,.72);
  box-shadow: 0 20px 42px rgba(16,36,72,.16);
}
.clube-page .book-card img { width: 100%; height: 100%; object-fit: cover; }

.clube-page .library-section h2 { text-align: center; margin-bottom: 14px; }
.clube-page .library-subtitle { max-width: 760px; margin: 0 auto 28px; text-align: center; color: var(--muted); line-height: 1.7; }

.clube-page .panel {
  border-radius: var(--radius); padding: clamp(22px, 3vw, 34px);
  border: 1px solid var(--line); background: rgba(255,255,255,.68);
  backdrop-filter: blur(22px); box-shadow: var(--shadow);
}

.clube-page .feature-grid {
  display: grid; grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 14px; margin-top: 26px;
}
.clube-page .feature {
  border: 1px solid var(--line); border-radius: 14px; padding: 16px;
  background: rgba(255,255,255,.5); color: #23436f;
  display: flex; align-items: center; gap: 10px;
}
.clube-page .feature-icon {
  width: 32px; height: 32px; flex: 0 0 auto; display: grid; place-items: center;
  border-radius: 10px; color: var(--blue);
  background: rgba(20,105,217,.08); border: 1px solid rgba(20,105,217,.12);
  font-size: 1.1rem;
}
.clube-page .feature.discount-feature {
  grid-column: 1 / -1; justify-content: center;
  border-color: rgba(202,164,106,.48);
  background: linear-gradient(135deg, rgba(255,255,255,.76), rgba(255,248,234,.82));
  color: #765a2c; box-shadow: 0 18px 46px rgba(202,164,106,.12);
}
.clube-page .feature.discount-feature .feature-icon {
  color: #8a672d; background: rgba(202,164,106,.14); border-color: rgba(202,164,106,.22);
}

.clube-page .platform-card {
  display: grid; grid-template-columns: minmax(260px,.78fr) minmax(360px,1.22fr);
  gap: clamp(26px, 5vw, 56px); align-items: center; overflow: hidden;
  background:
    radial-gradient(circle at 76% 18%, rgba(202,164,106,.22), transparent 18rem),
    linear-gradient(135deg, rgba(255,255,255,.78), rgba(235,246,255,.64));
}
.clube-page .platform-screen-wrap { display: grid; place-items: center; }
.clube-page .platform-screen-wrap img {
  width: 100%; max-width: 720px; height: auto;
  border-radius: 18px; box-shadow: var(--shadow);
  border: 1px solid var(--line);
}

.clube-page .community {
  display: grid; grid-template-columns: 1fr .9fr; gap: clamp(32px, 6vw, 72px);
  align-items: center;
}
.clube-page .community > img {
  width: 100%; min-height: 360px; object-fit: cover;
  border-radius: 22px; box-shadow: var(--shadow);
}
.clube-page .community .feature-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }

.clube-page .mentor-wrap { max-width: 880px; margin-inline: auto; }
.clube-page .mentor-card {
  display: grid; grid-template-columns: minmax(180px, 240px) 1fr;
  gap: clamp(22px, 4vw, 36px); align-items: center;
  padding: clamp(22px, 3vw, 30px);
}
.clube-page .mentor-card img {
  border-radius: 18px; width: 100%; height: 280px; object-fit: cover; background: #edf5fe;
}
.clube-page .mentor-note { margin-top: 12px; }
.clube-page .stat-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-top: 20px; }
.clube-page .stat {
  border: 1px solid var(--line); border-radius: 14px; padding: 14px 10px;
  text-align: center; background: rgba(255,255,255,.5);
}
.clube-page .stat strong { display: block; color: var(--blue-deep); font-size: 1.05rem; }
.clube-page .stat small { color: var(--muted); font-size: .8rem; }

.clube-page .price-band {
  display: grid; grid-template-columns: minmax(280px,560px); justify-content: center;
  gap: 26px; align-items: center; padding: 18px 0 58px; text-align: center;
}
.clube-page .price-anchor {
  border-radius: 24px; padding: clamp(28px, 5vw, 54px);
  border: 1px solid rgba(20,105,217,.16);
  background:
    linear-gradient(135deg, rgba(255,255,255,.84), rgba(230,243,255,.72)),
    radial-gradient(circle at 90% 10%, rgba(202,164,106,.18), transparent 18rem);
  box-shadow: var(--shadow);
  display: grid; align-content: center; justify-items: center;
}
.clube-page .price-anchor h2 { max-width: 720px; margin-bottom: 16px; }
.clube-page .anchor-list { display: grid; gap: 11px; margin-top: 24px; max-width: 520px; width: 100%; }
.clube-page .anchor-line {
  display: flex; justify-content: space-between; gap: 18px; padding-bottom: 10px;
  border-bottom: 1px solid rgba(29,71,133,.12); color: #29456f;
}
.clube-page .anchor-line strong { color: var(--ink); white-space: nowrap; }
.clube-page .anchor-line s { text-decoration-thickness: 1px; text-decoration-color: rgba(16,36,72,.62); }

.clube-page .outside-value-note {
  width: min(100%, 820px); margin: 4px auto; padding: 16px 22px; text-align: center;
  border-radius: 999px; border: 1px solid rgba(202,164,106,.28);
  color: #5b6681;
  background:
    linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,248,232,.54)),
    radial-gradient(circle at 50% 0%, rgba(202,164,106,.22), transparent 18rem);
  box-shadow: 0 20px 60px rgba(16,53,105,.08);
}

.clube-page .pricing-card {
  position: relative; overflow: hidden; border-radius: 28px;
  padding: clamp(24px, 4vw, 34px);
  border: 1px solid rgba(202,164,106,.34);
  background:
    linear-gradient(145deg, rgba(255,255,255,.92), rgba(246,251,255,.84) 52%, rgba(255,247,229,.74)),
    radial-gradient(circle at 82% 0%, rgba(223,185,111,.42), transparent 18rem),
    radial-gradient(circle at 0% 100%, rgba(20,105,217,.12), transparent 17rem);
  backdrop-filter: blur(22px);
  box-shadow: 0 30px 90px rgba(16,53,105,.16), 0 18px 54px rgba(202,164,106,.16);
}
.clube-page .pricing-card::before {
  content: ""; position: absolute; inset: 10px; border-radius: 22px;
  border: 1px solid rgba(202,164,106,.24); pointer-events: none;
}
.clube-page .pricing-card > * { position: relative; z-index: 1; }
.clube-page .pricing-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 18px; }
.clube-page .plan-label { color: #745b32; font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; }
.clube-page .popular-pill {
  padding: 8px 14px; border-radius: 999px;
  background: linear-gradient(135deg, rgba(245,232,205,.98), rgba(225,193,128,.45));
  color: #745b32; font-size: .82rem; font-weight: 500; white-space: nowrap;
}
.clube-page .price {
  font-size: clamp(3.25rem, 6vw, 4.5rem); line-height: .88;
  color: transparent;
  background: linear-gradient(105deg, var(--blue-deep) 12%, var(--blue) 48%, #caa46a 92%);
  -webkit-background-clip: text; background-clip: text;
  font-weight: 500;
}
.clube-page .price sup { font-size: 1.25rem; font-weight: 400; color: var(--ink); }
.clube-page .price small { font-size: 1rem; color: var(--muted); }
.clube-page .price-note { margin: 12px 0 22px; color: var(--muted); line-height: 1.6; }
.clube-page .pricing-divider {
  height: 1px; margin: 20px 0;
  background: linear-gradient(90deg, transparent, rgba(202,164,106,.5), rgba(29,71,133,.18), transparent);
}
.clube-page .included { display: grid; gap: 13px; margin-bottom: 26px; }
.clube-page .benefit { display: flex; gap: 10px; align-items: flex-start; color: #29456f; line-height: 1.45; font-size: .95rem; }
.clube-page .check {
  width: 22px; height: 22px; flex: 0 0 auto; border-radius: 50%;
  background: rgba(20,105,217,.1); color: var(--blue);
  display: grid; place-items: center; font-size: .85rem;
}
.clube-page .pricing-card .button {
  width: 100%; min-height: 58px; border-radius: 14px;
  background: linear-gradient(115deg, var(--blue) 0%, #1455b2 56%, #caa46a 140%);
  box-shadow: 0 22px 44px rgba(20,105,217,.24), 0 14px 38px rgba(202,164,106,.18);
}

.clube-page .audience-section { max-width: 880px; margin-inline: auto; }
.clube-page .audience-list { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin-top: 22px; }

.clube-page .faq-section { max-width: 880px; margin-inline: auto; }
.clube-page details {
  border: 1px solid var(--line); border-radius: 14px;
  background: rgba(255,255,255,.58); padding: 17px 18px;
}
.clube-page details + details { margin-top: 10px; }
.clube-page summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
.clube-page summary::-webkit-details-marker { display: none; }
.clube-page summary::after { content: "+"; color: var(--blue); font-size: 1.15rem; }
.clube-page details[open] summary::after { content: "-"; }
.clube-page details p { margin: 14px 0 0; color: var(--muted); line-height: 1.65; }

.clube-page .final {
  max-width: 1040px; min-height: 330px; margin: 52px auto 34px;
  overflow: hidden; display: grid; grid-template-columns: minmax(280px,560px) 1fr;
  gap: 24px; align-items: center; padding: clamp(30px, 5vw, 58px);
  border-radius: 28px;
  background:
    linear-gradient(90deg, rgba(242,249,255,.96) 0%, rgba(255,255,255,.82) 48%, rgba(255,255,255,.16) 100%),
    url(${JSON.stringify(finalBg.url)}) center / cover no-repeat;
  border: 1px solid var(--line); box-shadow: var(--shadow);
}
.clube-page .final > div { max-width: 560px; justify-self: center; }
.clube-page .final blockquote { margin: 0 0 24px; font-size: clamp(1.3rem, 2vw, 1.9rem); line-height: 1.16; }

@keyframes clubeMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-50% - 8px)); }
}

@media (prefers-reduced-motion: reduce) {
  .clube-page *, .clube-page *::before, .clube-page *::after {
    animation: none !important; transition: none !important;
  }
}

@media (max-width: 960px) {
  .clube-page .hero, .clube-page .platform-card, .clube-page .community,
  .clube-page .price-band, .clube-page .final {
    grid-template-columns: 1fr;
  }
  .clube-page .hero { min-height: auto; padding-top: 56px; }
  .clube-page .portrait-card { min-height: 360px; }
  .clube-page .feature-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
}

@media (max-width: 640px) {
  .clube-page .page { width: min(100% - 24px, 1180px); }
  .clube-page .hero { padding-top: 42px; gap: 26px; }
  .clube-page .feature-grid, .clube-page .stat-row, .clube-page .audience-list { grid-template-columns: 1fr; }
  .clube-page .topic { width: min(48vw, 180px); }
  .clube-page .section { padding: 40px 0; }
  .clube-page .mentor-card { grid-template-columns: 1fr; }
  .clube-page .mentor-card img { width: 100%; height: 280px; object-position: top; }
  .clube-page .button { width: 100%; padding-inline: 18px; }
}

/* Header toggle (apenas nesta página) */
body.clube-hide-header header {
  transform: translateY(-110%);
  transition: transform .35s cubic-bezier(.4,.0,.2,1);
}
body.clube-hide-header.clube-show-header header {
  transform: translateY(0);
}
.clube-header-toggle {
  position: fixed; top: 8px; left: 50%; transform: translateX(-50%);
  z-index: 70; width: 44px; height: 28px; border-radius: 999px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid rgba(29,71,133,.18);
  background: rgba(255,255,255,.78);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 28px rgba(22,66,120,.14);
  color: #29456f; cursor: pointer;
  transition: background .2s ease, transform .2s ease;
}
.clube-header-toggle:hover { background: rgba(255,255,255,.95); }
.clube-header-toggle svg { transition: transform .3s ease; }
body.clube-show-header .clube-header-toggle svg { transform: rotate(180deg); }
`;

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ClubeDeEstudos = () => {
  const { ebooks } = useEbooks();
  const [headerOpen, setHeaderOpen] = useState(false);

  const realBooks = (ebooks ?? [])
    .filter((e: any) => e?.cover_url)
    .map((e: any) => ({ img: e.cover_url as string, alt: e.title as string }));
  const BOOKS = realBooks.length >= 3 ? realBooks : FALLBACK_BOOKS;

  const topicsLoop = [...TOPICS, ...TOPICS];
  const booksLoop = [...BOOKS, ...BOOKS];

  // Hide global header on this page; show only via toggle
  useEffect(() => {
    document.body.classList.add('clube-hide-header');
    return () => {
      document.body.classList.remove('clube-hide-header');
      document.body.classList.remove('clube-show-header');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('clube-show-header', headerOpen);
  }, [headerOpen]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <button
        type="button"
        aria-label={headerOpen ? 'Ocultar menu' : 'Mostrar menu'}
        aria-expanded={headerOpen}
        onClick={() => setHeaderOpen((v) => !v)}
        className="clube-header-toggle"
      >
        <ChevronDown size={18} />
      </button>

      <div className="clube-page">
        <main id="top" className="page">
          {/* Hero */}
          <section className="hero">
            <div>
              <h1>
                30 anos de estudos sobre{' '}
                <span>Reencarnação, Reforma Íntima e Psicoterapia Reencarnacionista</span>{' '}
                reunidos em um único lugar.
              </h1>
              <p className="lead">
                Para você estudar, compreender seus desafios atuais e aprender a viver melhor esta sua encarnação.
              </p>
              <div className="hero-actions">
                <a className="button" href="#assinatura">Quero fazer parte do clube →</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-card">
                <img src={heroMauro.url} alt="Dr. Mauro Kiwitko em estúdio claro" />
              </div>
            </div>
          </section>

          {/* Topics */}
          <section id="conteudos" className="section">
            <div className="section-head">
              <h2>Aqui você vai aprender sobre</h2>
              <p>Conhecimentos desenvolvidos ao longo de décadas de estudo.</p>
            </div>
            <div className="topics-carousel" aria-label="Temas de estudo em carrossel">
              <div className="topic-lane">
                <div className="topic-track">
                  {topicsLoop.map((t, i) => (
                    <article className="topic" key={i}>
                      <img src={t.img} alt={i < TOPICS.length ? t.title : ''} aria-hidden={i >= TOPICS.length || undefined} />
                      <h3>{t.title}</h3>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Library */}
          <section id="biblioteca" className="section library-section">
            <h2>Além disso, você terá acesso a um acervo completo de estudos</h2>
            <p className="library-subtitle">
              Todos meus Livros Digitais disponíveis para leitura e Vídeo Aulas em Alta Resolução
            </p>
            <div className="book-carousel" aria-label="Livros disponíveis no acervo">
              <div className="book-track">
                {booksLoop.map((b, i) => (
                  <article className="book-card" key={i}>
                    <img src={b.img} alt={i < BOOKS.length ? b.alt : ''} aria-hidden={i >= BOOKS.length || undefined} />
                  </article>
                ))}
              </div>
            </div>
            <div className="feature-grid">
              <div className="feature">
                <span className="feature-icon"><Icon d="M4 19.5V5.7A2.7 2.7 0 0 1 6.7 3H20v16H6.7A2.7 2.7 0 0 0 4 21.7M8 7h8M8 11h6" /></span>
                Todos meus Livros Digitais
              </div>
              <div className="feature">
                <span className="feature-icon"><Icon d="M5 5h14v10H5zM8 19h8M12 15v4M9 9l3 2 3-2" /></span>
                LIVES Gravadas
              </div>
              <div className="feature">
                <span className="feature-icon"><Icon d="M4 6h16M4 12h16M4 18h10M7 3v18" /></span>
                Materiais de Estudo
              </div>
              <div className="feature discount-feature">
                <span className="feature-icon"><Icon d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7M2 7h20v5H2zM12 22V7" /></span>
                20% de desconto em todos meus Livros Físicos
              </div>
            </div>
          </section>

          {/* Platform */}
          <section className="section platform-card panel">
            <div>
              <p className="eyebrow">Plataforma do clube</p>
              <h2>Uma plataforma para fácil acesso aos conteúdos</h2>
              <p className="plain-copy" style={{ maxWidth: 540 }}>
                Tudo organizado em um ambiente simples para você estudar no seu ritmo, voltar aos conteúdos e acompanhar tudo com clareza.
              </p>
            </div>
            <div className="platform-screen-wrap" aria-label="Tela da plataforma do clube">
              <img src={platformScreen.url} alt="Tela da plataforma do Clube de Estudos" />
            </div>
          </section>

          {/* Community */}
          <section id="comunidade" className="section community">
            <img src={communityMauro.url} alt="Dr. Mauro Kiwitko conversando com uma roda de estudos" />
            <div>
              <h2>Comunidade para quem busca evoluir através do conhecimento</h2>
              <p className="plain-copy">Grupo exclusivo onde todos compartilham dos mesmos objetivos.</p>
              <div className="feature-grid">
                <div className="feature"><span className="feature-icon"><Icon d="M7 11a4 4 0 1 1 8 0M3 21a8 8 0 0 1 16 0" /></span>Troca de experiências</div>
                <div className="feature"><span className="feature-icon"><Icon d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 8l10 8M17 8l-10 8" /></span>Networking</div>
                <div className="feature"><span className="feature-icon"><Icon d="M4 19V5l8-3 8 3v14l-8 3z" /></span>Aprendizados Novos</div>
                <div className="feature"><span className="feature-icon"><Icon d="M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3zM9 22h6M10 19h4" /></span>Reflexões Compartilhadas</div>
              </div>
            </div>
          </section>

          {/* Mentor */}
          <section className="section">
            <div className="mentor-wrap">
              <article className="mentor-card panel">
                <img src={mentorStudio.url} alt="Retrato do Dr. Mauro Kiwitko" />
                <div>
                  <h2>Olá, sou Dr. Mauro</h2>
                  <p className="plain-copy">
                    Há cerca de 30 anos me dedico a orientar pessoas, no consultório, nas palestras e nos cursos, a recordarem que somos Espíritos encarnados, com finalidades próprias nesta jornada.
                  </p>
                  <p className="plain-copy mentor-note">
                    Fundador e patrono da Associação Brasileira de Psicoterapia Reencarnacionista (ABPR), com mais de 10.000 Investigações do Inconsciente realizadas, mais de 70 turmas formadas e 25 livros publicados entre físicos e e-books.
                  </p>
                  <div className="stat-row">
                    <div className="stat"><strong>10k+</strong><small>atendimentos</small></div>
                    <div className="stat"><strong>25</strong><small>livros</small></div>
                    <div className="stat"><strong>70+</strong><small>turmas</small></div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Pricing */}
          <section id="assinatura" className="section price-band">
            <div className="price-anchor">
              <p className="eyebrow">Resumo</p>
              <h2>Todo o clube por menos do que um livro por mês.</h2>
              <p className="plain-copy">
                Ao invés de comprar cursos, livros e encontros separadamente, você entra em um ambiente contínuo de estudo por uma assinatura simples.
              </p>
              <div className="anchor-list" aria-label="Comparação de valor">
                <div className="anchor-line"><span>Curso Reforma Íntima</span><strong><s>R$ 249</s></strong></div>
                <div className="anchor-line"><span>Biblioteca Digital Completa</span><strong><s>R$ 497</s></strong></div>
                <div className="anchor-line"><span>Lives e Conteúdos Extras</span><strong><s>R$ 197</s></strong></div>
                <div className="anchor-line"><span>Valor total separado</span><strong><s>R$ 943</s></strong></div>
              </div>
            </div>

            <p className="plain-copy outside-value-note">
              No clube, você acessa tudo por uma assinatura mensal simples.
            </p>

            <article className="pricing-card" aria-label="Plano do Clube de Estudos">
              <div className="pricing-top">
                <span className="plan-label">Assinatura</span>
                <span className="popular-pill">Mais escolhido</span>
              </div>
              <div className="price"><sup>R$</sup>29<small>/mês</small></div>
              <p className="price-note">Acesso imediato. Sem fidelidade. Cancele quando quiser.</p>
              <div className="pricing-divider" />
              <div className="included">
                <div className="benefit"><span className="check">✓</span>Curso Reforma Íntima</div>
                <div className="benefit"><span className="check">✓</span>Todos meus Livros Digitais</div>
                <div className="benefit"><span className="check">✓</span>LIVES Gravadas</div>
                <div className="benefit"><span className="check">✓</span>Materiais de Estudo</div>
                <div className="benefit"><span className="check">✓</span>20% de desconto em Livros Físicos</div>
                <div className="benefit"><span className="check">✓</span>Acesso imediato</div>
              </div>
              <a className="button" href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                Quero entrar agora →
              </a>
            </article>
          </section>

          {/* Audience */}
          <section className="section audience-section">
            <p className="eyebrow">Para quem é</p>
            <h2>Um clube para quem quer estudar com seriedade.</h2>
            <div className="audience-list">
              <div className="benefit"><span className="check">✓</span>Busca compreender melhor a própria vida</div>
              <div className="benefit"><span className="check">✓</span>Deseja aprofundar reencarnação</div>
              <div className="benefit"><span className="check">✓</span>Quer aplicar reforma íntima no dia a dia</div>
              <div className="benefit"><span className="check">✓</span>Gosta de estudar em comunidade</div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="final">
            <div>
              <blockquote>
                Comece hoje uma jornada de estudo com profundidade, acolhimento e direção.
              </blockquote>
              <a className="button" href="#assinatura">Fazer parte do clube →</a>
            </div>
          </section>

          {/* FAQ */}
          <section className="section faq-section panel">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2>Dúvidas comuns</h2>
            <details>
              <summary>Preciso ter conhecimento prévio?</summary>
              <p>Não. Os conteúdos foram organizados para acolher iniciantes e também quem já estuda o tema.</p>
            </details>
            <details>
              <summary>O acesso é imediato?</summary>
              <p>Sim. Após a entrada no clube, você recebe acesso aos conteúdos e pode começar pelo tema que fizer mais sentido.</p>
            </details>
            <details>
              <summary>Posso cancelar quando quiser?</summary>
              <p>Sim. A assinatura é mensal e sem fidelidade.</p>
            </details>
          </section>
        </main>
      </div>
    </>
  );
};

export default ClubeDeEstudos;
