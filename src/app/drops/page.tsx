import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Clock3, Flame, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';
import { allCollections, allProducts } from '@/lib/products';

const dropStats = [
  ['08', 'Curated releases'],
  ['30', 'Catalog products'],
  ['03', 'Active coupons'],
  ['24h', 'City courier option']
];

export const metadata = {
  title: 'Drops | Seam & Sole',
  description: 'Release calendar for Seam & Sole tees, sneakers, hoodies and accessories.'
};

export default function DropsPage() {
  const newProducts = allProducts.filter((item) => item.isNew);

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-punch p-8 text-cream shadow-soft md:p-12">
          <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop" alt="Drop campaign" fill priority sizes="100vw" className="object-cover opacity-28" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(201,255,60,.32),transparent_28%),linear-gradient(180deg,rgba(255,78,91,.2),rgba(18,16,14,.78))]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_.58fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Release calendar</p>
              <h1 className="mt-4 max-w-5xl font-display text-7xl font-black leading-[.78] tracking-[-.11em] md:text-[9rem]">Drop calendar.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/78">A campaign-ready release page for tees and sneakers: editorial launch cards, collection timelines, new-arrival rails and shoppable storytelling.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-[2.4rem] border border-cream/15 bg-cream/10 p-4 backdrop-blur-xl">
              {dropStats.map(([value, label]) => (
                <div key={label} className="rounded-4xl bg-cream/10 p-4 text-center">
                  <p className="font-display text-5xl font-black tracking-[-.08em] text-lime">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[.16em] text-cream/60">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {allCollections.map((collection, index) => {
            const collectionProducts = allProducts.filter((item) => item.collection === collection.name);
            const product = collectionProducts[0] ?? allProducts[index];
            const status = collection.release.includes('July') ? 'Upcoming' : collection.release.includes('Always') || collection.release.includes('Ongoing') ? 'Always on' : 'Live now';
            return (
              <article key={collection.slug} className="group relative min-h-[540px] overflow-hidden rounded-[3.5rem] bg-ink p-7 text-cream shadow-soft">
                <Image src={product.images[0]} alt={collection.name} fill sizes="50vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/44 to-transparent" />
                <div className="relative flex h-full min-h-[480px] flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-max rounded-full px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-ink" style={{ background: collection.accent }}>Drop 0{index + 1}</div>
                    <div className="rounded-full border border-cream/15 bg-cream/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] backdrop-blur-xl">{status}</div>
                  </div>
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-cream/72"><CalendarDays className="h-3.5 w-3.5" /> {collection.release}</span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-cream/72"><PackageCheck className="h-3.5 w-3.5" /> {collectionProducts.length || 1} pieces</span>
                    </div>
                    <h2 className="font-display text-6xl font-black leading-[.82] tracking-[-.09em] md:text-7xl">{collection.name}</h2>
                    <p className="mt-4 max-w-md text-cream/70">{collection.tagline}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button asChild variant="lime"><Link href={`/shop?collection=${collection.slug}`}>Shop release <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
                      <Button asChild variant="outline" className="border-cream/20 bg-cream/10 text-cream hover:bg-cream hover:text-ink"><Link href="/lookbook">Editorial view</Link></Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <div className="rounded-[3.5rem] bg-ink p-8 text-cream shadow-soft md:p-10">
            <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Launch mechanics</p>
            <h2 className="mt-4 font-display text-6xl font-black leading-[.84] tracking-[-.09em]">Built for hype without breaking usability.</h2>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Flame, label: 'Hero-first collection cards' },
                { icon: Clock3, label: 'Release and product count metadata' },
                { icon: PackageCheck, label: 'New-arrival commerce rail' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4 rounded-4xl bg-cream/10 p-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-lime text-ink"><Icon className="h-5 w-5" /></div>
                    <p className="font-display text-3xl font-black tracking-[-.07em]">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Fresh inventory</p>
                <h2 className="mt-2 font-display text-6xl font-black tracking-[-.09em]">New in rotation.</h2>
              </div>
              <Button asChild variant="outline"><Link href="/shop">Shop all</Link></Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {newProducts.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} compact />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
