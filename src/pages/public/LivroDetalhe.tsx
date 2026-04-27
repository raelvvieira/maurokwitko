import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Gift, Tag, Sparkles, BookOpen, Video } from 'lucide-react';
import { BOOKS } from '@/data/books';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';
import ExpandableSynopsis from '@/components/public/ExpandableSynopsis';
import BookReviews from '@/components/public/BookReviews';

const youtubeEmbed = (url?: string) => {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
};

const LivroDetalhe = () => {
  const { tipo, id } = useParams<{ tipo: string; id: string }>();
  const { ebooks } = useEbooks();

  if (tipo !== 'fisico' && tipo !== 'ebook') return <Navigate to="/livros-e-ebooks" replace />;

  let titulo = '';
  let autor = 'Dr. Mauro Kwitko';
  let cover = '';
  let synopsis = '';
  let videoUrl: string | undefined;
  let preco = '';
  let comprarLink = '#';
  let coverScale: number | undefined;
  let dataReady = true;

  if (tipo === 'fisico') {
    const book = BOOKS.find((b) => b.slug === id);
    if (!book) return <Navigate to="/livros-e-ebooks" replace />;
    titulo = book.title;
    cover = book.cover;
    synopsis = book.synopsis || 'Sinopse em breve.';
    videoUrl = book.videoUrl;
    preco = book.price;
    comprarLink = book.link;
    coverScale = book.coverScale;
  } else {
    const ebook = ebooks.find((e) => e.id === id);
    if (ebooks.length === 0) {
      dataReady = false;
    } else if (!ebook) {
      return <Navigate to="/livros-e-ebooks" replace />;
    } else {
      titulo = ebook.title;
      autor = ebook.author;
      cover = ebook.cover_url || '';
      synopsis = ebook.description || 'Sinopse em breve.';
      videoUrl = (ebook as any).video_url || undefined;
      // E-books: "Comprar" leva para a Amazon (não expor PDF). Acesso ao PDF é só dentro do Clube de Estudos.
      comprarLink = 'https://www.amazon.com.br/s?k=Dr.+Mauro+Kwitko';
    }
  }

  const embed = youtubeEmbed(videoUrl);

  // Sugestões: outros livros + ebooks (exclui o atual)
  const sugestoes = [
    ...BOOKS.filter((b) => !(tipo === 'fisico' && b.slug === id)).map((b) => ({
      key: 'f-' + b.slug,
      cover: b.cover,
      title: b.title,
      to: `/livros-e-ebooks/fisico/${b.slug}`,
      coverScale: b.coverScale,
    })),
    ...ebooks
      .filter((e) => !(tipo === 'ebook' && e.id === id))
      .map((e) => ({ key: 'e-' + e.id, cover: e.cover_url || '', title: e.title, to: `/livros-e-ebooks/ebook/${e.id}`, coverScale: undefined as number | undefined })),
  ].filter((i) => i.cover);

  if (!dataReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/livros-e-ebooks"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao catálogo
          </Link>

          <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 md:gap-12">
            {/* Capa */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:sticky md:top-32 self-start"
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-muted shadow-2xl max-w-sm mx-auto">
                {cover ? (
                  <img
                    src={cover}
                    alt={titulo}
                    style={coverScale ? { transform: `scale(${coverScale})` } : undefined}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <BookOpen className="w-16 h-16" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
                  {tipo === 'fisico' ? 'Livro Físico' : 'E-book'}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-2">{titulo}</h1>
                <p className="text-base text-muted-foreground">por {autor}</p>
              </div>

              {tipo === 'fisico' && (
                <p className="text-3xl md:text-4xl font-bold text-primary">{preco}</p>
              )}

              <div>
                <h2 className="text-sm font-semibold tracking-[0.18em] text-foreground/60 uppercase mb-2">
                  Sinopse
                </h2>
                <ExpandableSynopsis text={synopsis} />
              </div>

              {/* Comentário do Autor */}
              <div className="rounded-2xl border border-border/60 bg-secondary/40 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Video className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold tracking-[0.18em] text-foreground/70 uppercase">
                    Comentário do Autor
                  </h3>
                </div>
                {embed ? (
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={embed}
                      title={`Comentário do autor — ${titulo}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl bg-background/60 border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
                    Vídeo de apresentação em breve.
                  </div>
                )}
              </div>

              {/* CTAs */}
              {tipo === 'fisico' ? (
                <div className="flex flex-col gap-3">
                  <a
                    href={comprarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5" /> Comprar
                  </a>
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Link
                      to="/clube-de-estudos"
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-50 text-emerald-800 font-semibold border-2 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100 transition-colors"
                    >
                      <Tag className="w-5 h-5" /> Comprar com 20% de Desconto
                    </Link>
                  </motion.div>
                  <Link
                    to="/clube-de-estudos"
                    className="block rounded-2xl border border-emerald-200 bg-emerald-50 p-5 hover:bg-emerald-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-800 mb-1">
                          Membro do Clube ganha 20% de desconto
                        </p>
                        <p className="text-sm text-emerald-900/75 leading-relaxed">
                          Membros do Clube de Estudos do Dr. Mauro Kwitko ganham 20% de desconto em
                          todos os livros físicos.{' '}
                          <span className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                            Conhecer o Clube →
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <a
                    href={comprarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5" /> Comprar
                  </a>
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Link
                      to="/clube-de-estudos"
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-50 text-emerald-800 font-semibold border-2 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100 transition-colors"
                    >
                      <Gift className="w-5 h-5" /> Adquirir Gratuitamente
                    </Link>
                  </motion.div>
                  <Link
                    to="/clube-de-estudos"
                    className="block rounded-2xl border border-emerald-200 bg-emerald-50 p-5 hover:bg-emerald-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-800 mb-1">
                          Acesso gratuito para assinantes
                        </p>
                        <p className="text-sm text-emerald-900/75 leading-relaxed">
                          Assinantes do Clube de Estudos do Dr. Mauro Kwitko têm acesso gratuito a
                          todos os e-books publicados.{' '}
                          <span className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                            Conhecer o Clube →
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <BookReviews bookType={tipo as 'fisico' | 'ebook'} bookId={id!} />
        </div>
      </section>

      {sugestoes.length > 0 && (
        <section className="py-16 md:py-20 px-5 md:px-6 bg-secondary/30">
          <div className="max-w-7xl mx-auto mb-8 md:mb-10 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
              Você também pode gostar
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Todas as obras do autor</h2>
          </div>
          <Marquee
            items={sugestoes}
            duration={55}
            renderItem={(item) => (
              <Link
                to={item.to}
                className="block w-[160px] h-[240px] md:w-[200px] md:h-[300px] rounded-xl overflow-hidden bg-muted shadow-md hover:shadow-xl transition-shadow relative"
              >
                <img
                  src={item.cover}
                  alt={item.title}
                  style={item.coverScale ? { transform: `scale(${item.coverScale})` } : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Link>
            )}
          />
        </section>
      )}
    </div>
  );
};

export default LivroDetalhe;
