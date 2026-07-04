'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Mousewheel, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/product-card';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';

type Chapter = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

type Hotspot = {
  slug: string;
  x: number;
  y: number;
  label: string;
};

type EditorialStory = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  products: string[];
  palette?: string[];
  mood?: string;
  chapters?: Chapter[];
  hotspots?: Hotspot[];
};

export function EditorialReader({ story, products }: { story: EditorialStory; products: Product[] }) {
  const chapters = story.chapters ?? [];
  const hotspots = story.hotspots ?? [];

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_.48fr]">
          <div className="relative min-h-[680px] overflow-hidden rounded-[3.5rem] bg-ink shadow-soft">
            <Image src={story.image} alt={story.title} fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,78,91,.34),transparent_32%),linear-gradient(180deg,rgba(18,16,14,.08),rgba(18,16,14,.86))]" />
            {hotspots.map((spot) => {
              const product = products.find((item) => item.slug === spot.slug);
              return (
                <Link
                  key={spot.slug}
                  href={product ? `/product/${product.slug}` : '/shop'}
                  className="hotspot-pulse group absolute z-10 grid h-12 w-12 place-items-center rounded-full bg-lime text-ink shadow-soft transition hover:scale-110"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  aria-label={`Shop ${spot.label}`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="pointer-events-none absolute left-1/2 top-14 min-w-44 -translate-x-1/2 rounded-3xl bg-cream px-4 py-3 text-left text-xs font-black uppercase tracking-[.14em] opacity-0 shadow-card transition group-hover:opacity-100">
                    {spot.label}
                    {product && <span className="mt-1 block font-body text-[11px] font-bold normal-case tracking-normal text-ink/55">{product.name}</span>}
                  </span>
                </Link>
              );
            })}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-cream md:p-10">
              <Badge className="bg-lime text-ink">{story.kicker}</Badge>
              <h1 className="mt-5 max-w-4xl font-display text-7xl font-black leading-[.78] tracking-[-.11em] md:text-[9rem]">{story.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/72">{story.description}</p>
            </div>
          </div>

          <aside className="rounded-[3.5rem] border border-ink/10 bg-white/35 p-6 shadow-card backdrop-blur-xl lg:sticky lg:top-28 lg:h-max">
            <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Styling system</p>
            <h2 className="mt-3 font-display text-5xl font-black leading-[.86] tracking-[-.08em]">Shop the full fit.</h2>
            <p className="mt-4 text-sm leading-7 text-ink/60">{story.mood ?? 'A complete outfit built from the Seam & Sole product catalog.'}</p>
            <div className="mt-6 grid gap-3">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group grid grid-cols-[78px_1fr_auto] items-center gap-3 rounded-[1.7rem] bg-cream/70 p-3 transition hover:-translate-y-1 hover:shadow-card">
                  <div className="relative h-20 overflow-hidden rounded-[1.25rem] bg-fog">
                    <Image src={product.images[0]} alt={product.name} fill sizes="90px" className="object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-black leading-none tracking-[-.05em]">{product.name}</p>
                    <p className="mt-1 text-xs font-bold text-ink/45">{formatPrice(product.price)} · {product.category}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            <Button asChild variant="punch" size="lg" className="mt-6 w-full">
              <Link href="/shop">Build another outfit</Link>
            </Button>
          </aside>
        </div>

        <div className="mt-16 overflow-hidden rounded-[3.5rem] bg-ink p-4 text-cream shadow-soft md:p-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4 px-2 md:px-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Swipe editorial</p>
              <h2 className="mt-2 font-display text-5xl font-black tracking-[-.08em] md:text-7xl">Page-turn styling.</h2>
            </div>
            <div className="hidden max-w-md text-sm leading-7 text-cream/60 md:block">Swiper-based magazine pacing with boutique-specific product storytelling, not a generic gallery.</div>
          </div>
          <Swiper
            className="editorial-swiper overflow-visible rounded-[2.5rem]"
            modules={[EffectCreative, Mousewheel, Pagination]}
            effect="creative"
            creativeEffect={{ prev: { shadow: true, translate: ['-18%', 0, -220], rotate: [0, 0, -3] }, next: { translate: ['94%', 0, 0], rotate: [0, 0, 4] } }}
            grabCursor
            mousewheel={{ forceToAxis: true }}
            pagination={{ clickable: true }}
            slidesPerView={1}
          >
            {chapters.map((chapter, index) => (
              <SwiperSlide key={chapter.title}>
                <div className="grid min-h-[560px] overflow-hidden rounded-[2.5rem] bg-cream text-ink md:grid-cols-[.9fr_1.1fr]">
                  <div className="relative min-h-[360px]">
                    <Image src={chapter.image} alt={chapter.title} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                    <div className="absolute left-5 top-5 rounded-full bg-lime px-4 py-2 text-xs font-black uppercase tracking-[.18em]">Page 0{index + 1}</div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="text-xs font-black uppercase tracking-[.24em] text-punch">{chapter.eyebrow}</p>
                    <h3 className="mt-4 font-display text-6xl font-black leading-[.82] tracking-[-.09em] md:text-8xl">{chapter.title}</h3>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">{chapter.body}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-cobalt">Products in this story</p>
              <h2 className="mt-2 font-display text-6xl font-black tracking-[-.09em]">The complete rotation.</h2>
            </div>
            <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3.6, repeat: Infinity }} className="grid h-20 w-20 place-items-center rounded-full bg-lime shadow-card">
              <Sparkles className="h-7 w-7" />
            </motion.div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
