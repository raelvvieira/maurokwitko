import { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Review = {
  id: string;
  reader_name: string;
  comment: string;
  rating: number;
  created_at: string;
};

type Props = {
  bookType: 'fisico' | 'ebook';
  bookId: string;
};

const localeForDate = (lng: string) => {
  if (lng.startsWith('en')) return 'en-US';
  if (lng.startsWith('es')) return 'es-ES';
  return 'pt-BR';
};

const Stars = ({ value, onChange, size = 'md', label }: { value: number; onChange?: (v: number) => void; size?: 'sm' | 'md' | 'lg'; label?: string }) => {
  const cls = size === 'lg' ? 'w-7 h-7' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        return onChange ? (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} ${label ?? ''}`}
            className="transition-transform hover:scale-110"
          >
            <Star className={`${cls} ${filled ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`} />
          </button>
        ) : (
          <Star key={n} className={`${cls} ${filled ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
        );
      })}
    </div>
  );
};

const BookReviews = ({ bookType, bookId }: Props) => {
  const { t, i18n } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(localeForDate(i18n.language), {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const reviewSchema = z.object({
    reader_name: z.string().trim().min(1, t('bookReviews.errorName') as string).max(80, t('bookReviews.errorNameLong') as string),
    comment: z.string().trim().min(1, t('bookReviews.errorComment') as string).max(1000, t('bookReviews.errorCommentLong') as string),
    rating: z.number().int().min(1, t('bookReviews.errorRating') as string).max(5),
  });

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from('book_reviews' as any)
      .select('id, reader_name, comment, rating, created_at')
      .eq('book_type', bookType)
      .eq('book_id', bookId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (active && data) setReviews(data as unknown as Review[]);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [bookType, bookId]);

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = reviewSchema.safeParse({ reader_name: name, comment, rating });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from('book_reviews' as any)
      .insert({ book_type: bookType, book_id: bookId, ...parsed.data })
      .select('id, reader_name, comment, rating, created_at')
      .single();
    setSubmitting(false);
    if (error) {
      toast.error(t('bookReviews.errorSubmit') as string);
      return;
    }
    if (data) setReviews((prev) => [data as unknown as Review, ...prev]);
    setName('');
    setComment('');
    setRating(0);
    toast.success(t('bookReviews.success') as string);
  };

  const countLabel = reviews.length === 1 ? t('bookReviews.countOne') : t('bookReviews.countMany');

  return (
    <section className="mt-12 md:mt-16 rounded-2xl border border-border/60 bg-card/60 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">{t('bookReviews.title')}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t('bookReviews.subtitle')}</p>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Stars value={Math.round(avg)} size="sm" />
            <span className="font-semibold">{avg.toFixed(1)}</span>
            <span className="text-muted-foreground">· {reviews.length} {countLabel}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('bookReviews.nameLabel')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            placeholder={t('bookReviews.namePlaceholder') as string}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('bookReviews.ratingLabel')}</label>
          <Stars value={rating} onChange={setRating} size="lg" label={t('bookReviews.starsAria') as string} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('bookReviews.commentLabel')}</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder={t('bookReviews.commentPlaceholder') as string}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">{comment.length}/1000</div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {t('bookReviews.submit')}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">{t('bookReviews.empty')}</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-border/60 bg-background/60 p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{r.reader_name}</span>
                  <Stars value={r.rating} size="sm" />
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(r.created_at)}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BookReviews;
