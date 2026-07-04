'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverWave } from '@/components/animations/hover-wave';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Product } from '@/types/product';

export function ProductCard({ product, index = 0, compact = false }: { product: Product; index?: number; compact?: boolean }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggle = useWishlistStore((state) => state.toggle);
  const has = useWishlistStore((state) => state.has(product.id));

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.28) }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-5xl border border-ink/10 bg-white/40 p-3 shadow-card backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-soft">
        <Link href={`/product/${product.slug}`} aria-label={`Open ${product.name}`}>
          <HoverWave className={cn('relative overflow-hidden rounded-[1.9rem] bg-fog', compact ? 'h-72' : 'h-[420px]')}>
            <Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
            {product.images[1] && <Image src={product.images[1]} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover opacity-0 transition duration-700 group-hover:opacity-100" />}
            <div className="absolute inset-x-4 bottom-4 translate-y-4 rounded-full bg-ink/88 px-4 py-3 text-center text-xs font-black uppercase tracking-[.16em] text-cream opacity-0 shadow-soft backdrop-blur-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Open product studio
            </div>
          </HoverWave>
        </Link>

        <div className="absolute left-6 top-6 flex flex-wrap gap-2">
          {product.isNew && <Badge className="bg-lime">New</Badge>}
          {product.oldPrice && <Badge className="bg-punch text-cream">Sale</Badge>}
          {product.stock <= 10 && <Badge className="bg-ink text-cream">Low stock</Badge>}
        </div>
        <button
          onClick={() => toggle(product.id)}
          className={cn('absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-cream/80 shadow-card backdrop-blur-xl transition hover:scale-105', has && 'bg-punch text-cream')}
          aria-label={has ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('h-4 w-4', has && 'fill-current')} />
        </button>

        <div className="p-3 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link href={`/product/${product.slug}`} className="font-display text-2xl font-black tracking-[-.06em] hover:text-punch">
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-ink/55">{product.collection}</p>
              {!compact && <p className="mt-2 text-xs font-bold text-ink/45">{product.fit}</p>}
            </div>
            <div className="text-right">
              <p className="font-black">{formatPrice(product.price)}</p>
              {product.oldPrice && <p className="text-xs text-ink/40 line-through">{formatPrice(product.oldPrice)}</p>}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {product.colors.slice(0, compact ? 3 : 4).map((color) => <span key={color} className="rounded-full border border-ink/10 bg-cream px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] text-ink/55">{color}</span>)}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-xs font-bold text-ink/65">
              <Star className="h-3.5 w-3.5 fill-current text-clay" /> {product.rating} · {product.reviewCount}
            </div>
            <Button
              size="sm"
              variant="lime"
              onClick={() => {
                addItem(product);
                toast.success(`${product.name} added to cart`);
              }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Quick add
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
