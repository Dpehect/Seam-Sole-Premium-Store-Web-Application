export type ProductCategory = 'tees' | 'sneakers' | 'hoodies' | 'accessories';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  materials: string[];
  fit: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  dropDate?: string;
  badgeLine?: string;
  care?: string[];
  model?: {
    height?: string;
    wearing?: string;
  };
};

export type ProductReview = {
  productSlug: string;
  name: string;
  rating: number;
  title: string;
  body: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

export type ProductSort = 'featured' | 'new' | 'price-low' | 'price-high' | 'rating' | 'low-stock';

export type ProductFilters = {
  category: ProductCategory | 'all';
  query: string;
  material: string;
  sizes: string[];
  colors: string[];
  priceBand: string;
  sort: ProductSort;
  saleOnly: boolean;
  newOnly: boolean;
};
