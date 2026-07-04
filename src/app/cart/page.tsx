'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, Trash2, Ticket, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FREE_SHIPPING_THRESHOLD, getFreeShippingProgress } from '@/lib/commerce';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, discount, shipping, tax, total, couponCode, applyCoupon, removeCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const progress = getFreeShippingProgress(subtotal());
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal());

  function handleCoupon() {
    const ok = applyCoupon(couponInput);
    if (ok) {
      toast.success(`${couponInput.toUpperCase()} applied`);
      setCouponInput('');
      return;
    }
    toast.error('Coupon needs a higher subtotal or is not valid');
  }

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[3rem] bg-ink p-8 text-cream shadow-soft md:p-12">
          <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Shopping bag</p>
          <h1 className="mt-4 font-display text-7xl font-black leading-[.82] tracking-[-.1em] md:text-9xl">Your rotation.</h1>
          <p className="mt-6 max-w-2xl text-cream/65">Review selected pieces, apply available codes, preview tax and track free-shipping progress.</p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[3rem] border border-ink/10 bg-white/35 p-12 text-center shadow-card">
            <h2 className="font-display text-5xl font-black tracking-[-.08em]">No pieces yet.</h2>
            <p className="mt-3 text-ink/60">Start with a statement tee or a sneaker and build from there.</p>
            <Button asChild variant="punch" className="mt-6"><Link href="/shop">Shop products</Link></Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid gap-4 rounded-5xl border border-ink/10 bg-white/35 p-4 shadow-card backdrop-blur-xl md:grid-cols-[150px_1fr_auto]">
                  <div className="relative h-44 overflow-hidden rounded-4xl bg-fog">
                    <Image src={item.product.images[0]} alt={item.product.name} fill sizes="180px" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2">
                      {item.product.isNew && <span className="rounded-full bg-lime px-3 py-1 text-xs font-black">New</span>}
                      {item.product.oldPrice && <span className="rounded-full bg-punch px-3 py-1 text-xs font-black text-cream">Sale</span>}
                    </div>
                    <h2 className="mt-3 font-display text-4xl font-black tracking-[-.08em]">{item.product.name}</h2>
                    <p className="mt-2 text-sm text-ink/55">{item.color} · {item.size} · {item.product.collection}</p>
                    <p className="mt-4 font-black">{formatPrice(item.product.price)} each</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 md:flex-col md:items-end">
                    <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="rounded-full border border-ink/10 p-3 text-ink/45 transition hover:bg-punch hover:text-cream"><Trash2 className="h-4 w-4" /></button>
                    <div className="flex items-center rounded-full border border-ink/10 bg-cream">
                      <button className="p-3" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}><Minus className="h-4 w-4" /></button>
                      <span className="min-w-10 text-center font-black">{item.quantity}</span>
                      <button className="p-3" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}><Plus className="h-4 w-4" /></button>
                    </div>
                    <p className="font-black">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-[3rem] border border-ink/10 bg-cream/80 p-6 shadow-soft backdrop-blur-xl lg:sticky lg:top-32">
              <h2 className="font-display text-4xl font-black tracking-[-.08em]">Order summary</h2>

              <div className="mt-5 rounded-4xl bg-white/45 p-4">
                <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[.16em] text-ink/55">
                  <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free shipping</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-lime transition-all" style={{ width: `${progress}%` }} /></div>
                <p className="mt-2 text-xs font-bold text-ink/55">{remaining === 0 ? 'Free shipping unlocked.' : `${formatPrice(remaining)} away from free shipping.`}</p>
              </div>

              <div className="mt-5 rounded-4xl border border-ink/10 bg-white/45 p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-black"><Ticket className="h-4 w-4 text-punch" /> Coupon</p>
                {couponCode ? (
                  <div className="flex items-center justify-between rounded-full bg-lime px-4 py-3 text-sm font-black">
                    <span>{couponCode}</span>
                    <button onClick={removeCoupon} className="text-punch">Remove</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <input value={couponInput} onChange={(event) => setCouponInput(event.target.value)} placeholder="DROP10" className="rounded-full border border-ink/10 bg-cream px-4 py-3 text-sm font-bold uppercase outline-none" />
                    <Button onClick={handleCoupon} variant="lime">Apply</Button>
                  </div>
                )}
                <p className="mt-3 text-xs text-ink/50">Try DROP10 over $100, FIT15 over $180 or FREESHIP over $50.</p>
              </div>

              <div className="mt-6 grid gap-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><strong>{formatPrice(subtotal())}</strong></div>
                <div className="flex justify-between"><span>Discount</span><strong>-{formatPrice(discount())}</strong></div>
                <div className="flex justify-between"><span>Shipping</span><strong>{shipping() === 0 ? 'Free' : formatPrice(shipping())}</strong></div>
                <div className="flex justify-between"><span>Estimated tax</span><strong>{formatPrice(tax())}</strong></div>
                <div className="flex justify-between border-t border-ink/10 pt-4 text-xl"><span>Total</span><strong>{formatPrice(total())}</strong></div>
              </div>
              <Button asChild variant="punch" size="lg" className="mt-6 w-full"><Link href="/checkout">Go to checkout</Link></Button>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
