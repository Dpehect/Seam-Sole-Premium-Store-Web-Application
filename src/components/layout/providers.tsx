'use client';

import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Toaster } from 'sonner';
import { CursorGlow } from '@/components/animations/cursor-glow';
import { RouteWipe } from '@/components/animations/route-wipe';
import { ScrollProgress } from '@/components/animations/scroll-progress';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.1,
      smoothWheel: true
    });
    lenisRef.current = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <RouteWipe />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Toaster richColors position="top-center" toastOptions={{ className: 'rounded-3xl' }} />
    </>
  );
}
