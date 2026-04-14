import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';

const EbookReader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchUrl = async () => {
      try {
        const baseUrl = import.meta.env.VITE_SUPABASE_URL;
        const res = await fetch(`${baseUrl}/functions/v1/ebook-redirect?id=${id}&mode=url`);
        if (!res.ok) throw new Error('Falha ao carregar e-book');
        const data = await res.json();
        setPdfUrl(data.url);
        setTitle(data.title || 'E-book');
      } catch (e: any) {
        setError(e.message || 'Erro ao carregar');
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [id]);

  const downloadUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ebook-download?id=${id}`;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3 shrink-0">
        <button
          onClick={() => navigate('/ebooks')}
          className="p-2 rounded-xl glass-card hover:bg-accent/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base md:text-lg font-bold truncate flex-1">{title || 'E-book'}</h1>
        <a
          href={downloadUrl}
          className="p-2 rounded-xl glass-card hover:bg-accent/10 transition-colors"
          title="Baixar E-book"
        >
          <Download className="w-5 h-5" />
        </a>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex-1 flex items-center justify-center glass-card rounded-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="flex-1 flex items-center justify-center glass-card rounded-2xl">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {pdfUrl && !loading && !error && (
        <iframe
          src={pdfUrl}
          className="flex-1 w-full rounded-2xl border border-border/30"
          title={title}
        />
      )}
    </div>
  );
};

export default EbookReader;
