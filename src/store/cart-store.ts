'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCouponDiscount, getShipping, getTax, type DeliveryMethod } from '@/lib/commerce';
import type { CartItem, Product } from '@/types/product';

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, options?: { size?: string; color?: string; quantity?: number }) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: () => number;
  discount: () => number;
  shipping: (deliveryMethod?: DeliveryMethod) => number;
  tax: (deliveryMethod?: DeliveryMethod) => number;
  total: (deliveryMethod?: DeliveryMethod) => number;
  count: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, options) => {
        const size = options?.size ?? product.sizes[0];
        const color = options?.color ?? product.colors[0];
        const quantity = options?.quantity ?? 1;
        const current = get().items;
        const existing = current.find((item) => item.product.id === product.id && item.size === size && item.color === color);

        if (existing) {
          set({
            items: current.map((item) =>
              item.product.id === product.id && item.size === size && item.color === color
                ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                : item
            ),
            isOpen: true
          });
          return;
        }

        set({ items: [...current, { product, size, color, quantity: Math.min(quantity, product.stock) }], isOpen: true });
      },
      removeItem: (id, size, color) =>
        set({ items: get().items.filter((item) => !(item.product.id === id && item.size === size && item.color === color)) }),
      updateQuantity: (id, size, color, quantity) => {
        if (quantity < 1) return get().removeItem(id, size, color);
        set({
          items: get().items.map((item) =>
            item.product.id === id && item.size === size && item.color === color
              ? { ...item, quantity: Math.min(quantity, item.product.stock) }
              : item
          )
        });
      },
      clearCart: () => set({ items: [], couponCode: null }),
      applyCoupon: (code) => {
        const result = getCouponDiscount(code, get().subtotal());
        if (!result) return false;
        set({ couponCode: result.code });
        return true;
      },
      removeCoupon: () => set({ couponCode: null }),
      subtotal: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
      discount: () => {
        const code = get().couponCode;
        if (!code) return 0;
        return getCouponDiscount(code, get().subtotal())?.amount ?? 0;
      },
      shipping: (deliveryMethod: DeliveryMethod = 'standard') => {
        const code = get().couponCode;
        const coupon = code ? getCouponDiscount(code, get().subtotal()) : null;
        return getShipping(get().subtotal(), Boolean(coupon?.freeShipping), deliveryMethod);
      },
      tax: (deliveryMethod: DeliveryMethod = 'standard') => {
        const taxable = Math.max(0, get().subtotal() - get().discount()) + get().shipping(deliveryMethod);
        return getTax(taxable);
      },
      total: (deliveryMethod: DeliveryMethod = 'standard') => Math.max(0, get().subtotal() - get().discount() + get().shipping(deliveryMethod) + get().tax(deliveryMethod)),
      count: () => get().items.reduce((total, item) => total + item.quantity, 0)
    }),
    { name: 'seam-and-sole-cart' }
  )
);
