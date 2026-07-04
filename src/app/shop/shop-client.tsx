'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { allCategories, allProducts, filterProducts, getAllColors, getAllMaterials, getAllSizes, shopFilterMeta } from '@/lib/products';
import { cn } from '@/lib/utils';
import type { ProductCategory, ProductFilters, ProductSort } from '@/types/product';

const defaultFilters = (initialCategory: ProductCategory | 'all'): ProductFilters => ({
  category: initialCategory,
  query: '',
  material: 'all',
  sizes: [],
  colors: [],
  priceBand: 'all',
  sort: 'featured',
  saleOnly: false,
  newOnly: false
});

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function ShopClient({ initialCategory = 'all' }: { initialCategory?: ProductCategory | 'all' }) {
  const [filters, setFilters] = useState<ProductFilters>(() => defaultFilters(initialCategory));
  const [view, setView] = useState<'editorial' | 'dense'>('editorial');

  const colors = useMemo(() => getAllColors(), []);
  const sizes = useMemo(() => getAllSizes(), []);
  const materials = useMemo(() => getAllMaterials().filter((item) => ['cotton', 'leather', 'suede', 'mesh', 'canvas', 'fleece', 'nylon', 'ripstop'].includes(item)), []);
  const filtered = useMemo(() => filterProducts(filters), [filters]);
  const categoryIntro = filters.category === 'all' ? null : allCategories.find((category) => category.id === filters.category);

  const activeFilterCount =
    Number(filters.category !== 'all') +
    Number(Boolean(filters.query)) +
    Number(filters.material !== 'all') +
    filters.sizes.length +
    filters.colors.length +
    Number(filters.priceBand !== 'all') +
    Number(filters.saleOnly) +
    Number(filters.newOnly);

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-ink text-cream shadow-soft">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-lime/20 blur-3xl" />
          <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Catalog experience</p>
              <h1 className="mt-4 font-display text-7xl font-black leading-[.82] tracking-[-.1em] md:text-9xl">Shop the full rotation.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/70">
                A richer boutique catalog with editorial category paths, advanced filters, sale/new toggles and product cards designed for quick discovery.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Link key={category.id} href={`/shop/${category.id}`} className="rounded-full border border-cream/15 bg-cream/10 px-4 py-2 text-sm font-black text-cream/75 transition hover:bg-lime hover:text-ink">
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative rounded-[2.4rem] border border-cream/10 bg-cream/10 p-5 backdrop-blur-xl">
              <div className="grid grid-cols-3 gap-3 text-center">
                <Metric value={allProducts.length.toString()} label="Products" />
                <Metric value={allCategories.length.toString()} label="Categories" />
                <Metric value={filtered.length.toString()} label="Visible" />
              </div>
              <div className="mt-4 rounded-4xl bg-lime p-4 text-ink">
                <p className="flex items-center gap-2 text-sm font-black"><Sparkles className="h-4 w-4" /> Test coupons in cart: DROP10 · FIT15 · FREESHIP</p>
              </div>
            </div>
          </div>
        </div>

        {categoryIntro && (
          <div className="mt-8 grid overflow-hidden rounded-[3rem] border border-ink/10 bg-white/35 shadow-card backdrop-blur-xl lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative min-h-[320px]">
              <Image src={categoryIntro.image} alt={categoryIntro.name} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Category focus</p>
              <h2 className="mt-3 font-display text-6xl font-black leading-[.86] tracking-[-.09em] md:text-8xl">{categoryIntro.name}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/64">{categoryIntro.description}</p>
              <Button asChild variant="outline" className="mt-6"><Link href="/shop">Reset to all products <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-[2.4rem] border border-ink/10 bg-cream/82 p-4 shadow-card backdrop-blur-2xl lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[.18em]"><SlidersHorizontal className="h-4 w-4" /> Filters</p>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters(defaultFilters('all'))} className="text-xs font-black text-punch hover:underline">
                  Clear {activeFilterCount}
                </button>
              )}
            </div>

            <label className="mt-5 flex items-center gap-3 rounded-full border border-ink/10 bg-white/55 px-5 py-3">
              <Search className="h-4 w-4 text-ink/45" />
              <input
                value={filters.query}
                onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
                placeholder="Search tees, sneakers, drops..."
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-ink/40"
              />
            </label>

            <div className="mt-5">
              <p className="mb-2 text-xs font-black uppercase tracking-[.18em] text-ink/55">Category</p>
              <div className="grid gap-2">
                <button onClick={() => setFilters((current) => ({ ...current, category: 'all' }))} className={cn('rounded-3xl border px-4 py-3 text-left text-sm font-black transition', filters.category === 'all' ? 'border-ink bg-ink text-cream' : 'border-ink/10 bg-white/45 hover:bg-white/80')}>All products</button>
                {allCategories.map((item) => (
                  <button key={item.id} onClick={() => setFilters((current) => ({ ...current, category: item.id }))} className={cn('rounded-3xl border px-4 py-3 text-left transition', filters.category === item.id ? 'border-ink bg-lime text-ink' : 'border-ink/10 bg-white/45 hover:bg-white/80')}>
                    <span className="block text-sm font-black">{item.name}</span>
                    <span className="mt-1 block text-xs text-ink/55">{item.heroCopy}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[.18em] text-ink/55">Material</span>
                <select value={filters.material} onChange={(event) => setFilters((current) => ({ ...current, material: event.target.value }))} className="w-full rounded-full border border-ink/10 bg-white/55 px-5 py-3 text-sm font-bold outline-none">
                  <option value="all">All materials</option>
                  {materials.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[.18em] text-ink/55">Price</span>
                <select value={filters.priceBand} onChange={(event) => setFilters((current) => ({ ...current, priceBand: event.target.value }))} className="w-full rounded-full border border-ink/10 bg-white/55 px-5 py-3 text-sm font-bold outline-none">
                  <option value="all">All prices</option>
                  {(shopFilterMeta.priceBands as Array<{ label: string }>).map((item) => <option key={item.label} value={item.label}>{item.label}</option>)}
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[.18em] text-ink/55">Sort</span>
                <select value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value as ProductSort }))} className="w-full rounded-full border border-ink/10 bg-white/55 px-5 py-3 text-sm font-bold outline-none">
                  <option value="featured">Featured</option>
                  <option value="new">Newest</option>
                  <option value="rating">Top rated</option>
                  <option value="low-stock">Low stock</option>
                  <option value="price-low">Price low</option>
                  <option value="price-high">Price high</option>
                </select>
              </label>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button onClick={() => setFilters((current) => ({ ...current, newOnly: !current.newOnly }))} className={cn('rounded-full border px-4 py-3 text-sm font-black transition', filters.newOnly ? 'border-ink bg-lime' : 'border-ink/10 bg-white/45')}>New drops</button>
              <button onClick={() => setFilters((current) => ({ ...current, saleOnly: !current.saleOnly }))} className={cn('rounded-full border px-4 py-3 text-sm font-black transition', filters.saleOnly ? 'border-ink bg-punch text-cream' : 'border-ink/10 bg-white/45')}>Sale only</button>
            </div>

            <FilterGroup title="Sizes" items={sizes} selected={filters.sizes} onToggle={(size) => setFilters((current) => ({ ...current, sizes: toggleValue(current.sizes, size) }))} activeClass="border-ink bg-ink text-cream" />
            <FilterGroup title="Colors" items={colors} selected={filters.colors} onToggle={(color) => setFilters((current) => ({ ...current, colors: toggleValue(current.colors, color) }))} activeClass="border-ink bg-cobalt text-cream" />
          </aside>

          <div>
            <div className="mb-5 flex flex-col justify-between gap-3 rounded-[2rem] border border-ink/10 bg-white/35 p-4 shadow-card backdrop-blur-xl md:flex-row md:items-center">
              <div>
                <p className="text-sm font-black">{filtered.length} products found</p>
                <p className="mt-1 text-xs text-ink/55">Direct category URLs: <Link className="font-bold text-cobalt" href="/shop/sneakers">/shop/sneakers</Link> · <Link className="font-bold text-cobalt" href="/shop/tees">/shop/tees</Link></p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setView('editorial')} className={cn('rounded-full px-3 py-2 text-xs font-black', view === 'editorial' ? 'bg-ink text-cream' : 'bg-cream text-ink/60')}>Editorial grid</button>
                <button onClick={() => setView('dense')} className={cn('rounded-full px-3 py-2 text-xs font-black', view === 'dense' ? 'bg-ink text-cream' : 'bg-cream text-ink/60')}>Dense grid</button>
              </div>
            </div>

            {activeFilterCount > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {filters.query && <Chip onRemove={() => setFilters((current) => ({ ...current, query: '' }))}>Search: {filters.query}</Chip>}
                {filters.material !== 'all' && <Chip onRemove={() => setFilters((current) => ({ ...current, material: 'all' }))}>{filters.material}</Chip>}
                {filters.priceBand !== 'all' && <Chip onRemove={() => setFilters((current) => ({ ...current, priceBand: 'all' }))}>{filters.priceBand}</Chip>}
                {filters.sizes.map((size) => <Chip key={size} onRemove={() => setFilters((current) => ({ ...current, sizes: toggleValue(current.sizes, size) }))}>Size {size}</Chip>)}
                {filters.colors.map((color) => <Chip key={color} onRemove={() => setFilters((current) => ({ ...current, colors: toggleValue(current.colors, color) }))}>{color}</Chip>)}
              </div>
            )}

            <div className={cn('grid gap-6', view === 'dense' ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-2 xl:grid-cols-3')}>
              {filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} compact={view === 'dense'} />)}
            </div>

            {filtered.length === 0 && (
              <div className="my-20 rounded-5xl border border-ink/10 bg-white/35 p-12 text-center shadow-card">
                <h2 className="font-display text-5xl font-black tracking-[-.08em]">No products found.</h2>
                <p className="mt-3 text-ink/60">Try another search, category, color, size or material.</p>
                <Button variant="punch" className="mt-6" onClick={() => setFilters(defaultFilters('all'))}>Reset filters</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-4xl bg-cream/10 p-4">
      <p className="font-display text-4xl font-black tracking-[-.07em]">{value}</p>
      <p className="text-xs font-bold uppercase tracking-[.16em] text-cream/55">{label}</p>
    </div>
  );
}

function FilterGroup({ title, items, selected, onToggle, activeClass }: { title: string; items: string[]; selected: string[]; onToggle: (value: string) => void; activeClass: string }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-black uppercase tracking-[.18em] text-ink/55">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button key={item} onClick={() => onToggle(item)} className={cn('rounded-full border px-3 py-2 text-xs font-black transition', selected.includes(item) ? activeClass : 'border-ink/10 bg-white/45 hover:bg-white/80')}>{item}</button>
        ))}
      </div>
    </div>
  );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <button onClick={onRemove} className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-black text-cream">
      <Check className="h-3 w-3 text-lime" /> {children} <X className="h-3 w-3" />
    </button>
  );
}
