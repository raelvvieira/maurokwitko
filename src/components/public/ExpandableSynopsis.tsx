import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Props = { text: string };

const COLLAPSED_LINES = 5;

const ExpandableSynopsis = ({ text }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Compare scrollHeight to clamped offsetHeight to detect overflow
    requestAnimationFrame(() => {
      setOverflows(el.scrollHeight > el.clientHeight + 2);
    });
  }, [text]);

  return (
    <div>
      <p
        ref={ref}
        className={`text-base text-foreground/80 leading-relaxed whitespace-pre-line transition-all ${
          expanded ? '' : 'line-clamp-5'
        }`}
      >
        {text}
      </p>
      {(overflows || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? (
            <>Ler menos <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Ler mais <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableSynopsis;
