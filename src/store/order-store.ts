'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderSnapshot } from '@/types/order';

type OrderStore = {
  lastOrder: OrderSnapshot | null;
  setLastOrder: (order: OrderSnapshot) => void;
  clearLastOrder: () => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      lastOrder: null,
      setLastOrder: (order) => set({ lastOrder: order }),
      clearLastOrder: () => set({ lastOrder: null })
    }),
    { name: 'seam-and-sole-last-order' }
  )
);
