import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import { FlagByCode } from './Flags';
import { useState } from 'react';

interface LanguageSwitcherProps {
  variant?: 'header' | 'inline';
}

const LanguageSwitcher = ({ variant = 'header' }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentCode = i18n.language?.startsWith('pt')
    ? 'pt-BR'
    : i18n.language?.startsWith('es')
    ? 'es'
    : i18n.language?.startsWith('en')
    ? 'en'
    : 'pt-BR';

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === currentCode) ?? SUPPORTED_LANGUAGES[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label={t('language.label') as string}
          className={`inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 backdrop-blur px-2.5 py-2 hover:bg-secondary/70 transition-colors shadow-sm ${
            variant === 'inline' ? 'w-full justify-center' : ''
          }`}
        >
          <FlagByCode code={current.code} className="w-6 h-4" />
          <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-56 p-2 rounded-2xl">
        <div className="flex items-center gap-2 px-2 pt-1 pb-2 text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
          <Globe className="w-3.5 h-3.5" /> {t('language.label')}
        </div>
        <div className="flex flex-col gap-1">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const active = lang.code === current.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30'
                    : 'hover:bg-secondary/70 text-foreground/80'
                }`}
              >
                <span className="inline-flex items-center gap-2.5">
                  <FlagByCode code={lang.code} className="w-6 h-4" />
                  {lang.label}
                </span>
                {active && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
