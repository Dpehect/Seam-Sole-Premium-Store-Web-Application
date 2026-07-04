'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistStore = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
  count: () => number;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set({ ids: get().ids.includes(id) ? get().ids.filter((item) => item !== id) : [...get().ids, id] }),
      has: (id) => get().ids.includes(id),
      remove: (id) => set({ ids: get().ids.filter((item) => item !== id) }),
      clear: () => set({ ids: [] }),
      count: () => get().ids.length
    }),
    { name: 'seam-and-sole-wishlist' }
  )
);
