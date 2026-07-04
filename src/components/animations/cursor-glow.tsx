'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export function CursorGlow() {
  const reducedMotion = usePrefersReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const updatePointer = () => setHasFinePointer(pointerQuery.matches);
    updatePointer();
    pointerQuery.addEventListener('change', updatePointer);

    const onMove = (event: PointerEvent) => {
      mouseX.set(event.clientX - 140);
      mouseY.set(event.clientY - 140);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      pointerQuery.removeEventListener('change', updatePointer);
      window.removeEventListener('pointermove', onMove);
    };
  }, [mouseX, mouseY]);

  if (reducedMotion || !hasFinePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[65] h-72 w-72 rounded-full opacity-55 blur-3xl mix-blend-multiply"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(201,255,60,.45), rgba(255,78,91,.2) 42%, transparent 72%)'
      }}
    />
  );
}
