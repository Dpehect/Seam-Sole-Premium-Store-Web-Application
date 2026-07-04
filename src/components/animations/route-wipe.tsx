'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export function RouteWipe() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  if (reducedMotion) return null;

  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[68] overflow-hidden bg-cream/45 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.42, 0] }}
      transition={{ duration: 0.34, times: [0, 0.38, 1], ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-lime/28 blur-3xl"
        initial={{ scale: 0.72, x: -40, y: -20 }}
        animate={{ scale: 1.12, x: 55, y: 12 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-punch/14 blur-3xl"
        initial={{ scale: 0.78, x: 60, y: 30 }}
        animate={{ scale: 1.02, x: -30, y: -8 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
