'use client';

import Link from 'next/link';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Boxes, Check, Copy, FileJson, ImageIcon, LockKeyhole, LogOut, PackagePlus, RefreshCcw, Save, Search, ShieldCheck, Trash2, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Product, ProductCategory, ProductReview } from '@/types/product';
import type { SiteContent } from '@/types/content';

type CategoryRecord = {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
  heroCopy?: string;
};

type CollectionRecord = {
  slug: string;
  name: string;
  tagline: string;
  accent: string;
  release: string;
};

export type EditableContent = {
  products: Product[];
  categories: CategoryRecord[];
  collections: CollectionRecord[];
  lookbook: unknown[];
  faqs: Array<{ question: string; answer: string }>;
  reviews: ProductReview[];
  shopMeta: unknown;
  siteContent: SiteContent;
};

type AdminTab = 'overview' | 'products' | 'homepage' | 'json' | 'guide';

const STORAGE_KEY = 'seam-and-sole-admin-content-v8';
const AUTH_KEY = 'seam-and-sole-admin-auth-v8';
const ADMIN_EMAIL = 'admin@localhost';
const ADMIN_PASSWORD = 'Seam&Sole2026!';

const inputClass = 'w-full rounded-3xl border border-ink/10 bg-white/70 px-4 py-3 text-sm font-semibold outline-none transition focus:border-ink/30 focus:bg-white';
const labelClass = 'text-xs font-black uppercase tracking-[.18em] text-ink/50';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function splitCsv(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function splitLines(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

function joinCsv(value: string[] | undefined) {
  return (value ?? []).join(', ');
}

function joinLines(value: string[] | undefined) {
  return (value ?? []).join('\n');
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function cloneProduct(product: Product): Product {
  return JSON.parse(JSON.stringify(product)) as Product;
}

function makeNewProduct(index: number): Product {
  const id = `p-${String(index + 1).padStart(3, '0')}-${Date.now().toString().slice(-4)}`;
  return {
    id,
    slug: `new-product-${Date.now().toString().slice(-5)}`,
    name: 'New Boutique Product',
    category: 'tees',
    collection: 'New Drop',
    price: 88,
    description: 'Write a strong product description here. Mention the fit, material, styling idea and why the piece belongs in the drop.',
    images: ['https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1600&auto=format&fit=crop'],
    colors: ['Cream', 'Ink'],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['cotton'],
    fit: 'Relaxed fit',
    rating: 4.8,
    reviewCount: 0,
    stock: 12,
    isNew: true,
    isFeatured: false,
    tags: ['new', 'drop'],
    dropDate: new Date().toISOString().slice(0, 10),
    badgeLine: 'New arrival',
    care: ['Machine wash cold', 'Wash inside out'],
    model: { height: '6\'0"', wearing: 'L' }
  };
}

function getInitialSelectedProduct(products: Product[]) {
  return products[0]?.id ?? '';
}

export function AdminDashboard({ initialContent }: { initialContent: EditableContent }) {
  const [content, setContent] = useState<EditableContent>(initialContent);
  const [tab, setTab] = useState<AdminTab>('overview');
  const [query, setQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(() => getInitialSelectedProduct(initialContent.products));
  const [jsonTarget, setJsonTarget] = useState<keyof EditableContent>('products');
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(initialContent.products, null, 2));
  const [loadedFromBrowser, setLoadedFromBrowser] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthed(window.sessionStorage.getItem(AUTH_KEY) === 'true');
    setAuthChecked(true);

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as EditableContent;
      setContent(parsed);
      setSelectedProductId(getInitialSelectedProduct(parsed.products));
      setJsonDraft(JSON.stringify(parsed.products, null, 2));
      setLoadedFromBrowser(true);
      toast.success('Admin content loaded from this browser');
    } catch {
      toast.error('Saved admin content could not be loaded');
    }
  }, []);

  useEffect(() => {
    setJsonDraft(JSON.stringify(content[jsonTarget], null, 2));
  }, [jsonTarget, content]);

  const selectedProduct = content.products.find((product) => product.id === selectedProductId) ?? content.products[0];

  const filteredProducts = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return content.products;
    return content.products.filter((product) => [product.name, product.slug, product.category, product.collection, ...product.tags].join(' ').toLowerCase().includes(normalized));
  }, [content.products, query]);

  const totals = {
    products: content.products.length,
    categories: content.categories.length,
    collections: content.collections.length,
    lookbooks: content.lookbook.length,
    images: content.products.reduce((sum, product) => sum + product.images.length, 0),
    featured: content.products.filter((product) => product.isFeatured).length
  };

  function handleLogin(email: string, password: string) {
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      toast.error('Wrong admin email or password');
      return;
    }

    window.sessionStorage.setItem(AUTH_KEY, 'true');
    setIsAuthed(true);
    toast.success('Admin access granted');
  }

  function handleLogout() {
    window.sessionStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
    toast.success('Signed out from admin');
  }

  function persistToBrowser() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setLoadedFromBrowser(true);
    toast.success('Saved to browser storage');
  }

  function resetToProjectData() {
    setContent(initialContent);
    setSelectedProductId(getInitialSelectedProduct(initialContent.products));
    window.localStorage.removeItem(STORAGE_KEY);
    setLoadedFromBrowser(false);
    toast.success('Reset to project JSON data');
  }

  function updateProduct(id: string, patch: Partial<Product>) {
    setContent((current) => ({
      ...current,
      products: current.products.map((product) => (product.id === id ? { ...product, ...patch } : product))
    }));
  }

  function addProduct() {
    const next = makeNewProduct(content.products.length);
    setContent((current) => ({ ...current, products: [next, ...current.products] }));
    setSelectedProductId(next.id);
    setTab('products');
    toast.success('New product added');
  }

  function duplicateProduct() {
    if (!selectedProduct) return;
    const copy = cloneProduct(selectedProduct);
    copy.id = `${selectedProduct.id}-copy-${Date.now().toString().slice(-4)}`;
    copy.name = `${selectedProduct.name} Copy`;
    copy.slug = `${selectedProduct.slug}-copy`;
    setContent((current) => ({ ...current, products: [copy, ...current.products] }));
    setSelectedProductId(copy.id);
    toast.success('Product duplicated');
  }

  function deleteProduct() {
    if (!selectedProduct) return;
    const nextProducts = content.products.filter((product) => product.id !== selectedProduct.id);
    setContent((current) => ({ ...current, products: nextProducts }));
    setSelectedProductId(getInitialSelectedProduct(nextProducts));
    toast.success('Product deleted');
  }

  function exportCoreFiles() {
    downloadJson('products.json', content.products);
    downloadJson('categories.json', content.categories);
    downloadJson('collections.json', content.collections);
    downloadJson('lookbook.json', content.lookbook);
    downloadJson('faqs.json', content.faqs);
    downloadJson('reviews.json', content.reviews);
    downloadJson('shop-meta.json', content.shopMeta);
    downloadJson('site-content.json', content.siteContent);
    toast.success('JSON files downloaded');
  }

  function applyJsonDraft() {
    try {
      const parsed = JSON.parse(jsonDraft);
      setContent((current) => ({ ...current, [jsonTarget]: parsed }));
      toast.success(`${String(jsonTarget)} updated from JSON editor`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid JSON');
    }
  }

  if (!authChecked) {
    return (
      <main className="grid min-h-screen place-items-center px-5 pt-28">
        <div className="rounded-[2rem] border border-ink/10 bg-white/60 px-6 py-5 text-sm font-black uppercase tracking-[.18em] text-ink/55 shadow-card backdrop-blur-xl">Checking admin access...</div>
      </main>
    );
  }

  if (!isAuthed) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <main className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-ink p-7 text-cream shadow-soft md:p-10">
          <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-lime/25 blur-3xl" />
          <div className="absolute -bottom-28 left-10 h-96 w-96 rounded-full bg-punch/25 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-end">
            <div>
              <Badge className="bg-lime text-ink"><ShieldCheck className="mr-2 h-3 w-3" /> Protected admin studio</Badge>
              <h1 className="mt-5 font-display text-7xl font-black uppercase leading-[.78] tracking-[-.12em] md:text-9xl">Edit the boutique.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/70">
                Products, image URLs, homepage copy, lookbook stories and JSON data can be edited here without adding a backend. Save locally while testing, then export JSON files into <span className="font-black text-lime">src/data</span> for permanent project changes.
              </p>
            </div>
            <div className="grid gap-3 rounded-[2.4rem] border border-cream/10 bg-cream/10 p-4 backdrop-blur-xl sm:grid-cols-3">
              <Metric value={totals.products.toString()} label="Products" />
              <Metric value={totals.images.toString()} label="Images" />
              <Metric value={totals.lookbooks.toString()} label="Lookbooks" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-ink/10 bg-white/45 p-3 shadow-card backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            <TabButton active={tab === 'overview'} onClick={() => setTab('overview')}>Overview</TabButton>
            <TabButton active={tab === 'products'} onClick={() => setTab('products')}>Products</TabButton>
            <TabButton active={tab === 'homepage'} onClick={() => setTab('homepage')}>Homepage copy</TabButton>
            <TabButton active={tab === 'json'} onClick={() => setTab('json')}>JSON editor</TabButton>
            <TabButton active={tab === 'guide'} onClick={() => setTab('guide')}>How to use</TabButton>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={persistToBrowser}><Save className="mr-2 h-4 w-4" /> Save local</Button>
            <Button variant="punch" onClick={exportCoreFiles}><ArrowDownToLine className="mr-2 h-4 w-4" /> Export JSON</Button>
            <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
          </div>
        </div>

        {loadedFromBrowser && (
          <div className="mt-4 rounded-full border border-lime/40 bg-lime/30 px-5 py-3 text-sm font-black text-ink">
            Local browser draft is active. Export JSON when you want the edits to become permanent project files.
          </div>
        )}

        {tab === 'overview' && (
          <Overview
            totals={totals}
            addProduct={addProduct}
            exportCoreFiles={exportCoreFiles}
            resetToProjectData={resetToProjectData}
          />
        )}

        {tab === 'products' && selectedProduct && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
            <aside className="h-fit rounded-[2.5rem] border border-ink/10 bg-cream/85 p-4 shadow-card backdrop-blur-xl lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[.18em]">Products</p>
                <button onClick={addProduct} className="grid h-11 w-11 place-items-center rounded-full bg-lime text-ink shadow-card" aria-label="Add product">
                  <PackagePlus className="h-5 w-5" />
                </button>
              </div>
              <label className="mt-4 flex items-center gap-3 rounded-full border border-ink/10 bg-white/65 px-4 py-3">
                <Search className="h-4 w-4 text-ink/45" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." className="w-full bg-transparent text-sm font-bold outline-none" />
              </label>
              <div className="mt-4 grid max-h-[720px] gap-2 overflow-auto pr-1">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    className={cn('rounded-[1.5rem] border p-3 text-left transition', selectedProduct.id === product.id ? 'border-ink bg-ink text-cream' : 'border-ink/10 bg-white/55 hover:bg-white')}
                  >
                    <div className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-fog">
                        {product.images[0] && <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">{product.name}</p>
                        <p className={cn('mt-1 truncate text-xs', selectedProduct.id === product.id ? 'text-cream/55' : 'text-ink/50')}>{product.slug}</p>
                        <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-punch">{product.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <ProductEditor
              product={selectedProduct}
              categories={content.categories}
              onUpdate={(patch) => updateProduct(selectedProduct.id, patch)}
              onDuplicate={duplicateProduct}
              onDelete={deleteProduct}
              onExport={() => downloadJson('products.json', content.products)}
            />
          </section>
        )}

        {tab === 'homepage' && (
          <HomepageEditor
            siteContent={content.siteContent}
            onChange={(siteContent) => setContent((current) => ({ ...current, siteContent }))}
            onExport={() => downloadJson('site-content.json', content.siteContent)}
          />
        )}

        {tab === 'json' && (
          <section className="mt-8 rounded-[2.5rem] border border-ink/10 bg-white/45 p-5 shadow-card backdrop-blur-xl md:p-7">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[.24em] text-cobalt">Advanced editor</p>
                <h2 className="mt-2 font-display text-5xl font-black tracking-[-.08em]">Edit raw JSON safely.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">Use this when you want to change categories, collections, FAQs, reviews, lookbook stories or the full shop metadata.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={jsonTarget} onChange={(event) => setJsonTarget(event.target.value as keyof EditableContent)} className={inputClass}>
                  {(['products', 'categories', 'collections', 'lookbook', 'faqs', 'reviews', 'shopMeta', 'siteContent'] as Array<keyof EditableContent>).map((key) => <option key={key} value={key}>{key}</option>)}
                </select>
                <Button variant="outline" onClick={() => downloadJson(`${String(jsonTarget).replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}.json`, content[jsonTarget])}><ArrowDownToLine className="mr-2 h-4 w-4" /> Export this</Button>
              </div>
            </div>
            <textarea
              value={jsonDraft}
              onChange={(event) => setJsonDraft(event.target.value)}
              spellCheck={false}
              className="mt-6 min-h-[620px] w-full rounded-[2rem] border border-ink/10 bg-ink p-5 font-mono text-xs leading-6 text-lime outline-none shadow-inner"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="punch" onClick={applyJsonDraft}><Check className="mr-2 h-4 w-4" /> Apply JSON</Button>
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(jsonDraft).then(() => toast.success('JSON copied'))}><Copy className="mr-2 h-4 w-4" /> Copy JSON</Button>
            </div>
          </section>
        )}

        {tab === 'guide' && <AdminGuide />}
      </section>
    </main>
  );
}


function AdminLogin({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin(email, password);
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pt-32 md:px-8">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="absolute -right-32 top-24 h-[34rem] w-[34rem] rounded-full bg-lime/35 blur-3xl" />
      <div className="absolute -left-24 bottom-10 h-[28rem] w-[28rem] rounded-full bg-punch/20 blur-3xl" />
      <section className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-[3.2rem] bg-ink p-8 text-cream shadow-soft md:p-10">
          <Badge className="bg-lime text-ink"><LockKeyhole className="mr-2 h-3 w-3" /> Local admin login</Badge>
          <h1 className="mt-5 font-display text-7xl font-black uppercase leading-[.78] tracking-[-.12em] md:text-9xl">Admin access.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cream/70">
            Use the local credentials below to open the content studio. This is a frontend-only guard for local editing, not production-grade authentication.
          </p>
          <div className="mt-8 rounded-[2rem] border border-cream/10 bg-cream/10 p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.22em] text-lime">Local credentials</p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-3xl bg-cream/10 p-4"><span className="text-cream/45">Email</span><br /><b>{ADMIN_EMAIL}</b></div>
              <div className="rounded-3xl bg-cream/10 p-4"><span className="text-cream/45">Password</span><br /><b>{ADMIN_PASSWORD}</b></div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[3.2rem] border border-ink/10 bg-white/55 p-6 shadow-soft backdrop-blur-xl md:p-8">
          <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Sign in</p>
          <h2 className="mt-3 font-display text-6xl font-black leading-[.86] tracking-[-.09em]">Enter the studio.</h2>
          <div className="mt-8 grid gap-5">
            <Field label="Admin email"><input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" /></Field>
            <Field label="Password"><input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="Paste the local password" /></Field>
          </div>
          <Button type="submit" variant="punch" size="lg" className="mt-7 w-full"><LockKeyhole className="mr-2 h-5 w-5" /> Open admin panel</Button>
          <p className="mt-5 rounded-[1.5rem] bg-cream/80 p-4 text-sm leading-6 text-ink/60">
            After login you can add/edit products, change images and text, save drafts locally and export JSON files into <span className="font-black text-ink">src/data</span>.
          </p>
        </form>
      </section>
    </main>
  );
}

function ProductEditor({ product, categories, onUpdate, onDuplicate, onDelete, onExport }: {
  product: Product;
  categories: CategoryRecord[];
  onUpdate: (patch: Partial<Product>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onExport: () => void;
}) {
  const heroImage = product.images[0] ?? '';

  return (
    <section className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-5 shadow-card backdrop-blur-xl md:p-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Product editor</p>
          <h2 className="mt-2 font-display text-5xl font-black leading-[.86] tracking-[-.08em]">{product.name}</h2>
          <p className="mt-2 text-sm font-bold text-ink/50">/{product.slug}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onDuplicate}><Copy className="mr-2 h-4 w-4" /> Duplicate</Button>
          <Button variant="outline" onClick={onExport}><ArrowDownToLine className="mr-2 h-4 w-4" /> Export products</Button>
          <Button variant="punch" onClick={onDelete}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        </div>
      </div>

      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Product name"><input className={inputClass} value={product.name} onChange={(event) => onUpdate({ name: event.target.value })} /></Field>
          <Field label="Slug"><input className={inputClass} value={product.slug} onChange={(event) => onUpdate({ slug: slugify(event.target.value) })} /></Field>
          <Field label="Category">
            <select className={inputClass} value={product.category} onChange={(event) => onUpdate({ category: event.target.value as ProductCategory })}>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </Field>
          <Field label="Collection"><input className={inputClass} value={product.collection} onChange={(event) => onUpdate({ collection: event.target.value })} /></Field>
          <Field label="Price"><input className={inputClass} type="number" value={product.price} onChange={(event) => onUpdate({ price: Number(event.target.value) })} /></Field>
          <Field label="Old price"><input className={inputClass} type="number" value={product.oldPrice ?? ''} onChange={(event) => onUpdate({ oldPrice: event.target.value ? Number(event.target.value) : undefined })} /></Field>
          <Field label="Stock"><input className={inputClass} type="number" value={product.stock} onChange={(event) => onUpdate({ stock: Number(event.target.value) })} /></Field>
          <Field label="Rating"><input className={inputClass} type="number" min="0" max="5" step="0.1" value={product.rating} onChange={(event) => onUpdate({ rating: Number(event.target.value) })} /></Field>
          <Field label="Review count"><input className={inputClass} type="number" value={product.reviewCount} onChange={(event) => onUpdate({ reviewCount: Number(event.target.value) })} /></Field>
          <Field label="Drop date"><input className={inputClass} type="date" value={product.dropDate ?? ''} onChange={(event) => onUpdate({ dropDate: event.target.value })} /></Field>
          <Field label="Badge line"><input className={inputClass} value={product.badgeLine ?? ''} onChange={(event) => onUpdate({ badgeLine: event.target.value })} /></Field>
          <Field label="Fit"><input className={inputClass} value={product.fit} onChange={(event) => onUpdate({ fit: event.target.value })} /></Field>

          <Field label="Description" wide><textarea className={`${inputClass} min-h-32`} value={product.description} onChange={(event) => onUpdate({ description: event.target.value })} /></Field>
          <Field label="Image URLs — one per line" wide><textarea className={`${inputClass} min-h-36 font-mono text-xs`} value={joinLines(product.images)} onChange={(event) => onUpdate({ images: splitLines(event.target.value) })} /></Field>
          <Field label="Colors — comma separated"><input className={inputClass} value={joinCsv(product.colors)} onChange={(event) => onUpdate({ colors: splitCsv(event.target.value) })} /></Field>
          <Field label="Sizes — comma separated"><input className={inputClass} value={joinCsv(product.sizes)} onChange={(event) => onUpdate({ sizes: splitCsv(event.target.value) })} /></Field>
          <Field label="Materials — comma separated"><input className={inputClass} value={joinCsv(product.materials)} onChange={(event) => onUpdate({ materials: splitCsv(event.target.value) })} /></Field>
          <Field label="Tags — comma separated"><input className={inputClass} value={joinCsv(product.tags)} onChange={(event) => onUpdate({ tags: splitCsv(event.target.value) })} /></Field>
          <Field label="Care instructions — one per line" wide><textarea className={`${inputClass} min-h-28`} value={joinLines(product.care)} onChange={(event) => onUpdate({ care: splitLines(event.target.value) })} /></Field>
          <Field label="Model height"><input className={inputClass} value={product.model?.height ?? ''} onChange={(event) => onUpdate({ model: { ...(product.model ?? {}), height: event.target.value } })} /></Field>
          <Field label="Model wearing"><input className={inputClass} value={product.model?.wearing ?? ''} onChange={(event) => onUpdate({ model: { ...(product.model ?? {}), wearing: event.target.value } })} /></Field>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <Toggle active={product.isNew} onClick={() => onUpdate({ isNew: !product.isNew })}>New product</Toggle>
            <Toggle active={product.isFeatured} onClick={() => onUpdate({ isFeatured: !product.isFeatured })}>Featured product</Toggle>
            <Button variant="outline" onClick={() => onUpdate({ slug: slugify(product.name) })}><Wand2 className="mr-2 h-4 w-4" /> Generate slug</Button>
          </div>
        </div>

        <div className="h-fit rounded-[2rem] border border-ink/10 bg-cream/85 p-4 shadow-card">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-fog">
            {heroImage ? <img src={heroImage} alt={product.name} className="h-full min-h-[420px] w-full object-cover" /> : <div className="grid h-[420px] place-items-center text-ink/40"><ImageIcon /></div>}
          </div>
          <h3 className="mt-4 font-display text-4xl font-black tracking-[-.08em]">Preview card</h3>
          <p className="mt-2 text-sm leading-6 text-ink/60">Changing the first image URL updates the product hero image after you export and replace <span className="font-bold">products.json</span>.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-3xl bg-white/65 p-3"><b>${product.price}</b><br /><span className="text-ink/50">Price</span></div>
            <div className="rounded-3xl bg-white/65 p-3"><b>{product.stock}</b><br /><span className="text-ink/50">Stock</span></div>
          </div>
          <Button asChild className="mt-4 w-full" variant="punch"><Link href={`/product/${product.slug}`}>Open current route <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </div>
    </section>
  );
}

function HomepageEditor({ siteContent, onChange, onExport }: { siteContent: SiteContent; onChange: (content: SiteContent) => void; onExport: () => void }) {
  function updateHero(patch: Partial<SiteContent['home']['hero']>) {
    onChange({ ...siteContent, home: { ...siteContent.home, hero: { ...siteContent.home.hero, ...patch } } });
  }

  function updateBrand(patch: Partial<SiteContent['brand']>) {
    onChange({ ...siteContent, brand: { ...siteContent.brand, ...patch } });
  }

  function updateHomeSection(key: keyof SiteContent['home'], patch: Record<string, unknown>) {
    onChange({
      ...siteContent,
      home: {
        ...siteContent.home,
        [key]: { ...(siteContent.home[key] as Record<string, unknown>), ...patch }
      } as SiteContent['home']
    });
  }

  return (
    <section className="mt-8 rounded-[2.5rem] border border-ink/10 bg-white/45 p-5 shadow-card backdrop-blur-xl md:p-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Homepage copy</p>
          <h2 className="mt-2 font-display text-5xl font-black tracking-[-.08em]">Change visible texts and hero images.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">These fields map to <span className="font-bold">src/data/site-content.json</span>. Export it and replace that file for permanent homepage changes.</p>
        </div>
        <Button variant="punch" onClick={onExport}><ArrowDownToLine className="mr-2 h-4 w-4" /> Export site content</Button>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <Field label="Brand name"><input className={inputClass} value={siteContent.brand.name} onChange={(event) => updateBrand({ name: event.target.value })} /></Field>
        <Field label="Short logo text"><input className={inputClass} value={siteContent.brand.shortName} onChange={(event) => updateBrand({ shortName: event.target.value })} /></Field>
        <Field label="Footer description" wide><textarea className={`${inputClass} min-h-28`} value={siteContent.brand.footerDescription} onChange={(event) => updateBrand({ footerDescription: event.target.value })} /></Field>
        <Field label="Hero title"><input className={inputClass} value={siteContent.home.hero.title} onChange={(event) => updateHero({ title: event.target.value })} /></Field>
        <Field label="Drop badge"><input className={inputClass} value={siteContent.home.hero.dropBadge} onChange={(event) => updateHero({ dropBadge: event.target.value })} /></Field>
        <Field label="Hero description" wide><textarea className={`${inputClass} min-h-32`} value={siteContent.home.hero.description} onChange={(event) => updateHero({ description: event.target.value })} /></Field>
        <Field label="Primary CTA"><input className={inputClass} value={siteContent.home.hero.primaryCta} onChange={(event) => updateHero({ primaryCta: event.target.value })} /></Field>
        <Field label="Secondary CTA"><input className={inputClass} value={siteContent.home.hero.secondaryCta} onChange={(event) => updateHero({ secondaryCta: event.target.value })} /></Field>
        <Field label="Hero primary image URL" wide><input className={inputClass} value={siteContent.home.hero.primaryImage} onChange={(event) => updateHero({ primaryImage: event.target.value })} /></Field>
        <Field label="Hero secondary image URL" wide><input className={inputClass} value={siteContent.home.hero.secondaryImage} onChange={(event) => updateHero({ secondaryImage: event.target.value })} /></Field>
        <Field label="Marquee items — one per line" wide><textarea className={`${inputClass} min-h-28`} value={joinLines(siteContent.home.marquee)} onChange={(event) => onChange({ ...siteContent, home: { ...siteContent.home, marquee: splitLines(event.target.value) } })} /></Field>
        <Field label="Runway title"><input className={inputClass} value={siteContent.home.runway.title} onChange={(event) => updateHomeSection('runway', { title: event.target.value })} /></Field>
        <Field label="Category showcase title"><input className={inputClass} value={siteContent.home.categoryShowcase.title} onChange={(event) => updateHomeSection('categoryShowcase', { title: event.target.value })} /></Field>
        <Field label="Shop-the-look title"><input className={inputClass} value={siteContent.home.shopTheLook.title} onChange={(event) => updateHomeSection('shopTheLook', { title: event.target.value })} /></Field>
        <Field label="Shop-the-look image URL" wide><input className={inputClass} value={siteContent.home.shopTheLook.image} onChange={(event) => updateHomeSection('shopTheLook', { image: event.target.value })} /></Field>
        <Field label="Lookbook editorial title"><input className={inputClass} value={siteContent.home.editorial.title} onChange={(event) => updateHomeSection('editorial', { title: event.target.value })} /></Field>
        <Field label="Retail display section title"><input className={inputClass} value={siteContent.home.threeFeature.title} onChange={(event) => updateHomeSection('threeFeature', { title: event.target.value })} /></Field>
        <Field label="Brand signature title"><input className={inputClass} value={siteContent.home.brandSignature.title} onChange={(event) => updateHomeSection('brandSignature', { title: event.target.value })} /></Field>
      </div>
    </section>
  );
}

function Overview({ totals, addProduct, exportCoreFiles, resetToProjectData }: {
  totals: Record<string, number>;
  addProduct: () => void;
  exportCoreFiles: () => void;
  resetToProjectData: () => void;
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_.9fr]">
      <div className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 shadow-card backdrop-blur-xl md:p-8">
        <p className="text-xs font-black uppercase tracking-[.24em] text-cobalt">Content control</p>
        <h2 className="mt-3 font-display text-6xl font-black leading-[.86] tracking-[-.09em]">No backend required.</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-ink/62">
          This admin studio is intentionally static-friendly. It edits JSON-shaped data, stores temporary drafts in the browser and exports files you can paste into the project. That keeps the storefront lightweight and safe for Vercel deployment.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="punch" onClick={addProduct}><PackagePlus className="mr-2 h-4 w-4" /> Add product</Button>
          <Button variant="outline" onClick={exportCoreFiles}><FileJson className="mr-2 h-4 w-4" /> Download JSON files</Button>
          <Button variant="outline" onClick={resetToProjectData}><RefreshCcw className="mr-2 h-4 w-4" /> Reset local draft</Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SummaryCard icon={Boxes} label="Products" value={totals.products} />
        <SummaryCard icon={ImageIcon} label="Product images" value={totals.images} />
        <SummaryCard icon={PackagePlus} label="Featured" value={totals.featured} />
        <SummaryCard icon={FileJson} label="Collections" value={totals.collections} />
      </div>
    </section>
  );
}

function AdminGuide() {
  return (
    <section className="mt-8 rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 shadow-card backdrop-blur-xl md:p-8">
      <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Workflow</p>
      <h2 className="mt-3 font-display text-6xl font-black tracking-[-.09em]">How to make changes permanent.</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <GuideStep title="1. Edit content" text="Use Products for normal product updates, Homepage copy for visible landing page text/images, or JSON editor for categories, lookbooks, FAQs, reviews and advanced structures." />
        <GuideStep title="2. Save while testing" text="Click Save local to keep your draft in this browser. This does not rewrite project files by itself, because this project has no backend or database." />
        <GuideStep title="3. Export JSON" text="Click Export JSON. Replace the matching files inside src/data: products.json, categories.json, collections.json, lookbook.json, faqs.json, reviews.json, shop-meta.json and site-content.json." />
        <GuideStep title="4. Restart and build" text="After replacing JSON files, run npm run dev again. Before deploy, run npm run build. Then deploy the same project to Vercel." />
      </div>
      <div className="mt-8 rounded-[2rem] bg-ink p-5 text-cream">
        <p className="font-black text-lime">Important</p>
        <p className="mt-2 text-sm leading-7 text-cream/70">Adding completely new category IDs may also require updating the TypeScript union in src/types/product.ts. For normal products, images, prices, stock, copy, lookbooks and homepage text, JSON replacement is enough.</p>
      </div>
    </section>
  );
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={cn('grid gap-2', wide && 'md:col-span-2')}><span className={labelClass}>{label}</span>{children}</label>;
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button onClick={onClick} className={cn('rounded-full border px-5 py-3 text-sm font-black transition', active ? 'border-ink bg-lime text-ink' : 'border-ink/10 bg-white/60 text-ink/55')}>{children}</button>;
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button onClick={onClick} className={cn('rounded-full px-4 py-3 text-sm font-black transition', active ? 'bg-ink text-cream' : 'bg-white/55 text-ink/60 hover:bg-white')}>{children}</button>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-[1.5rem] bg-cream/10 p-4 text-center"><p className="font-display text-4xl font-black tracking-[-.08em] text-lime">{value}</p><p className="mt-1 text-xs font-black uppercase tracking-[.16em] text-cream/55">{label}</p></div>;
}

function SummaryCard({ icon: Icon, label, value }: { icon: typeof Boxes; label: string; value: number }) {
  return <div className="rounded-[2rem] border border-ink/10 bg-white/45 p-5 shadow-card backdrop-blur-xl"><Icon className="h-6 w-6 text-punch" /><p className="mt-5 font-display text-5xl font-black tracking-[-.08em]">{value}</p><p className="mt-1 text-sm font-black uppercase tracking-[.16em] text-ink/45">{label}</p></div>;
}

function GuideStep({ title, text }: { title: string; text: string }) {
  return <div className="rounded-[2rem] border border-ink/10 bg-cream/75 p-5"><h3 className="font-display text-3xl font-black tracking-[-.07em]">{title}</h3><p className="mt-3 text-sm leading-7 text-ink/62">{text}</p></div>;
}
