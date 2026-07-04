import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/product-detail';
import { allProducts, getProductBySlug } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };

  return {
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)} · ${product.fit}`,
    openGraph: {
      title: `${product.name} — Seam & Sole`,
      description: product.description,
      type: 'website',
      images: product.images.slice(0, 1)
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Seam & Sole`,
      description: product.description,
      images: product.images.slice(0, 1)
    }
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
