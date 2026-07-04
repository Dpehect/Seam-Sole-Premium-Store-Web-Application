import { AnimatedSection } from '@/components/animations/animated-section';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Gauge, MousePointer2, Sparkles, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { siteContent } from '@/lib/site-content';

const icons = [MousePointer2, Wand2, Gauge];

export function FinalPolish() {
  const section = siteContent.home.finalPolish;

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="relative overflow-hidden rounded-[2.4rem] border border-ink/10 bg-ink p-6 text-cream shadow-soft md:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime/35 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-72 w-72 rounded-full bg-punch/25 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <Badge className="bg-cream text-ink"><Sparkles className="mr-2 h-3 w-3" /> {section.badge}</Badge>
            <h2 className="mt-6 font-display text-6xl font-black uppercase leading-[.82] tracking-[-.11em] md:text-8xl">
              {section.title}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-cream/68 md:text-base">
              {section.description}
            </p>
            <Link href="/shop" className="mt-8 inline-flex items-center rounded-full bg-lime px-6 py-4 text-sm font-black uppercase tracking-[.12em] text-ink transition hover:scale-[1.02]">
              {section.cta} <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {section.cards.map((card, index) => {
              const Icon = icons[index] ?? Sparkles;
              return (
                <div key={card.title} className="rounded-[1.8rem] border border-cream/12 bg-cream/8 p-5 backdrop-blur-xl">
                  <Icon className="h-6 w-6 text-lime" />
                  <h3 className="mt-5 font-display text-2xl font-black tracking-[-.06em]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-cream/60">{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
