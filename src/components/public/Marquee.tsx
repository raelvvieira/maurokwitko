import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type MarqueeProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  duration?: number;
  gap?: number;
};

export function Marquee<T>({ items, renderItem, duration = 50, gap = 24 }: MarqueeProps<T>) {
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  if (!items.length) return null;
  const doubled = [...items, ...items];

  const pauseTemporarily = () => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  };
  const scheduleResume = () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 1500);
  };

  return (
    <div className="relative max-w-[1320px] mx-auto">
      <div
        className="relative overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain scrollbar-hide"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={pauseTemporarily}
        onTouchEnd={scheduleResume}
        onPointerDown={pauseTemporarily}
        onPointerUp={scheduleResume}
      >
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max"
          style={{ gap }}
          animate={{ x: paused ? undefined : ['0%', '-50%'] }}
          transition={{
            duration,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {doubled.map((item, i) => (
            <div key={i} className="shrink-0">
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Marquee;
