'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, MousePointer2, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Magnetic } from '@/components/animations/magnetic';
import { HoverWave } from '@/components/animations/hover-wave';
import { siteContent } from '@/lib/site-content';

export function Hero() {
  const hero = siteContent.home.hero;
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 110]);
  const titleY = useTransform(scrollY, [0, 700], [0, -80]);

  return (
    <section className="relative min-h-screen overflow-hidden px-5 pt-32 md:px-8 md:pt-36">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <motion.div
        className="absolute -right-28 top-28 h-72 w-72 rounded-full bg-lime/40 blur-3xl md:h-[560px] md:w-[560px]"
        animate={{ scale: [1, 1.14, 1], rotate: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-20 bottom-16 h-80 w-80 rounded-full bg-punch/25 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.02fr_.98fr]">
        <motion.div style={{ y: titleY }} className="pb-8 md:pb-16">
          <div className="flex flex-wrap gap-2">
            <Badge><Sparkles className="mr-2 h-3 w-3" /> {hero.badges[0]}</Badge>
            <Badge className="bg-ink text-cream"><BadgeCheck className="mr-2 h-3 w-3 text-lime" /> {hero.badges[1]}</Badge>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-5xl font-display text-[16vw] font-black uppercase leading-[.76] tracking-[-.13em] md:text-[9.2rem]"
          >
            {hero.title}
          </motion.h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-ink/68 md:text-xl">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="lg" variant="punch">
                <Link href="/shop">{hero.primaryCta} <ArrowUpRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href="/lookbook">{hero.secondaryCta}</Link>
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {hero.stats.map(({ value, label }) => (
              <div key={label} className="rounded-4xl border border-ink/10 bg-white/35 p-4 shadow-card backdrop-blur-xl">
                <p className="font-display text-4xl font-black tracking-[-.08em]">{value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[.14em] text-ink/45">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y: imageY }} className="relative min-h-[650px]">
          <motion.div
            initial={{ opacity: 0, rotate: -7, y: 80 }}
            animate={{ opacity: 1, rotate: -3, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="absolute left-0 top-0 w-[70%] overflow-hidden rounded-5xl border border-ink/10 bg-white/30 p-3 shadow-soft backdrop-blur-xl"
          >
            <HoverWave className="relative h-[500px] rounded-[2rem]">
              <Image src={hero.primaryImage} alt={hero.primaryImageAlt} fill priority className="object-cover" />
            </HoverWave>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 9, y: 80 }}
            animate={{ opacity: 1, rotate: 5, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22 }}
            className="absolute bottom-5 right-0 w-[60%] overflow-hidden rounded-5xl border border-ink/10 bg-white/40 p-3 shadow-soft backdrop-blur-xl"
          >
            <HoverWave className="relative h-[350px] rounded-[2rem]">
              <Image src={hero.secondaryImage} alt={hero.secondaryImageAlt} fill priority className="object-cover" />
            </HoverWave>
          </motion.div>
          <motion.div
            className="absolute right-8 top-10 rounded-full bg-ink px-5 py-4 font-display text-4xl font-black tracking-[-.08em] text-lime shadow-soft"
            animate={{ rotate: [0, 8, 0], y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {hero.dropBadge}
          </motion.div>
          <motion.div
            className="absolute bottom-24 left-8 hidden max-w-xs rounded-[2rem] border border-ink/10 bg-cream/80 p-4 shadow-soft backdrop-blur-xl md:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-punch"><MousePointer2 className="h-3.5 w-3.5" /> {hero.floatingLabel}</p>
            <p className="mt-2 text-sm leading-6 text-ink/65">{hero.floatingText}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
