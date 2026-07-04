import type { Metadata } from 'next';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import collections from '@/data/collections.json';
import lookbook from '@/data/lookbook.json';
import faqs from '@/data/faqs.json';
import reviews from '@/data/reviews.json';
import shopMeta from '@/data/shop-meta.json';
import siteContent from '@/data/site-content.json';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import type { EditableContent } from '@/components/admin/admin-dashboard';

export const metadata: Metadata = {
  title: 'Admin Panel Login',
  description: 'Local login-protected admin panel for editing products, images, copy and JSON data.',
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  const initialContent = { products, categories, collections, lookbook, faqs, reviews, shopMeta, siteContent } as unknown as EditableContent;

  return <AdminDashboard initialContent={initialContent} />;
}
