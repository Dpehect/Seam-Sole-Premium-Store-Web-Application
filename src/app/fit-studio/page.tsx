import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Layers, MousePointer2, Shirt, Sparkles } from 'lucide-react';
import { FitStudioCanvas } from '@/components/three/fit-studio-canvas';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/lib/products';

const studioSteps = [
  { icon: Layers, title: 'Pick a base', text: 'Start with oversized tee weight, hoodie layer or clean blank.' },
  { icon: Shirt, title: 'Preview the rotation', text: 'See tee, sneaker and layer proportions together before choosing the final products.' },
  { icon: MousePointer2, title: 'Shop from context', text: 'Move from visual direction to actual product cards without breaking the flow.' },
  { icon: Sparkles, title: 'Save the fit', text: 'Use wishlist and cart together to build a complete boutique outfit.' }
];

export const metadata = {
  title: 'Fit Studio | Seam & Sole',
  description: 'Interactive boutique studio for tees, sneakers and complete outfit discovery.'
};

export default function FitStudioPage() {
  const featured = allProducts.filter((product) => product.isFeatured).slice(0, 6);
  const sneakers = allProducts.filter((product) => product.category === 'sneakers').slice(0, 3);

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="flex flex-col justify-center rounded-[3.5rem] border border-ink/10 bg-white/35 p-8 shadow-card backdrop-blur-xl md:p-10">
            <p className="text-xs font-black uppercase tracking-[.24em] text-cobalt">Product styling layer</p>
            <h1 className="mt-4 font-display text-7xl font-black leading-[.78] tracking-[-.11em] md:text-9xl">Fit Studio.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">A boutique styling space for tees and sneakers, focused on product language, material color, cinematic motion and shoppable context.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="punch" size="lg"><Link href="/shop">Shop products</Link></Button>
              <Button asChild variant="outline" size="lg"><Link href="/lookbook">Read lookbook</Link></Button>
            </div>
          </div>
          <FitStudioCanvas products={featured} />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {studioSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-5xl border border-ink/10 bg-cream/70 p-6 shadow-card backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-lime"><Icon className="h-5 w-5" /></div>
                  <span className="font-display text-4xl font-black tracking-[-.08em] text-ink/15">0{index + 1}</span>
                </div>
                <h2 className="mt-7 font-display text-4xl font-black tracking-[-.08em]">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/60">{step.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[540px] overflow-hidden rounded-[3.5rem] bg-ink shadow-soft">
            <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop" alt="Streetwear editorial" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 text-cream md:bottom-10 md:left-10 md:right-10">
              <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Visual direction</p>
              <h2 className="mt-3 max-w-3xl font-display text-6xl font-black leading-[.82] tracking-[-.09em] md:text-8xl">Build outfits like campaign pages.</h2>
              <p className="mt-5 max-w-xl text-cream/68">The studio page acts as a campaign bridge between lookbook storytelling and product conversion.</p>
            </div>
          </div>
          <div className="grid gap-4">
            {sneakers.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group grid grid-cols-[120px_1fr_auto] items-center gap-4 rounded-[2.2rem] border border-ink/10 bg-white/35 p-4 shadow-card backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-soft">
                <div className="relative h-28 overflow-hidden rounded-[1.7rem] bg-fog">
                  <Image src={product.images[0]} alt={product.name} fill sizes="140px" className="object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[.2em] text-punch">Sneaker rotation</p>
                  <h3 className="mt-2 font-display text-3xl font-black leading-none tracking-[-.07em]">{product.name}</h3>
                  <p className="mt-2 text-sm text-ink/55">{product.fit}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Studio picks</p>
              <h2 className="mt-2 font-display text-6xl font-black tracking-[-.09em]">Ready for the rotation.</h2>
            </div>
            <Button asChild variant="outline"><Link href="/shop">Shop all</Link></Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
