'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Mail, MapPin, PackageCheck, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDeliveryOption } from '@/lib/commerce';
import { formatPrice } from '@/lib/utils';
import { useOrderStore } from '@/store/order-store';

export default function OrderSuccessPage() {
  const lastOrder = useOrderStore((state) => state.lastOrder);

  if (!lastOrder) {
    return (
      <div className="grid min-h-screen place-items-center px-5 pt-24">
        <div className="max-w-3xl rounded-[3rem] border border-ink/10 bg-white/40 p-10 text-center shadow-soft backdrop-blur-xl md:p-16">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lime"><CheckCircle2 className="h-10 w-10" /></div>
          <h1 className="mt-8 font-display text-7xl font-black leading-[.85] tracking-[-.1em]">Order flow ready.</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-ink/65">No recent order is stored in this browser session. Add products and run through checkout to see the full order receipt.</p>
          <Button asChild variant="punch" size="lg" className="mt-8"><Link href="/shop">Build a cart</Link></Button>
        </div>
      </div>
    );
  }

  const delivery = getDeliveryOption(lastOrder.deliveryMethod);
  const created = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(lastOrder.createdAt));
  const addressLine = [lastOrder.shippingAddress.address, lastOrder.shippingAddress.apartment, lastOrder.shippingAddress.city, lastOrder.shippingAddress.state, lastOrder.shippingAddress.postalCode].filter(Boolean).join(', ');

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[3rem] bg-ink p-8 text-cream shadow-soft md:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime/30 blur-3xl" />
          <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-punch/30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="grid h-20 w-20 place-items-center rounded-full bg-lime text-ink"><CheckCircle2 className="h-10 w-10" /></div>
              <p className="mt-8 text-xs font-black uppercase tracking-[.24em] text-lime">Order confirmed</p>
              <h1 className="mt-4 font-display text-7xl font-black leading-[.85] tracking-[-.1em] md:text-9xl">Order locked.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/65">Your checkout saves a receipt-style order snapshot with customer info, shipping, payment type, ETA and totals.</p>
            </div>
            <div className="grid content-end gap-4">
              <div className="rounded-[2rem] border border-cream/10 bg-cream/10 p-5">
                <p className="text-xs font-black uppercase tracking-[.2em] text-cream/50">Order number</p>
                <p className="mt-2 font-display text-5xl font-black tracking-[-.08em] text-lime">{lastOrder.orderNumber}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-black">
                <div className="rounded-4xl bg-cream/10 p-4"><PackageCheck className="mb-3 h-5 w-5 text-lime" /> {created}</div>
                <div className="rounded-4xl bg-cream/10 p-4"><Truck className="mb-3 h-5 w-5 text-lime" /> {lastOrder.deliveryEta}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4">
            <div className="rounded-[3rem] border border-ink/10 bg-white/40 p-6 shadow-card backdrop-blur-xl md:p-8">
              <div className="mb-6 flex items-center gap-3"><Sparkles className="h-5 w-5 text-punch" /><h2 className="font-display text-4xl font-black tracking-[-.08em]">Pieces in this rotation</h2></div>
              <div className="grid gap-4">
                {lastOrder.items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid gap-4 rounded-5xl bg-white/55 p-4 md:grid-cols-[120px_1fr_auto]">
                    <div className="relative h-36 overflow-hidden rounded-4xl bg-fog">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="150px" className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-black uppercase tracking-[.18em] text-punch">{item.product.category}</p>
                      <h3 className="mt-2 font-display text-3xl font-black tracking-[-.07em]">{item.product.name}</h3>
                      <p className="mt-2 text-sm text-ink/55">{item.color} · {item.size} · Quantity {item.quantity}</p>
                    </div>
                    <strong className="self-center text-lg">{formatPrice(item.product.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[3rem] border border-ink/10 bg-cream/85 p-6 shadow-soft backdrop-blur-xl lg:sticky lg:top-32">
            <h2 className="font-display text-4xl font-black tracking-[-.08em]">Receipt</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <Info icon={<Mail className="h-4 w-4" />} label="Confirmation" value={`${lastOrder.customer.email}`} />
              <Info icon={<MapPin className="h-4 w-4" />} label="Ship to" value={addressLine} />
              <Info icon={<Truck className="h-4 w-4" />} label="Delivery" value={`${delivery.title} · ${delivery.eta}`} />
            </div>

            {lastOrder.giftNote && (
              <div className="mt-5 rounded-4xl bg-white/50 p-4 text-sm leading-7 text-ink/65">
                <strong className="text-ink">Gift note:</strong> {lastOrder.giftNote}
              </div>
            )}

            <div className="mt-6 grid gap-3 border-t border-ink/10 pt-5 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><strong>{formatPrice(lastOrder.totals.subtotal)}</strong></div>
              <div className="flex justify-between text-punch"><span>Discount</span><strong>-{formatPrice(lastOrder.totals.discount)}</strong></div>
              <div className="flex justify-between"><span>Shipping</span><strong>{lastOrder.totals.shipping === 0 ? 'Free' : formatPrice(lastOrder.totals.shipping)}</strong></div>
              <div className="flex justify-between"><span>Estimated tax</span><strong>{formatPrice(lastOrder.totals.tax)}</strong></div>
              <div className="flex justify-between border-t border-ink/10 pt-4 text-xl"><span>Total</span><strong>{formatPrice(lastOrder.totals.total)}</strong></div>
            </div>

            <div className="mt-6 grid gap-3">
              <Button asChild variant="punch" size="lg"><Link href="/shop">Continue shopping</Link></Button>
              <Button asChild variant="outline"><Link href="/lookbook">Explore lookbook</Link></Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-4xl bg-white/50 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-ink/45">{icon}{label}</div>
      <p className="font-bold leading-6 text-ink/70">{value}</p>
    </div>
  );
}
