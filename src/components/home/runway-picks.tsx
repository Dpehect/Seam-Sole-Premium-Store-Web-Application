'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/animated-section';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/lib/products';
import { siteContent } from '@/lib/site-content';
import { cn, formatPrice } from '@/lib/utils';

export function RunwayPicks() {
  const section = siteContent.home.runway;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const products = section.productSlugs
    .map((slug) => allProducts.find((product) => product.slug === slug))
    .filter(Boolean);

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="grid gap-6 lg:grid-cols-[.64fr_1.36fr] lg:items-stretch">
        <div className="rounded-[3rem] bg-ink p-7 text-cream shadow-soft md:p-9">
          <p className="text-xs font-black uppercase tracking-[.24em] text-lime">{section.kicker}</p>
          <h2 className="mt-4 font-display text-5xl font-black leading-[.84] tracking-[-.09em] md:text-7xl">{section.title}</h2>
          <p className="mt-6 text-lg leading-8 text-cream/68">
            {section.description}
          </p>
          <Button asChild variant="lime" size="lg" className="mt-8">
            <Link href="/shop">Browse all pieces <ArrowUpRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:flex lg:items-stretch">
          {products.map((product, index) => {
            if (!product) return null;
            const isActive = activeIndex === index;

            return (
              <motion.article
                key={product.id}
                layout
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => setActiveIndex((value) => (value === index ? null : index))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveIndex((value) => (value === index ? null : index));
                  }
                }}
                className={cn(
                  'group relative min-h-[440px] min-w-0 cursor-pointer overflow-hidden rounded-[3rem] border bg-white/40 p-3 shadow-card outline-none backdrop-blur-xl transition-all duration-700 focus-visible:ring-2 focus-visible:ring-punch md:min-h-[500px] lg:basis-0',
                  isActive ? 'border-ink/25 lg:flex-[2.8]' : 'border-ink/10 hover:border-ink/20 lg:flex-1'
                )}
              >
                <div className="relative h-full overflow-hidden rounded-[2.35rem] bg-fog">
                  <Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className={cn('object-cover transition duration-700', isActive ? 'scale-105' : 'group-hover:scale-110')} />
                  <div className={cn('absolute inset-0 bg-gradient-to-t from-ink/86 via-ink/20 to-transparent transition-opacity duration-500', isActive ? 'opacity-100' : 'opacity-90')} />
                  <div className="absolute left-5 top-5 rounded-full bg-cream/85 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-ink shadow-card">0{index + 1}</div>
                  <div className={cn('absolute right-5 top-5 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[.16em] shadow-card transition', isActive ? 'bg-lime text-ink opacity-100' : 'bg-cream/75 text-ink/60 opacity-0 group-hover:opacity-100')}>{isActive ? 'Selected' : 'View details'}</div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                    <p className="text-xs font-black uppercase tracking-[.18em] text-lime">{product.collection}</p>
                    <h3 className={cn('mt-2 font-display font-black leading-[.88] tracking-[-.08em] transition-all duration-500', isActive ? 'max-w-xl text-5xl md:text-6xl' : 'line-clamp-3 text-3xl md:text-4xl')}>{product.name}</h3>
                    <p className="mt-3 text-sm font-black">{formatPrice(product.price)}</p>
                    <div className={cn('grid overflow-hidden transition-all duration-500', isActive ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0')}>
                      <div className="min-h-0">
                        <p className="max-w-sm text-sm leading-6 text-cream/70">{product.badgeLine ?? product.fit}</p>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={(event) => event.stopPropagation()}
                          className="mt-4 inline-flex items-center rounded-full bg-cream px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-ink transition hover:bg-lime"
                        >
                          View piece <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
