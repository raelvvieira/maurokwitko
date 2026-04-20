import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

type MarqueeProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  duration?: number;
  gap?: number;
};

export function Marquee<T>({ items, renderItem, duration = 50, gap = 24 }: MarqueeProps<T>) {
  const [paused, setPaused] = useState(false);
  if (!items.length) return null;
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
  );
}

export default Marquee;
