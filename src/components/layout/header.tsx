'use client';

import Link from 'next/link';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { SearchCommand } from '@/components/common/search-command';
import { siteContent } from '@/lib/site-content';

const nav = [
  { href: '/shop', label: 'Shop' },
  { href: '/drops', label: 'Drops' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/fit-studio', label: 'Fit Studio' },
  { href: '/style-quiz', label: 'Fit Quiz' }
];

export function Header() {
  const brand = siteContent.brand;
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const count = useCartStore((state) => state.count());
  const wishlistCount = useWishlistStore((state) => state.count());
  const openCart = useCartStore((state) => state.openCart);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-ink/10 bg-cream/70 px-4 py-3 shadow-card backdrop-blur-2xl">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-black text-lime">{brand.shortName}</span>
            <span className="font-display text-lg font-black tracking-[-.04em]">{brand.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-bold text-ink/70 transition hover:bg-ink/5 hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </Button>
            <Button asChild variant="ghost" size="sm" aria-label="Wishlist" className="relative hidden md:inline-flex">
              <Link href="/wishlist"><Heart className="h-4 w-4" />{wishlistCount > 0 && <span className="ml-2 rounded-full bg-lime px-2 py-0.5 text-[10px] font-black text-ink">{wishlistCount}</span>}</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={openCart} aria-label="Open cart" className="relative">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && <span className="ml-2 rounded-full bg-punch px-2 py-0.5 text-[10px] font-black text-cream">{count}</span>}
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-3 max-w-7xl rounded-4xl border border-ink/10 bg-cream/95 p-4 shadow-soft backdrop-blur-2xl md:hidden"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-3xl px-4 py-4 font-display text-3xl font-black tracking-[-.06em] hover:bg-ink/5">
                {item.label}
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setOpen(false)} className="block rounded-3xl px-4 py-4 font-display text-3xl font-black tracking-[-.06em] hover:bg-ink/5">Wishlist</Link>
          </motion.div>
        )}
      </header>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer />
    </>
  );
}
