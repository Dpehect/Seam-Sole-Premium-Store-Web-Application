import { notFound } from 'next/navigation';
import { ShopClient } from '../shop-client';
import { allCategories, getCategoryById } from '@/lib/products';
import type { Metadata } from 'next';
import type { ProductCategory } from '@/types/product';

export function generateStaticParams() {
  return allCategories.map((category) => ({ category: category.id }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategoryById(params.category as ProductCategory);
  if (!category) return { title: 'Shop — Seam & Sole' };
  return {
    title: `${category.name} — Seam & Sole`,
    description: category.description
  };
}

export default function CategoryShopPage({ params }: { params: { category: string } }) {
  const category = getCategoryById(params.category as ProductCategory);
  if (!category) notFound();
  return <ShopClient initialCategory={category.id} />;
}
