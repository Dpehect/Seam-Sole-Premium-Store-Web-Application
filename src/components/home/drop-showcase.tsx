import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedSection } from '@/components/animations/animated-section';
import { Button } from '@/components/ui/button';
import { allCategories, allCollections } from '@/lib/products';
import { siteContent } from '@/lib/site-content';

export function DropShowcase() {
  const section = siteContent.home.categoryShowcase;
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-punch">{section.kicker}</p>
          <h2 className="mt-3 max-w-3xl font-display text-6xl font-black leading-[.86] tracking-[-.09em] md:text-8xl">{section.title}</h2>
        </div>
        <Button asChild variant="outline"><Link href="/drops">{section.cta} <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-4">
        {allCategories.map((category, index) => (
          <Link key={category.id} href={`/shop/${category.id}`} className="group relative min-h-[380px] overflow-hidden rounded-5xl border border-ink/10 bg-ink text-cream shadow-card">
            <Image src={category.image} alt={category.name} fill sizes="25vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="text-xs font-black uppercase tracking-[.24em] text-lime">0{index + 1}</span>
              <h3 className="mt-2 font-display text-4xl font-black tracking-[-.08em]">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-cream/70">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {allCollections.map((collection) => (
          <div key={collection.slug} className="rounded-5xl border border-ink/10 bg-white/35 p-6 shadow-card backdrop-blur-xl">
            <div className="mb-8 h-3 w-24 rounded-full" style={{ background: collection.accent }} />
            <h3 className="font-display text-3xl font-black tracking-[-.07em]">{collection.name}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/60">{collection.tagline}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
