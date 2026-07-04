'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export function HoverWave({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn('image-wave', className)}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect || !ref.current) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        ref.current.style.setProperty('--x', `${x}%`);
        ref.current.style.setProperty('--y', `${y}%`);
      }}
    >
      {children}
    </div>
  );
}
