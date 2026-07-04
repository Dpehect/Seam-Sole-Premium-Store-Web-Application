'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { allProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

export function SneakerOrbit() {
  const sneaker = allProducts.find((product) => product.slug === 'cobalt-court-sneaker') ?? allProducts.find((product) => product.category === 'sneakers') ?? allProducts[0];
  const tee = allProducts.find((product) => product.slug === 'sunset-race-tee') ?? allProducts.find((product) => product.category === 'tees') ?? allProducts[1];

  return (
    <div className="relative h-[500px] overflow-hidden rounded-5xl border border-ink/10 bg-ink shadow-soft md:h-[560px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(201,255,60,.28),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,78,91,.22),transparent_24%),linear-gradient(135deg,#14110f_0%,#2a211c_55%,#12100e_100%)]" />
      <div className="absolute inset-8 rounded-[2.5rem] border border-cream/10 bg-cream/[.035] backdrop-blur-sm" />
      <div className="absolute left-1/2 top-1/2 h-44 w-[78%] -translate-x-1/2 translate-y-20 rounded-full bg-black/45 blur-2xl" />

      <motion.div
        className="absolute left-[9%] top-[12%] h-[70%] w-[46%] origin-bottom overflow-hidden rounded-[2.25rem] border border-cream/15 bg-cream/10 p-3 shadow-2xl"
        animate={{ y: [0, -14, 0], rotateY: [-8, 3, -8], rotateZ: [-2, 1, -2] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative h-full overflow-hidden rounded-[1.8rem] bg-fog">
          <Image src={sneaker.images[0]} alt={sneaker.name} fill sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-cream/5" />
          <div className="absolute left-5 top-5 rounded-full bg-lime px-4 py-2 text-[11px] font-black uppercase tracking-[.16em] text-ink">Real product</div>
          <div className="absolute bottom-5 left-5 right-5 text-cream">
            <p className="text-xs font-black uppercase tracking-[.18em] text-lime">{sneaker.collection}</p>
            <h3 className="mt-2 font-display text-4xl font-black leading-[.86] tracking-[-.08em]">{sneaker.name}</h3>
            <p className="mt-2 text-sm font-black">{formatPrice(sneaker.price)}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[20%] h-[54%] w-[34%] origin-bottom overflow-hidden rounded-[2rem] border border-cream/15 bg-cream/10 p-3 shadow-2xl"
        animate={{ y: [0, 16, 0], rotateY: [7, -4, 7], rotateZ: [3, -1, 3] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-fog">
          <Image src={tee.images[0]} alt={tee.name} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-transparent to-cream/5" />
          <div className="absolute bottom-4 left-4 right-4 text-cream">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-lime">{tee.collection}</p>
            <h3 className="mt-2 font-display text-3xl font-black leading-[.88] tracking-[-.08em]">{tee.name}</h3>
          </div>
        </div>
      </motion.div>


      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/88 to-transparent p-7 text-cream">
        <p className="text-xs font-black uppercase tracking-[.22em] text-lime">Retail display</p>
        <h3 className="mt-2 font-display text-4xl font-black tracking-[-.08em]">Sneaker and tee rotation.</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-cream/64">Layered product imagery gives the collection depth while keeping the focus on pieces customers can actually buy.</p>
        <Link href="/fit-studio" className="pointer-events-auto mt-4 inline-flex items-center rounded-full bg-cream px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-ink transition hover:bg-lime">
          Open fit studio <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
