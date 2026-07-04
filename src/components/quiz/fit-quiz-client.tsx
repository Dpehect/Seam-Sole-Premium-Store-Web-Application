'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, RefreshCcw, ShoppingBag, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';
import { allProducts } from '@/lib/products';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import type { Product, ProductCategory } from '@/types/product';

type QuizOption = {
  id: string;
  label: string;
  text: string;
  image: string;
  weights: {
    categories?: ProductCategory[];
    tags?: string[];
    colors?: string[];
    collections?: string[];
    fitWords?: string[];
  };
};

type QuizStep = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  options: QuizOption[];
};

type StyleAdvice = {
  title: string;
  subtitle: string;
  why: string;
  formula: string[];
  colorDirection: string;
  fitDirection: string;
  stylingTips: string[];
  avoid: string[];
  shopFocus: string;
};


const steps: QuizStep[] = [
  {
    id: 'mood',
    kicker: '01 / Fit mood',
    title: 'What should the outfit feel like?',
    description: 'Pick the energy. The quiz will use this to shape product recommendations.',
    options: [
      {
        id: 'color-rush',
        label: 'Color rush',
        text: 'Bright, expressive, drop-ready pieces.',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop',
        weights: { tags: ['graphic', 'drop', 'oversized'], colors: ['Coral', 'Lime', 'Cobalt'], collections: ['Color Rush Drop'] }
      },
      {
        id: 'clean-court',
        label: 'Clean court',
        text: 'Sharp sneakers, blank tees and easy styling.',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['sneakers', 'tees'], tags: ['court', 'low top'], colors: ['White', 'Cream', 'Gum'], collections: ['Court Energy'] }
      },
      {
        id: 'night-market',
        label: 'Night market',
        text: 'Darker layers, utility pieces and bold contrast.',
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['hoodies', 'accessories'], tags: ['utility', 'bag', 'night'], colors: ['Ink', 'Black', 'Cobalt'], collections: ['Night Market'] }
      }
    ]
  },
  {
    id: 'base',
    kicker: '02 / Base piece',
    title: 'Start with the main piece.',
    description: 'Choose the item you want the outfit to build around.',
    options: [
      {
        id: 'tee',
        label: 'Graphic tee',
        text: 'A strong tee that carries the whole fit.',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['tees'], tags: ['graphic', 'oversized'], fitWords: ['boxy', 'relaxed', 'oversized'] }
      },
      {
        id: 'sneaker',
        label: 'Sneaker first',
        text: 'Let the shoe define the outfit language.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['sneakers'], tags: ['sneaker', 'runner', 'court'] }
      },
      {
        id: 'layer',
        label: 'Layered top',
        text: 'Hoodie, overshirt or heavyweight layer.',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['hoodies'], tags: ['layer', 'heavyweight', 'hoodie'], fitWords: ['relaxed', 'oversized'] }
      }
    ]
  },
  {
    id: 'sneaker',
    kicker: '03 / Sneaker language',
    title: 'Which shoe shape fits you?',
    description: 'This step tunes the sneaker recommendations and the full outfit pairing.',
    options: [
      {
        id: 'court',
        label: 'Court low-top',
        text: 'Clean, versatile, premium and easy to wear.',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['sneakers'], tags: ['court', 'low top'], colors: ['White', 'Gum', 'Cobalt'] }
      },
      {
        id: 'runner',
        label: 'Soft runner',
        text: 'Comfort-focused, sporty and everyday ready.',
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['sneakers'], tags: ['runner', 'mesh'], colors: ['Cream', 'Orange', 'White'] }
      },
      {
        id: 'skate',
        label: 'Skate volume',
        text: 'Chunkier proportions with streetwear weight.',
        image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop',
        weights: { categories: ['sneakers'], tags: ['skate', 'chunky'], colors: ['Black', 'Ink', 'White'] }
      }
    ]
  },
  {
    id: 'palette',
    kicker: '04 / Palette',
    title: 'Pick your color temperature.',
    description: 'The result balances color, neutrals and product availability from the catalog.',
    options: [
      {
        id: 'bright',
        label: 'Bright accent',
        text: 'Lime, cobalt, coral and punchy contrast.',
        image: 'https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?q=80&w=1200&auto=format&fit=crop',
        weights: { colors: ['Lime', 'Cobalt', 'Coral', 'Orange'], tags: ['graphic', 'drop'] }
      },
      {
        id: 'neutral',
        label: 'Soft neutral',
        text: 'Cream, white, gum and wardrobe-safe tones.',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop',
        weights: { colors: ['Cream', 'White', 'Gum', 'Stone'], tags: ['blank', 'minimal'] }
      },
      {
        id: 'dark',
        label: 'Dark utility',
        text: 'Ink, black, cobalt and late-night styling.',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop',
        weights: { colors: ['Ink', 'Black', 'Cobalt'], tags: ['utility', 'night', 'hoodie'] }
      }
    ]
  }
];

function scoreProduct(product: Product, selected: QuizOption[]) {
  return selected.reduce((score, option) => {
    let next = score;
    if (option.weights.categories?.includes(product.category)) next += 8;
    option.weights.tags?.forEach((tag) => {
      if (product.tags.some((productTag) => productTag.toLowerCase().includes(tag.toLowerCase()))) next += 4;
    });
    option.weights.colors?.forEach((color) => {
      if (product.colors.some((productColor) => productColor.toLowerCase() === color.toLowerCase())) next += 3;
    });
    option.weights.collections?.forEach((collection) => {
      if (product.collection.toLowerCase().includes(collection.toLowerCase())) next += 5;
    });
    option.weights.fitWords?.forEach((word) => {
      if (product.fit.toLowerCase().includes(word.toLowerCase()) || product.description.toLowerCase().includes(word.toLowerCase())) next += 2;
    });
    if (product.isFeatured) next += 1.4;
    if (product.isNew) next += 1;
    if (product.stock > 0) next += 0.8;
    return next;
  }, 0);
}


function getStyleAdvice(selected: Record<string, QuizOption>, recommendations: Product[]): StyleAdvice {
  const mood = selected.mood?.id;
  const base = selected.base?.id;
  const sneaker = selected.sneaker?.id;
  const palette = selected.palette?.id;
  const topCategories = Array.from(new Set(recommendations.map((product) => product.category))).slice(0, 3).join(', ');

  const isColor = mood === 'color-rush' || palette === 'bright';
  const isClean = mood === 'clean-court' || sneaker === 'court' || palette === 'neutral';
  const isUtility = mood === 'night-market' || palette === 'dark';
  const isRunner = sneaker === 'runner';
  const isSkate = sneaker === 'skate';

  if (isUtility) {
    return {
      title: 'This style suits you: night utility streetwear.',
      subtitle: 'Dark layers, practical accessories and sharp sneaker contrast will look the most natural on your rotation.',
      why: 'Your answers point to a confident, city-focused wardrobe. You are likely to look best in outfits that feel intentional, slightly technical and layered rather than overly bright or minimal.',
      formula: ['Oversized or heavyweight top', 'Dark hoodie or utility layer', 'Clean sneaker contrast', 'Crossbody or cap as the finishing piece'],
      colorDirection: 'Use ink, black and cobalt as the base. Add one controlled highlight such as lime, cream or white so the outfit does not become flat.',
      fitDirection: 'Go relaxed on top, cleaner around the shoe. A boxy tee or hoodie works best when the sneaker shape stays defined.',
      stylingTips: ['Keep the strongest graphic on one item only.', 'Match accessory hardware or logo color with the sneaker accent.', 'Use cropped or slightly stacked pants to keep the shoe visible.'],
      avoid: ['Too many loud colors at once', 'Very slim tops with bulky sneakers', 'Random accessories that do not match the palette'],
      shopFocus: topCategories ? `Start with ${topCategories}, then complete the fit with one accessory.` : 'Start with a hoodie, sneaker and one accessory.'
    };
  }

  if (isColor) {
    return {
      title: 'This style suits you: expressive drop-street.',
      subtitle: 'Graphic tees, bold sneakers and one strong accent color will make your outfit feel alive without looking messy.',
      why: 'Your choices show that you can carry color and statement pieces. The best direction is playful but controlled: one hero item, one supporting color and clean basics around it.',
      formula: ['Statement graphic tee', 'Color-accent sneaker', 'Neutral bottom', 'Small accessory that repeats the accent color'],
      colorDirection: 'Build around lime, cobalt, coral or orange, then balance it with cream, white or black. Keep the accent repeated twice for a deliberate look.',
      fitDirection: 'A relaxed or boxy tee works well here. Keep the rest of the outfit simple so the graphic and sneaker become the focus.',
      stylingTips: ['Choose one loud piece as the main character.', 'Repeat the accent color in the sneaker, cap or bag.', 'Use neutral layers if the tee already has a strong print.'],
      avoid: ['Three or more competing prints', 'Bright top and bright shoe with no neutral break', 'Overly formal pieces that fight the streetwear energy'],
      shopFocus: topCategories ? `Prioritize ${topCategories}; those categories matched your strongest preferences.` : 'Prioritize tees and sneakers with strong color accents.'
    };
  }

  if (isSkate) {
    return {
      title: 'This style suits you: skate-volume streetwear.',
      subtitle: 'Chunkier sneakers, heavyweight cotton and relaxed silhouettes will match your taste better than slim minimal outfits.',
      why: 'Your answers lean toward visual weight and streetwear attitude. You will look best when the proportions feel grounded: heavier shoe, substantial tee and easy layering.',
      formula: ['Heavyweight tee', 'Chunky or padded sneaker', 'Relaxed hoodie layer', 'Cap or crossbody to frame the outfit'],
      colorDirection: 'Use black, ink, white and muted accent colors. Let texture and shape do more work than bright color.',
      fitDirection: 'Choose boxy tops, slightly dropped shoulders and enough volume around the hem to balance the sneaker.',
      stylingTips: ['Pair bulky sneakers with wider pants or shorts.', 'Use a graphic tee under a plain hoodie for depth.', 'Keep accessories functional and low-key.'],
      avoid: ['Thin fitted tees', 'Very narrow pants with a bulky sneaker', 'Too many tiny details that make the look busy'],
      shopFocus: topCategories ? `Your best starting points are ${topCategories}.` : 'Start with heavyweight tees and chunkier sneakers.'
    };
  }

  if (isRunner) {
    return {
      title: 'This style suits you: soft sport casual.',
      subtitle: 'Comfort-first runners, breathable fabrics and warm neutrals will give you an easy everyday outfit direction.',
      why: 'Your selections suggest you prefer movement, comfort and light styling. The strongest look for you is athletic but polished, not gym-like.',
      formula: ['Soft runner sneaker', 'Clean tee or lightweight hoodie', 'Cream or white base tone', 'One warm accent such as orange or gum'],
      colorDirection: 'Cream, white, gum and orange work well. Keep the palette warm and light, then add one darker item if you need contrast.',
      fitDirection: 'Go relaxed but not oversized everywhere. A clean tee with a soft runner keeps the outfit modern and wearable.',
      stylingTips: ['Let the sneaker shape set the comfort tone.', 'Choose breathable cotton or fleece textures.', 'Keep the top clean if the shoe already has visible color.'],
      avoid: ['Overly heavy layers in warm palettes', 'Hard black contrast on every piece', 'Formal accessories that make the look stiff'],
      shopFocus: topCategories ? `Build the outfit from ${topCategories}.` : 'Build from runners, clean tees and soft layers.'
    };
  }

  if (isClean) {
    return {
      title: 'This style suits you: clean court minimalism.',
      subtitle: 'Crisp sneakers, premium blank tees and restrained colors will make your outfit look sharp and expensive.',
      why: 'Your answers favor clarity and versatility. You will look best in pieces that feel intentional, clean and easy to repeat across different days.',
      formula: ['Premium blank or subtle graphic tee', 'White or gum court sneaker', 'One structured layer', 'Minimal accessory'],
      colorDirection: 'Use cream, white, gum and stone as your base. Add cobalt or black only as a small contrast detail.',
      fitDirection: 'Keep the silhouette clean: relaxed tee, tidy hem, sneaker visible. Avoid oversized volume on every layer.',
      stylingTips: ['Invest in the cleanest sneaker first.', 'Use texture instead of loud graphics for interest.', 'Keep logo and color placement minimal.'],
      avoid: ['Oversized hoodie plus oversized tee plus bulky sneaker all together', 'Too many accent colors', 'Distressed pieces that break the polished look'],
      shopFocus: topCategories ? `The strongest catalog match is ${topCategories}.` : 'Start with court sneakers and premium tees.'
    };
  }

  if (base === 'layer') {
    return {
      title: 'This style suits you: layered everyday streetwear.',
      subtitle: 'A strong upper layer with reliable sneakers will give your wardrobe the most range.',
      why: 'Your answers point toward outfits that need structure and comfort at the same time. Layers will help you build more complete looks from fewer pieces.',
      formula: ['Base tee', 'Hoodie or overshirt', 'Everyday sneaker', 'Accessory with a practical purpose'],
      colorDirection: 'Choose one base neutral and one accent. Keep the layer slightly darker than the tee for an easy visual frame.',
      fitDirection: 'Layer relaxed pieces without making the outfit shapeless. Let one item be oversized and keep the rest controlled.',
      stylingTips: ['Use the tee color to connect the sneaker accent.', 'Choose layers with enough weight to hold shape.', 'Keep the accessory close to the same tone as the sneaker or layer.'],
      avoid: ['Layering several thin pieces that collapse visually', 'Mixing too many clashing materials', 'Choosing a sneaker that disappears under the outfit'],
      shopFocus: topCategories ? `Recommended focus: ${topCategories}.` : 'Start with a hoodie, tee and everyday sneaker.'
    };
  }

  return {
    title: 'This style suits you: balanced streetwear rotation.',
    subtitle: 'A clean base, one expressive product and a practical sneaker will give you the most wearable result.',
    why: 'Your answers create a flexible profile. The best direction is not extreme; it is a balanced outfit that can shift between clean, colorful and casual depending on the day.',
    formula: ['Reliable tee', 'Versatile sneaker', 'Optional hoodie layer', 'One accent accessory'],
    colorDirection: 'Keep two neutrals and one accent. This makes the outfit feel styled without becoming difficult to wear.',
    fitDirection: 'Choose a relaxed top and a sneaker with enough shape. Keep the proportions balanced from shoulder to shoe.',
    stylingTips: ['Build around the product you feel most confident wearing.', 'Repeat one color twice in the outfit.', 'Use accessories only when they add function or color balance.'],
    avoid: ['Buying only statement pieces with no basics', 'Matching every item too literally', 'Ignoring fit because the colors look good'],
    shopFocus: topCategories ? `Your catalog focus should be ${topCategories}.` : 'Start with tees, sneakers and one layer.'
  };
}

function getRecommendations(selected: Record<string, QuizOption>) {
  const selectedOptions = Object.values(selected);
  const scored = allProducts
    .map((product) => ({ product, score: scoreProduct(product, selectedOptions) }))
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating);

  const picks: Product[] = [];
  const preferredOrder: Array<ProductCategory | 'any'> = ['tees', 'sneakers', 'hoodies', 'accessories', 'any', 'any'];

  preferredOrder.forEach((category) => {
    const match = scored.find(({ product }) => !picks.some((pick) => pick.id === product.id) && (category === 'any' || product.category === category));
    if (match) picks.push(match.product);
  });

  return picks.slice(0, 6);
}

export function FitQuizClient() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, QuizOption>>({});
  const addItem = useCartStore((state) => state.addItem);
  const current = steps[stepIndex];
  const isComplete = Object.keys(selected).length === steps.length;
  const recommendations = useMemo(() => getRecommendations(selected), [selected]);
  const styleAdvice = useMemo(() => getStyleAdvice(selected, recommendations), [selected, recommendations]);
  const heroPick = recommendations[0];
  const progress = Math.round((Object.keys(selected).length / steps.length) * 100);

  const choose = (option: QuizOption) => {
    const next = { ...selected, [current.id]: option };
    setSelected(next);
    if (stepIndex < steps.length - 1) setStepIndex((value) => value + 1);
  };

  const skipCurrent = () => {
    const neutral: QuizOption = {
      id: `no-preference-${current.id}`,
      label: 'No preference',
      text: 'Do not strongly weight this step.',
      image: current.options[0].image,
      weights: {}
    };
    setSelected((value) => ({ ...value, [current.id]: value[current.id] ?? neutral }));
    if (stepIndex < steps.length - 1) setStepIndex((value) => value + 1);
  };

  const reset = () => {
    setSelected({});
    setStepIndex(0);
  };

  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[3rem] bg-ink text-cream shadow-soft">
          <div className="grid gap-6 p-8 md:grid-cols-[1.1fr_.9fr] md:p-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Interactive fit quiz</p>
              <h1 className="mt-4 font-display text-7xl font-black leading-[.82] tracking-[-.1em] md:text-9xl">Find your rotation.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/70">
                Answer four quick styling questions and get a detailed outfit direction with tees, sneakers, layers and accessories matched to your taste.
              </p>
              <div className="mt-8 h-3 overflow-hidden rounded-full bg-cream/10">
                <motion.div className="h-full rounded-full bg-lime" animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} />
              </div>
              <p className="mt-3 text-xs font-black uppercase tracking-[.16em] text-cream/45">{progress}% complete</p>
            </div>
            <div className="rounded-[2.25rem] border border-cream/10 bg-cream/5 p-5">
              <p className="text-xs font-black uppercase tracking-[.2em] text-lime">Your current picks</p>
              <div className="mt-4 grid gap-2">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center justify-between rounded-full bg-cream/8 px-4 py-3 text-sm">
                    <span className="text-cream/55">{step.title}</span>
                    <span className="font-black text-cream">{selected[step.id]?.label ?? 'Not chosen'}</span>
                  </div>
                ))}
              </div>
              {Object.keys(selected).length > 0 && (
                <Button variant="outline" size="sm" onClick={reset} className="mt-4 border-cream/20 bg-cream/10 text-cream hover:bg-cream/15">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset quiz
                </Button>
              )}
            </div>
          </div>
        </div>

        {!isComplete ? (
          <div className="mt-10 grid gap-7 lg:grid-cols-[.68fr_1.32fr]">
            <div className="rounded-5xl border border-ink/10 bg-white/40 p-7 shadow-card backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[.22em] text-punch">{current.kicker}</p>
              <h2 className="mt-4 font-display text-5xl font-black leading-[.86] tracking-[-.08em]">{current.title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink/60">{current.description}</p>
              <div className="mt-8 flex items-center gap-3">
                <Button variant="outline" disabled={stepIndex === 0} onClick={() => setStepIndex((value) => Math.max(0, value - 1))}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button variant="ghost" onClick={skipCurrent}>
                  No preference <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {current.options.map((option) => {
                const active = selected[current.id]?.id === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => choose(option)}
                    className={cn('group overflow-hidden rounded-5xl border bg-white/40 p-3 text-left shadow-card backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-soft', active ? 'border-punch' : 'border-ink/10')}
                  >
                    <div className="relative h-72 overflow-hidden rounded-[2rem] bg-fog">
                      <Image src={option.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/84 via-transparent to-transparent" />
                      {active && <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-lime text-ink"><Check className="h-5 w-5" /></div>}
                      <div className="absolute bottom-5 left-5 right-5 text-cream">
                        <h3 className="font-display text-4xl font-black leading-[.86] tracking-[-.08em]">{option.label}</h3>
                        <p className="mt-2 text-sm leading-6 text-cream/68">{option.text}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <div className="grid gap-6 rounded-[3rem] border border-ink/10 bg-white/45 p-5 shadow-soft backdrop-blur-xl md:grid-cols-[.9fr_1.1fr] md:p-8">
              {heroPick && (
                <div className="relative min-h-[430px] overflow-hidden rounded-[2.4rem] bg-fog">
                  <Image src={heroPick.images[0]} alt={heroPick.name} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/86 via-ink/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-cream">
                    <p className="text-xs font-black uppercase tracking-[.18em] text-lime">Top match</p>
                    <h2 className="mt-2 font-display text-6xl font-black leading-[.84] tracking-[-.09em]">{heroPick.name}</h2>
                    <p className="mt-3 text-sm font-black">{formatPrice(heroPick.price)}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center p-2 md:p-6">
                <p className="inline-flex w-max items-center rounded-full bg-lime px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-ink"><Sparkles className="mr-2 h-4 w-4" /> Your fit result</p>
                <h2 className="mt-5 font-display text-6xl font-black leading-[.84] tracking-[-.09em] md:text-8xl">Your rotation is ready.</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-ink/64">
                  {styleAdvice.subtitle}
                </p>
                <div className="mt-6 grid gap-3 rounded-[2rem] border border-ink/10 bg-cream/70 p-5">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-punch">Style diagnosis</p>
                  <h3 className="font-display text-4xl font-black leading-[.88] tracking-[-.08em]">{styleAdvice.title}</h3>
                  <p className="text-sm leading-7 text-ink/62">{styleAdvice.why}</p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {heroPick && (
                    <Button
                      variant="punch"
                      size="lg"
                      onClick={() => {
                        addItem(heroPick);
                        toast.success(`${heroPick.name} added to cart`);
                      }}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" /> Add top match
                    </Button>
                  )}
                  <Button asChild variant="outline" size="lg"><Link href="/shop">Shop full catalog</Link></Button>
                  <Button variant="ghost" size="lg" onClick={reset}>Retake quiz</Button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[.95fr_1.05fr]">
              <div className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 shadow-card backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[.2em] text-punch">Fit formula</p>
                <div className="mt-5 grid gap-3">
                  {styleAdvice.formula.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-full bg-cream/80 px-4 py-3 text-sm font-bold text-ink/72">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-xs font-black text-ink">0{index + 1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 shadow-card backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[.2em] text-cobalt">Color direction</p>
                  <p className="mt-4 text-sm leading-7 text-ink/64">{styleAdvice.colorDirection}</p>
                </div>
                <div className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 shadow-card backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[.2em] text-cobalt">Fit direction</p>
                  <p className="mt-4 text-sm leading-7 text-ink/64">{styleAdvice.fitDirection}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[2.5rem] border border-ink/10 bg-ink p-6 text-cream shadow-card">
                <p className="text-xs font-black uppercase tracking-[.2em] text-lime">Styling tips</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-cream/70">
                  {styleAdvice.stylingTips.map((tip) => <li key={tip}>• {tip}</li>)}
                </ul>
              </div>
              <div className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 shadow-card backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[.2em] text-punch">Avoid</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/62">
                  {styleAdvice.avoid.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
              <div className="rounded-[2.5rem] border border-ink/10 bg-lime p-6 shadow-card">
                <p className="text-xs font-black uppercase tracking-[.2em] text-ink/60">Shopping focus</p>
                <p className="mt-4 text-xl font-black leading-7 tracking-[-.03em] text-ink">{styleAdvice.shopFocus}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} compact />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
