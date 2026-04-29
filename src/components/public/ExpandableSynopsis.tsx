import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Props = { text: string };

const ExpandableSynopsis = ({ text }: Props) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
            <>{t('synopsis.less')} <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>{t('synopsis.more')} <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableSynopsis;

