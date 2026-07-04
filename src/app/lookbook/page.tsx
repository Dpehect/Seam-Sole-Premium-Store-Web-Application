import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, MousePointer2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';
import { allLookbooks, allProducts } from '@/lib/products';

export const metadata = {
  title: 'Lookbook | Seam & Sole',
  description: 'Interactive outfit editorials with product hotspots, page-turn styling and shop-the-fit moments.'
};

export default function LookbookPage() {
  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_.48fr]">
          <div className="relative min-h-[620px] overflow-hidden rounded-[3.5rem] bg-ink p-8 text-cream shadow-soft md:p-12">
            <Image src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop" alt="Fashion lookbook cover" fill priority sizes="70vw" className="object-cover opacity-55" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(201,255,60,.34),transparent_28%),linear-gradient(180deg,rgba(18,16,14,.05),rgba(18,16,14,.9))]" />
            <div className="relative flex min-h-[520px] flex-col justify-end">
              <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Magazine system</p>
              <h1 className="mt-4 max-w-5xl font-display text-7xl font-black leading-[.78] tracking-[-.11em] md:text-[9.5rem]">Outfit editorials.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/72">Magazine-style stories combine campaign imagery, outfit hotspots and direct shop-the-fit conversion for the t-shirt and sneaker catalog.</p>
            </div>
          </div>
          <aside className="grid gap-4">
            {[
              { icon: BookOpen, title: 'Page-turn reader', text: 'Each editorial now opens into a full magazine-style story.' },
              { icon: MousePointer2, title: 'Hotspot shopping', text: 'Tap outfit markers to jump straight into product pages.' },
              { icon: Sparkles, title: 'Campaign rhythm', text: 'Visual storytelling is tied to actual catalog products.' }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-5xl border border-ink/10 bg-white/35 p-6 shadow-card backdrop-blur-xl">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-lime"><Icon className="h-5 w-5" /></div>
                  <h2 className="mt-8 font-display text-4xl font-black tracking-[-.08em]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-ink/60">{item.text}</p>
                </div>
              );
            })}
          </aside>
        </div>

        <div className="mt-10 grid gap-8">
          {allLookbooks.map((story, index) => {
            const products = allProducts.filter((product) => story.products.includes(product.slug));
            return (
              <article key={story.slug} className="overflow-hidden rounded-[3.5rem] border border-ink/10 bg-white/35 shadow-soft backdrop-blur-xl">
                <div className="grid lg:grid-cols-[1fr_.82fr]">
                  <Link href={`/lookbook/${story.slug}`} className="group relative min-h-[560px] overflow-hidden">
                    <Image src={story.image} alt={story.title} fill sizes="60vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/10 to-transparent" />
                    <div className="absolute left-6 top-6 rounded-full bg-cream/80 px-4 py-2 text-xs font-black uppercase tracking-[.18em] shadow-card backdrop-blur-xl">Story 0{index + 1}</div>
                    <div className="absolute bottom-6 left-6 right-6 text-cream">
                      <Badge className="bg-lime text-ink">{story.kicker}</Badge>
                      <h2 className="mt-4 max-w-3xl font-display text-6xl font-black leading-[.82] tracking-[-.09em] md:text-8xl">{story.title}</h2>
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-black text-ink shadow-card transition group-hover:translate-x-2">
                        Open editorial <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                  <div className="p-6 md:p-8">
                    <p className="text-lg leading-8 text-ink/65">{story.description}</p>
                    {'palette' in story && Array.isArray(story.palette) && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {story.palette.map((item: string) => <span key={item} className="rounded-full bg-cream px-3 py-1.5 text-xs font-black uppercase tracking-[.14em] text-ink/50">{item}</span>)}
                      </div>
                    )}
                    <div className="mt-8 grid gap-4">
                      {products.slice(0, 3).map((product, productIndex) => (
                        <Link key={product.id} href={`/product/${product.slug}`} className="group grid grid-cols-[86px_1fr_auto] items-center gap-4 rounded-4xl border border-ink/10 bg-cream/70 p-3 transition hover:-translate-y-1 hover:shadow-card">
                          <div className="relative h-24 overflow-hidden rounded-3xl"><Image src={product.images[0]} alt={product.name} fill sizes="100px" className="object-cover transition duration-500 group-hover:scale-110" /></div>
                          <div><p className="font-display text-2xl font-black tracking-[-.06em]">{product.name}</p><p className="text-xs uppercase tracking-[.18em] text-ink/45">Hotspot 0{productIndex + 1}</p></div>
                          <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      ))}
                    </div>
                    <Button asChild variant="punch" size="lg" className="mt-7 w-full"><Link href={`/lookbook/${story.slug}`}>Read full story</Link></Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Shop the lookbook</p>
              <h2 className="font-display text-6xl font-black tracking-[-.09em]">Editorial products</h2>
            </div>
            <Button asChild variant="outline"><Link href="/shop">Shop all</Link></Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allProducts.filter((item) => item.isFeatured).slice(0, 6).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
