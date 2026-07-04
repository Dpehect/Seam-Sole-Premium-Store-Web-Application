import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { AnimatedSection } from '@/components/animations/animated-section';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts, getNewProducts } from '@/lib/products';
import { siteContent } from '@/lib/site-content';

export function ProductRail({ type = 'featured' }: { type?: 'featured' | 'new' }) {
  const section = siteContent.home.productRails;
  const products = type === 'featured' ? getFeaturedProducts() : getNewProducts();
  return (
    <AnimatedSection className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-cobalt">{type === 'featured' ? section.featuredKicker : section.newKicker}</p>
            <h2 className="mt-2 font-display text-5xl font-black tracking-[-.08em] md:text-7xl">{type === 'featured' ? section.featuredTitle : section.newTitle}</h2>
          </div>
          <Button asChild variant="outline"><Link href="/shop">{section.cta} <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
