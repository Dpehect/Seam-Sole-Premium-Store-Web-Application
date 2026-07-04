import { notFound } from 'next/navigation';
import { EditorialReader } from '@/components/lookbook/editorial-reader';
import { allLookbooks, allProducts, getLookbookBySlug } from '@/lib/products';

export function generateStaticParams() {
  return allLookbooks.map((story) => ({ slug: story.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const story = getLookbookBySlug(params.slug);
  if (!story) return {};
  return {
    title: `${story.title} | Seam & Sole Lookbook`,
    description: story.description
  };
}

export default function LookbookStoryPage({ params }: { params: { slug: string } }) {
  const story = getLookbookBySlug(params.slug);
  if (!story) notFound();
  const products = allProducts.filter((product) => story.products.includes(product.slug));
  return <EditorialReader story={story} products={products} />;
}
