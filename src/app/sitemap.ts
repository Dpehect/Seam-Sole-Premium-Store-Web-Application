import type { MetadataRoute } from 'next';
import { allCategories, allLookbooks, allProducts } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seam-and-sole.example.com';
  const now = new Date();

  const staticRoutes = ['', '/shop', '/drops', '/lookbook', '/fit-studio', '/style-quiz', '/about', '/contact', '/cart', '/wishlist'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.72
  }));

  const categoryRoutes = allCategories.map((category) => ({
    url: `${baseUrl}/shop/${category.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.78
  }));

  const productRoutes = allProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: product.isFeatured ? 0.86 : 0.74
  }));

  const lookbookRoutes = allLookbooks.map((story) => ({
    url: `${baseUrl}/lookbook/${story.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...lookbookRoutes];
}
