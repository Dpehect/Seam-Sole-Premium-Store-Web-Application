'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, PackageCheck, RotateCcw, Ruler, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HoverWave } from '@/components/animations/hover-wave';
import { ProductCard } from '@/components/product/product-card';
import { formatPrice, cn } from '@/lib/utils';
import { getProductReviews, getRelatedProducts } from '@/lib/products';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Product } from '@/types/product';

const commercePromises = [
  { icon: Truck, title: 'Fast dispatch', text: 'Ships in 24 hours from the boutique floor.' },
  { icon: RotateCcw, title: '14-day returns', text: 'Try the fit at home, return if it misses.' },
  { icon: ShieldCheck, title: 'Secure checkout', text: 'Validated checkout flow with clear order details.' }
];

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const toggle = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.has(product.id));
  const related = getRelatedProducts(product);
  const reviews = getProductReviews(product.slug);
  const bundleTotal = useMemo(() => related.slice(0, 2).reduce((total, item) => total + item.price, product.price), [product.price, related]);

  const handleAdd = () => {
    addItem(product, { size, color, quantity });
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_.92fr]">
        <div className="grid gap-4 lg:grid-cols-[90px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:block lg:space-y-3 lg:overflow-visible">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className={cn('relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border bg-fog shadow-card transition lg:w-full', selectedImage === index ? 'border-ink' : 'border-ink/10 opacity-70 hover:opacity-100')}
              >
                <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill sizes="90px" className="object-cover" />
              </button>
            ))}
          </div>

          <div className="order-1 space-y-4 lg:order-2">
            <HoverWave className="relative min-h-[680px] rounded-[3.2rem] bg-fog shadow-soft">
              <Image src={product.images[selectedImage] ?? product.images[0]} alt={product.name} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
                {product.isNew && <Badge className="bg-lime">New drop</Badge>}
                {product.oldPrice && <Badge className="bg-punch text-cream">Sale</Badge>}
                <Badge>{product.collection}</Badge>
              </div>
              {product.badgeLine && <div className="absolute bottom-5 left-5 z-10 max-w-xs rounded-[2rem] bg-cream/85 p-4 text-sm font-black text-ink shadow-card backdrop-blur-xl">{product.badgeLine}</div>}
            </HoverWave>

            <div className="grid gap-4 md:grid-cols-2">
              {product.images.slice(1, 3).map((image, index) => (
                <HoverWave key={image} className="relative h-96 rounded-[2.6rem] bg-fog shadow-card">
                  <Image src={image} alt={`${product.name} detail ${index + 1}`} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />
                </HoverWave>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:h-fit">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[3rem] border border-ink/10 bg-white/38 p-6 shadow-soft backdrop-blur-xl md:p-8"
          >
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge className="bg-ink text-cream"><Sparkles className="mr-2 h-3 w-3 text-lime" /> Product studio</Badge>
              {product.stock <= 10 && <Badge className="bg-punch text-cream">Only {product.stock} left</Badge>}
            </div>
            <h1 className="font-display text-6xl font-black leading-[.86] tracking-[-.09em] md:text-8xl">{product.name}</h1>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1 text-sm font-bold text-ink/70"><Star className="h-4 w-4 fill-current text-clay" /> {product.rating} · {product.reviewCount} reviews</div>
              <div className="text-right">
                <p className="font-display text-4xl font-black tracking-[-.07em]">{formatPrice(product.price)}</p>
                {product.oldPrice && <p className="text-sm text-ink/40 line-through">{formatPrice(product.oldPrice)}</p>}
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 text-ink/66">{product.description}</p>

            <div className="mt-8 grid gap-2 rounded-4xl bg-cream/80 p-2 text-center text-xs font-black text-ink/65 sm:grid-cols-3">
              {commercePromises.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-3xl bg-white/55 p-3">
                    <Icon className="mx-auto mb-2 h-4 w-4 text-punch" />
                    <span className="block">{item.title}</span>
                  </div>
                );
              })}
            </div>

            <OptionBlock label="Color" helper={color}>
              {product.colors.map((item) => (
                <button key={item} onClick={() => setColor(item)} className={cn('rounded-full border px-4 py-2 text-sm font-bold transition', color === item ? 'border-ink bg-ink text-cream' : 'border-ink/10 bg-cream hover:border-ink/40')}>{item}</button>
              ))}
            </OptionBlock>

            <OptionBlock label="Size" helper={<Link href="/style-quiz" className="font-bold text-cobalt">Find your fit</Link>}>
              <div className="grid w-full grid-cols-5 gap-2">
                {product.sizes.map((item) => (
                  <button key={item} onClick={() => setSize(item)} className={cn('rounded-2xl border py-3 text-sm font-black transition', size === item ? 'border-ink bg-lime text-ink' : 'border-ink/10 bg-cream hover:border-ink/40')}>{item}</button>
                ))}
              </div>
            </OptionBlock>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between"><p className="text-sm font-black uppercase tracking-[.18em]">Quantity</p><p className="text-sm text-ink/55">{product.stock} left</p></div>
              <div className="inline-flex rounded-full border border-ink/10 bg-cream p-1">
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-10 w-10 rounded-full text-lg font-black hover:bg-white">−</button>
                <span className="grid h-10 min-w-12 place-items-center font-black">{quantity}</span>
                <button onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} className="h-10 w-10 rounded-full text-lg font-black hover:bg-white">+</button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-[1fr_auto] gap-3">
              <Button size="lg" variant="punch" onClick={handleAdd}>
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to cart
              </Button>
              <Button size="lg" variant={isWishlisted ? 'lime' : 'outline'} onClick={() => toggle(product.id)} aria-label="Wishlist"><Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} /></Button>
            </div>

            <div className="mt-8 grid gap-3 rounded-4xl bg-cream/80 p-5 text-sm text-ink/70">
              <p className="flex gap-2"><Check className="h-4 w-4 text-punch" /> {product.fit}</p>
              <p className="flex gap-2"><Check className="h-4 w-4 text-punch" /> Materials: {product.materials.join(', ')}</p>
              {product.model?.wearing && <p className="flex gap-2"><Ruler className="h-4 w-4 text-punch" /> Model reference: wearing {product.model.wearing}{product.model.height ? ` · ${product.model.height}` : ''}</p>}
              {(product.care ?? []).map((item) => <p key={item} className="flex gap-2"><Check className="h-4 w-4 text-punch" /> {item}</p>)}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-6 lg:grid-cols-3">
        <div className="rounded-[3rem] bg-ink p-8 text-cream shadow-soft lg:col-span-2">
          <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Product story</p>
          <h2 className="mt-3 font-display text-6xl font-black leading-[.86] tracking-[-.09em] md:text-8xl">Designed for the first glance and the tenth wear.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/70">
            This product page is built like a premium retail surface: cinematic gallery, sticky purchase panel, commerce trust points, fit guidance, care notes and connected styling recommendations.
          </p>
        </div>
        <div className="rounded-[3rem] border border-ink/10 bg-lime p-8 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[.24em] text-ink/55">Bundle idea</p>
          <h3 className="mt-3 font-display text-5xl font-black leading-[.86] tracking-[-.08em]">Complete the fit from {formatPrice(bundleTotal)}.</h3>
          <p className="mt-4 text-sm leading-6 text-ink/65">Pair this product with related tees, sneakers or accessories from the current boutique rotation.</p>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Community proof</p>
            <h2 className="mt-2 font-display text-5xl font-black tracking-[-.08em]">Customer notes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={`${review.name}-${review.title}`} className="rounded-5xl border border-ink/10 bg-white/35 p-6 shadow-card backdrop-blur-xl">
                <div className="mb-3 flex gap-1 text-clay">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
                <h3 className="font-display text-3xl font-black tracking-[-.07em]">{review.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/62">{review.body}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[.16em] text-ink/40">{review.name}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 max-w-7xl pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Complete the fit</p>
            <h2 className="mt-2 font-display text-5xl font-black tracking-[-.08em]">Related rotation</h2>
          </div>
          <Badge className="hidden bg-ink text-cream md:inline-flex"><PackageCheck className="mr-2 h-3 w-3 text-lime" /> Same catalog logic</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {related.map((item, index) => <ProductCard key={item.id} product={item} index={index} compact />)}
        </div>
      </section>

      <div className="fixed inset-x-3 bottom-3 z-40 rounded-full border border-ink/10 bg-cream/90 p-2 shadow-soft backdrop-blur-2xl md:hidden">
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <div className="pl-4">
            <p className="text-xs font-black uppercase tracking-[.14em] text-ink/45">{size} · {color}</p>
            <p className="font-display text-2xl font-black tracking-[-.07em]">{formatPrice(product.price)}</p>
          </div>
          <Button variant="punch" onClick={handleAdd}><ShoppingBag className="mr-2 h-4 w-4" /> Add</Button>
        </div>
      </div>
    </div>
  );
}

function OptionBlock({ label, helper, children }: { label: string; helper: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between"><p className="text-sm font-black uppercase tracking-[.18em]">{label}</p><p className="text-sm text-ink/55">{helper}</p></div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
