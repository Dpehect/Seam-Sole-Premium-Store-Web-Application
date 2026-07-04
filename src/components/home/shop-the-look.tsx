'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Plus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatedSection } from '@/components/animations/animated-section';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/lib/products';
import { siteContent } from '@/lib/site-content';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

export function ShopTheLook() {
  const section = siteContent.home.shopTheLook;
  const [activeSlug, setActiveSlug] = useState(section.hotspots[0]?.slug ?? '');
  const addItem = useCartStore((state) => state.addItem);
  const items = useMemo(() => section.hotspots.map((item) => ({ ...item, product: allProducts.find((product) => product.slug === item.slug) })).filter((item) => item.product), [section.hotspots]);
  const active = items.find((item) => item.slug === activeSlug) ?? items[0];

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-punch">{section.kicker}</p>
          <h2 className="mt-2 max-w-3xl font-display text-6xl font-black leading-[.86] tracking-[-.09em] md:text-8xl">{section.title}</h2>
        </div>
        <Button asChild variant="outline"><Link href="/lookbook">See editorial pages <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative min-h-[660px] overflow-hidden rounded-[3.5rem] border border-ink/10 bg-ink shadow-soft">
          <Image src={section.image} alt={section.imageAlt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
          {items.map((item) => (
            <button
              key={item.slug}
              onClick={() => setActiveSlug(item.slug)}
              className={cn('absolute z-10 grid h-14 w-14 place-items-center rounded-full border border-cream/40 bg-cream/80 text-ink shadow-soft backdrop-blur-xl transition hover:scale-110', activeSlug === item.slug && 'bg-lime')}
              style={{ left: item.x, top: item.y }}
              aria-label={`View ${item.label}`}
            >
              <Plus className="h-5 w-5" />
            </button>
          ))}
          <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-cream/15 bg-cream/12 p-5 text-cream backdrop-blur-xl md:max-w-md">
            <p className="text-xs font-black uppercase tracking-[.18em] text-lime">{section.helperTitle}</p>
            <p className="mt-2 text-sm leading-6 text-cream/72">{section.helperText}</p>
          </div>
        </div>

        {active?.product && (
          <div className="rounded-[3.5rem] border border-ink/10 bg-white/35 p-4 shadow-soft backdrop-blur-xl">
            <div className="relative h-[420px] overflow-hidden rounded-[2.8rem] bg-fog">
              <Image src={active.product.images[0]} alt={active.product.name} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
            </div>
            <div className="p-4 md:p-6">
              <p className="text-xs font-black uppercase tracking-[.22em] text-cobalt">{active.label}</p>
              <h3 className="mt-3 font-display text-5xl font-black leading-[.88] tracking-[-.09em]">{active.product.name}</h3>
              <p className="mt-4 text-sm leading-6 text-ink/62">{active.product.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="font-display text-4xl font-black tracking-[-.08em]">{formatPrice(active.product.price)}</p>
                <Button
                  variant="punch"
                  onClick={() => {
                    addItem(active.product!);
                    toast.success(`${active.product!.name} added to cart`);
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Quick add
                </Button>
              </div>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href={`/product/${active.product.slug}`}>Open product page <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
