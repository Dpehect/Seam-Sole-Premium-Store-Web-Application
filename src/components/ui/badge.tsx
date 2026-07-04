import { cn } from '@/lib/utils';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border border-ink/15 bg-white/40 px-3 py-1 text-[11px] font-black uppercase tracking-[.18em] text-ink backdrop-blur-xl', className)}>
      {children}
    </span>
  );
}
