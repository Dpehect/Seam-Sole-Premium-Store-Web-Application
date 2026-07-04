import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { siteContent } from '@/lib/site-content';

export function Footer() {
  const brand = siteContent.brand;
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="font-display text-5xl font-black tracking-[-.08em]">{brand.name}</div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-cream/70">
            {brand.footerDescription}
          </p>
          <Link href="/admin" className="mt-6 inline-flex items-center rounded-full bg-lime px-5 py-3 text-sm font-black text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-cream">
            <LockKeyhole className="mr-2 h-4 w-4" /> Open Admin Panel
          </Link>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[.18em] text-lime">Shop</h3>
          <div className="mt-4 grid gap-3 text-sm text-cream/70">
            <Link href="/shop">All Products</Link>
            <Link href="/drops">New Drops</Link>
            <Link href="/lookbook">Lookbook</Link>
            <Link href="/fit-studio">Fit Studio</Link>
            <Link href="/admin">Admin Panel Login</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[.18em] text-lime">Support</h3>
          <div className="mt-4 grid gap-3 text-sm text-cream/70">
            <Link href="/contact">Contact</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[.18em] text-lime">Drop Alerts</h3>
          <p className="mt-4 text-sm leading-7 text-cream/70">Get new-drop notes, styling ideas and early access to limited product rotations.</p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs uppercase tracking-[.18em] text-cream/50">
        {brand.footerStatus}
      </div>
    </footer>
  );
}
