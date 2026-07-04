'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FREE_SHIPPING_THRESHOLD, getFreeShippingProgress } from '@/lib/commerce';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, discount, shipping, tax, total } = useCartStore();
  const progress = getFreeShippingProgress(subtotal());
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal());

  return (
    <Dialog.Root open={isOpen} onOpenChange={(value) => !value && closeCart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-3 top-3 z-[90] flex h-[calc(100vh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-md flex-col overflow-hidden rounded-5xl border border-ink/10 bg-cream shadow-soft md:right-5 md:top-5 md:h-[calc(100vh-2.5rem)]">
          <div className="flex items-center justify-between border-b border-ink/10 p-5">
            <Dialog.Title className="font-display text-3xl font-black tracking-[-.07em]">Your rotation</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm"><X className="h-5 w-5" /></Button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <p className="font-display text-4xl font-black tracking-[-.07em]">Cart is empty.</p>
                  <p className="mt-3 text-sm text-ink/60">Add a tee, a sneaker, then build the fit.</p>
                  <Button asChild className="mt-6" onClick={closeCart}><Link href="/shop">Start shopping</Link></Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="rounded-4xl bg-white/45 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[.16em] text-ink/55">
                    <span>Free shipping</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-lime" style={{ width: `${progress}%` }} /></div>
                  <p className="mt-2 text-xs font-bold text-ink/50">{remaining === 0 ? 'Unlocked.' : `${formatPrice(remaining)} away.`}</p>
                </div>

                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid grid-cols-[92px_1fr] gap-4 rounded-4xl bg-white/45 p-3">
                    <div className="relative h-28 overflow-hidden rounded-3xl bg-fog">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="120px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-bold leading-tight">{item.product.name}</p>
                          <p className="mt-1 text-xs text-ink/55">{item.color} · {item.size}</p>
                        </div>
                        <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-ink/40 hover:text-punch"><X className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-ink/10 bg-cream">
                          <button className="p-2" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}><Minus className="h-3 w-3" /></button>
                          <span className="min-w-8 text-center text-sm font-black">{item.quantity}</span>
                          <button className="p-2" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}><Plus className="h-3 w-3" /></button>
                        </div>
                        <p className="font-black">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-ink/10 p-5">
              <div className="mb-4 grid gap-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><strong>{formatPrice(subtotal())}</strong></div>
                {discount() > 0 && <div className="flex justify-between text-punch"><span>Discount</span><strong>-{formatPrice(discount())}</strong></div>}
                <div className="flex justify-between"><span>Shipping</span><strong>{shipping() === 0 ? 'Free' : formatPrice(shipping())}</strong></div>
                <div className="flex justify-between"><span>Estimated tax</span><strong>{formatPrice(tax())}</strong></div>
                <div className="flex justify-between text-lg font-black"><span>Total</span><span>{formatPrice(total())}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" onClick={closeCart}><Link href="/cart">View cart</Link></Button>
                <Button asChild variant="punch" onClick={closeCart}><Link href="/checkout">Checkout</Link></Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
