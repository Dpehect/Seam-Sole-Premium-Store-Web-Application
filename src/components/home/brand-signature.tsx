import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AnimatedSection } from '@/components/animations/animated-section';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/lib/site-content';

export function BrandSignature() {
  const section = siteContent.home.brandSignature;
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8">
      <div className="overflow-hidden rounded-[3.5rem] border border-ink/10 bg-lime p-8 shadow-soft md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-ink/55">{section.kicker}</p>
            <h2 className="mt-4 font-display text-6xl font-black leading-[.84] tracking-[-.09em] md:text-8xl">{section.title}</h2>
          </div>
          <div>
            <div className="grid gap-3">
              {section.points.map((point) => (
                <p key={point} className="flex items-center gap-3 rounded-full bg-cream/65 px-4 py-3 text-sm font-black text-ink/70">
                  <CheckCircle2 className="h-4 w-4 text-punch" /> {point}
                </p>
              ))}
            </div>
            <Button asChild variant="punch" size="lg" className="mt-6">
              <Link href="/shop">{section.cta} <ArrowUpRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
