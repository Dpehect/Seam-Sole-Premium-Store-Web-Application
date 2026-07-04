'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, BadgeCheck, PackageCheck, ShieldCheck, Truck, type LucideIcon } from 'lucide-react';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { Button } from '@/components/ui/button';
import { FREE_SHIPPING_THRESHOLD, getFreeShippingProgress, type DeliveryMethod } from '@/lib/commerce';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

const trustSignals: Array<[string, LucideIcon]> = [
  ['Variant-aware cart', BadgeCheck],
  ['No real payment keys', ShieldCheck],
  ['Order snapshot saved', PackageCheck],
  ['Delivery ETA preview', Truck]
];

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const shipping = useCartStore((state) => state.shipping(deliveryMethod));
  const tax = useCartStore((state) => state.tax(deliveryMethod));
  const total = useCartStore((state) => state.total(deliveryMethod));
  const couponCode = useCartStore((state) => state.couponCode);
  const progress = getFreeShippingProgress(subtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <Link href="/cart" className="mb-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[.16em] text-ink/55 transition hover:text-punch">
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </Link>

        <div className="mb-10 overflow-hidden rounded-[3rem] bg-ink text-cream shadow-soft">
          <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Secure checkout</p>
              <h1 className="mt-4 font-display text-7xl font-black leading-[.82] tracking-[-.1em] md:text-9xl">Final fit check.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/65">A polished boutique checkout with delivery selection, tax calculation, payment details and a saved order snapshot for the success screen.</p>
            </div>
            <div className="grid content-end gap-3">
              {trustSignals.map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-3 rounded-full border border-cream/10 bg-cream/10 px-4 py-3 text-sm font-black">
                  <Icon className="h-4 w-4 text-lime" /> {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[3rem] border border-ink/10 bg-white/35 p-12 text-center shadow-card">
            <h2 className="font-display text-5xl font-black tracking-[-.08em]">Your cart is empty.</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">Add a tee, sneaker or accessory first. Checkout activates once your rotation has products.</p>
            <Button asChild variant="punch" className="mt-6"><Link href="/shop">Shop first</Link></Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px]">
            <CheckoutForm onDeliveryChange={setDeliveryMethod} />
            <aside className="h-fit rounded-[3rem] border border-ink/10 bg-cream/85 p-6 shadow-soft backdrop-blur-xl lg:sticky lg:top-32">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.2em] text-punch">Live summary</p>
                  <h2 className="mt-2 font-display text-4xl font-black tracking-[-.08em]">Your order</h2>
                </div>
                <span className="rounded-full bg-lime px-3 py-1 text-xs font-black">{items.length} lines</span>
              </div>

              <div className="mt-6 rounded-4xl bg-white/45 p-4">
                <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[.16em] text-ink/55">
                  <span>Free standard shipping</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-lime transition-all" style={{ width: `${progress}%` }} /></div>
                <p className="mt-2 text-xs font-bold text-ink/55">{remaining === 0 ? 'Unlocked for standard delivery.' : `${formatPrice(remaining)} away from free standard delivery.`}</p>
              </div>

              <div className="mt-6 grid max-h-[380px] gap-4 overflow-y-auto pr-1 scrollbar-hide">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid grid-cols-[76px_1fr_auto] gap-3 rounded-4xl bg-white/45 p-3">
                    <div className="relative h-20 overflow-hidden rounded-3xl bg-fog"><Image src={item.product.images[0]} alt={item.product.name} fill sizes="90px" className="object-cover" /></div>
                    <div><p className="font-bold leading-tight">{item.product.name}</p><p className="mt-1 text-xs text-ink/55">{item.color} · {item.size} · x{item.quantity}</p></div>
                    <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 border-t border-ink/10 pt-5 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                <div className="flex justify-between text-punch"><span>Discount {couponCode ? `(${couponCode})` : ''}</span><strong>-{formatPrice(discount)}</strong></div>
                <div className="flex justify-between"><span>Shipping</span><strong>{shipping === 0 ? 'Free' : formatPrice(shipping)}</strong></div>
                <div className="flex justify-between"><span>Estimated tax</span><strong>{formatPrice(tax)}</strong></div>
                <div className="flex justify-between border-t border-ink/10 pt-4 text-xl"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              </div>

              <div className="mt-6 rounded-4xl bg-ink p-4 text-sm leading-7 text-cream/70">
                <strong className="text-lime">Secure by design:</strong> payment details are not stored by this checkout screen.
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
