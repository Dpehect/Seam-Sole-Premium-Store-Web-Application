import products from '@/data/products.json';
import categories from '@/data/categories.json';
import collections from '@/data/collections.json';
import lookbook from '@/data/lookbook.json';
import reviews from '@/data/reviews.json';
import shopMeta from '@/data/shop-meta.json';
import type { Product, ProductCategory, ProductFilters, ProductReview } from '@/types/product';

export const allProducts = products as Product[];
export const allCategories = categories as Array<{ id: ProductCategory; name: string; description: string; image: string; heroCopy?: string }>;
export const allCollections = collections;
export const allLookbooks = lookbook;
export const allReviews = reviews as ProductReview[];
export const shopFilterMeta = shopMeta;

export function getFeaturedProducts() {
  return allProducts.filter((product) => product.isFeatured);
}

export function getNewProducts() {
  return allProducts.filter((product) => product.isNew);
}

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory | 'all') {
  if (category === 'all') return allProducts;
  return allProducts.filter((product) => product.category === category);
}

export function getCategoryById(category: ProductCategory) {
  return allCategories.find((item) => item.id === category);
}

export function getRelatedProducts(product: Product) {
  return allProducts
    .filter((item) => item.slug !== product.slug && (item.category === product.category || item.collection === product.collection || item.tags.some((tag) => product.tags.includes(tag))))
    .slice(0, 4);
}

export function getProductReviews(slug: string) {
  return allReviews.filter((review) => review.productSlug === slug);
}

export function getAllColors() {
  return Array.from(new Set(allProducts.flatMap((product) => product.colors))).sort();
}

export function getAllSizes() {
  return Array.from(new Set(allProducts.flatMap((product) => product.sizes))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function getAllMaterials() {
  return Array.from(new Set(allProducts.flatMap((product) => product.materials.flatMap((material) => material.toLowerCase().split(' '))))).filter(Boolean).sort();
}

export function searchProducts(query: string) {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return allProducts;
  return allProducts.filter((product) =>
    [product.name, product.category, product.collection, product.description, product.fit, ...(product.care ?? []), ...product.tags, ...product.materials, ...product.colors]
      .join(' ')
      .toLowerCase()
      .includes(normalized)
  );
}

function inPriceBand(product: Product, band: string) {
  if (band === 'all') return true;
  const bands = shopFilterMeta.priceBands as Array<{ label: string; min: number; max: number }>;
  const selected = bands.find((item) => item.label === band);
  if (!selected) return true;
  return product.price >= selected.min && product.price < selected.max;
}

export function filterProducts(filters: ProductFilters) {
  const q = filters.query.toLowerCase().trim();
  const list = allProducts.filter((product) => {
    const categoryMatch = filters.category === 'all' || product.category === filters.category;
    const materialMatch = filters.material === 'all' || product.materials.join(' ').toLowerCase().includes(filters.material);
    const sizeMatch = filters.sizes.length === 0 || filters.sizes.some((size) => product.sizes.includes(size));
    const colorMatch = filters.colors.length === 0 || filters.colors.some((color) => product.colors.includes(color));
    const priceMatch = inPriceBand(product, filters.priceBand);
    const saleMatch = !filters.saleOnly || Boolean(product.oldPrice);
    const newMatch = !filters.newOnly || product.isNew;
    const queryMatch = !q || [product.name, product.collection, product.description, product.category, product.fit, ...product.tags, ...product.materials, ...product.colors].join(' ').toLowerCase().includes(q);
    return categoryMatch && materialMatch && sizeMatch && colorMatch && priceMatch && saleMatch && newMatch && queryMatch;
  });

  return list.sort((a, b) => {
    if (filters.sort === 'price-low') return a.price - b.price;
    if (filters.sort === 'price-high') return b.price - a.price;
    if (filters.sort === 'new') return Number(b.isNew) - Number(a.isNew);
    if (filters.sort === 'rating') return b.rating - a.rating;
    if (filters.sort === 'low-stock') return a.stock - b.stock;
    return Number(b.isFeatured) - Number(a.isFeatured) || Number(b.isNew) - Number(a.isNew);
  });
}


export function getLookbookBySlug(slug: string) {
  return allLookbooks.find((story) => story.slug === slug);
}

export function getCollectionBySlug(slug: string) {
  return allCollections.find((collection) => collection.slug === slug);
}
