'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function Magnetic({ children, strength = 24 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={(event) => {
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        const relX = event.clientX - (box.left + box.width / 2);
        const relY = event.clientY - (box.top + box.height / 2);
        x.set((relX / box.width) * strength);
        y.set((relY / box.height) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
