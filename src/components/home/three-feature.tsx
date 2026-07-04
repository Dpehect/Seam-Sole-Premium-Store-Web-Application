import { AnimatedSection } from '@/components/animations/animated-section';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SneakerOrbit } from '@/components/three/sneaker-orbit';
import { siteContent } from '@/lib/site-content';

export function ThreeFeature() {
  const section = siteContent.home.threeFeature;
  return (
    <AnimatedSection className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[.9fr_1.1fr] md:px-8">
      <div className="flex flex-col justify-center">
        <p className="text-xs font-black uppercase tracking-[.24em] text-punch">{section.kicker}</p>
        <h2 className="mt-4 font-display text-6xl font-black leading-[.86] tracking-[-.09em] md:text-8xl">{section.title}</h2>
        <p className="mt-6 max-w-lg text-lg leading-8 text-ink/65">
          {section.description}
        </p>
        <Button asChild variant="punch" size="lg" className="mt-8 w-max"><Link href="/fit-studio">{section.cta} <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>
      <SneakerOrbit />
    </AnimatedSection>
  );
}
