// Central mapping of article slugs to neutral, health/everyday-themed cover images
// Sourced from Unsplash (free to use). Medium size (~800px wide).

export const ARTICLE_IMAGES: Record<string, string> = {
  'transtorno-do-espectro-autista':
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'beneficios-contraindicacoes-da-regressao':
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  'investigacao-do-inconsciente-em-criancas':
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
  'mensagem-aos-espiritas':
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80',
  'o-livro-dos-espiritos':
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
  'a-etica-da-investigacao-do-inconsciente':
    'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&q=80',
  'mensagem-aos-psicologos-e-psiquiatras':
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
  'o-tratamento':
    'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80',
  'por-que-a-psicologia-e-a-psiquiatria-nao-lidam-com-a-reencarnacao':
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
  'psicoterapia-para-quem-ouve-vozes':
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
  'a-verdadeira-e-a-falsa-rebeldia-jovem':
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80',
  'freud-alem-da-vida':
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
  'visao-espiritual-fobias-panico-depressao-dores-cronicas':
    'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&q=80',
  'depressao':
    'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&q=80',
  'fibromialgia':
    'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80',
  'transtorno-do-panico':
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
  'jovens-guerreiros-da-luz-e-a-cannabis':
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
  'fobias':
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
};

const FALLBACK =
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80';

export const getArticleImage = (slug: string): string =>
  ARTICLE_IMAGES[slug] ?? FALLBACK;
