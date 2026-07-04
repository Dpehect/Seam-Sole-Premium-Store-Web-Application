'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { allProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const quickTerms = ['graphic tee', 'runner', 'low stock', 'hoodie', 'cream', 'drop'];

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return allProducts.slice(0, 6);
    return allProducts
      .filter((product) =>
        [product.name, product.category, product.collection, product.description, product.fit, ...product.colors, ...product.materials, ...product.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 8);
  }, [query]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-ink/55 backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-24 z-[91] w-[min(92vw,760px)] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-cream/20 bg-cream shadow-soft outline-none">
          <Dialog.Title className="sr-only">Search the Seam & Sole catalog</Dialog.Title>
          <Dialog.Description className="sr-only">Search t-shirts, sneakers, drops, colors and materials.</Dialog.Description>
          <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
            <Search className="h-5 w-5 text-ink/45" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tees, sneakers, drops, colors..."
              className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-ink/35"
            />
            <Dialog.Close asChild>
              <Button size="sm" variant="ghost" aria-label="Close search"><X className="h-4 w-4" /></Button>
            </Dialog.Close>
          </div>

          <div className="border-b border-ink/10 px-5 py-4">
            <p className="text-xs font-black uppercase tracking-[.18em] text-ink/40">Quick searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickTerms.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-ink/10 bg-white/45 px-3 py-2 text-xs font-black uppercase tracking-[.12em] text-ink/65 transition hover:border-ink hover:text-ink"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[55vh] overflow-y-auto p-3">
            {results.length === 0 ? (
              <div className="rounded-[1.5rem] bg-white/50 p-8 text-center">
                <p className="font-display text-3xl font-black tracking-[-.06em]">No products found.</p>
                <p className="mt-2 text-sm text-ink/55">Try “runner”, “tee”, “cream” or open the full shop.</p>
              </div>
            ) : (
              <div className="grid gap-2">
                {results.map((product, index) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="grid grid-cols-[76px_1fr_auto] items-center gap-4 rounded-[1.35rem] p-2 transition hover:bg-white/70"
                    >
                      <div className="relative h-20 overflow-hidden rounded-3xl bg-ink/5">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-display text-xl font-black tracking-[-.05em]">{product.name}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-[.14em] text-ink/42">{product.collection} · {product.category}</p>
                      </div>
                      <p className="rounded-full bg-ink px-3 py-2 text-sm font-black text-lime">{formatPrice(product.price)}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-ink/10 px-5 py-4 text-xs font-black uppercase tracking-[.16em] text-ink/45">
            <span>Command search</span>
            <Link href="/shop" onClick={() => onOpenChange(false)} className="text-ink hover:text-punch">Open full shop</Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
