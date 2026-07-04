import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedSection } from '@/components/animations/animated-section';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/lib/site-content';

export function EditorialStrip() {
  const section = siteContent.home.editorial;
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-cream shadow-soft md:rounded-[4rem]">
        <Image src={section.image} alt={section.imageAlt} fill sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative max-w-3xl p-8 py-20 md:p-16 md:py-28">
          <p className="text-xs font-black uppercase tracking-[.24em] text-lime">{section.kicker}</p>
          <h2 className="mt-4 font-display text-6xl font-black leading-[.86] tracking-[-.09em] md:text-8xl">{section.title}</h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-cream/75">{section.description}</p>
          <Button asChild variant="lime" size="lg" className="mt-8"><Link href="/lookbook">{section.cta} <ArrowUpRight className="ml-2 h-5 w-5" /></Link></Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
