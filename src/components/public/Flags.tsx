// Inline SVG flag components — render reliably across all OSes.
type FlagProps = { className?: string };

const baseClass = 'inline-block rounded-[3px] overflow-hidden ring-1 ring-black/10';

export const FlagBR = ({ className = 'w-5 h-3.5' }: FlagProps) => (
  <span className={`${baseClass} ${className}`} aria-hidden>
    <svg viewBox="0 0 28 20" preserveAspectRatio="none" className="w-full h-full block">
      <rect width="28" height="20" fill="#009B3A" />
      <polygon points="14,2.4 25.6,10 14,17.6 2.4,10" fill="#FEDF00" />
      <circle cx="14" cy="10" r="4" fill="#002776" />
      <path d="M10.4 10.4a4 4 0 0 1 7.2 -0.6" stroke="#fff" strokeWidth="0.6" fill="none" />
    </svg>
  </span>
);

export const FlagUS = ({ className = 'w-5 h-3.5' }: FlagProps) => (
  <span className={`${baseClass} ${className}`} aria-hidden>
    <svg viewBox="0 0 28 20" preserveAspectRatio="none" className="w-full h-full block">
      <rect width="28" height="20" fill="#fff" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} y={i * (20 / 13) * 2} width="28" height={20 / 13} fill="#B22234" />
      ))}
      <rect width="12" height={20 * (7 / 13)} fill="#3C3B6E" />
    </svg>
  </span>
);

export const FlagES = ({ className = 'w-5 h-3.5' }: FlagProps) => (
  <span className={`${baseClass} ${className}`} aria-hidden>
    <svg viewBox="0 0 28 20" preserveAspectRatio="none" className="w-full h-full block">
      <rect width="28" height="20" fill="#AA151B" />
      <rect y="5" width="28" height="10" fill="#F1BF00" />
    </svg>
  </span>
);

export const FlagByCode = ({ code, className }: { code: string; className?: string }) => {
  if (code.startsWith('en')) return <FlagUS className={className} />;
  if (code.startsWith('es')) return <FlagES className={className} />;
  return <FlagBR className={className} />;
};
