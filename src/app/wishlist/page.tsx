'use client';

import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/lib/products';
import { useWishlistStore } from '@/store/wishlist-store';

export default function WishlistPage() {
  const ids = useWishlistStore((state) => state.ids);
  const clear = useWishlistStore((state) => state.clear);
  const products = allProducts.filter((product) => ids.includes(product.id));

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[3rem] bg-ink p-8 text-cream shadow-soft md:p-12">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.24em] text-lime"><Heart className="h-4 w-4 fill-current" /> Wishlist</p>
          <h1 className="mt-4 font-display text-7xl font-black leading-[.82] tracking-[-.1em] md:text-9xl">Saved rotation.</h1>
          <p className="mt-6 max-w-2xl text-cream/65">Persisted wishlist state for product discovery, later styling and return visits.</p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[3rem] border border-ink/10 bg-white/35 p-12 text-center shadow-card">
            <h2 className="font-display text-5xl font-black tracking-[-.08em]">No saved pieces yet.</h2>
            <p className="mt-3 text-ink/60">Heart a tee, sneaker, hoodie or accessory to keep it here.</p>
            <Button asChild variant="punch" className="mt-6"><Link href="/shop">Discover products</Link></Button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between rounded-5xl border border-ink/10 bg-white/35 p-4 shadow-card backdrop-blur-xl">
              <p className="text-sm font-black">{products.length} saved products</p>
              <Button variant="outline" onClick={clear}><Trash2 className="mr-2 h-4 w-4" /> Clear wishlist</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
