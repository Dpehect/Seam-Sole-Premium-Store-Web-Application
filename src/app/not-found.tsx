import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-40 text-center md:px-8">
      <p className="text-xs font-black uppercase tracking-[.22em] text-punch">404 / Missing drop</p>
      <h1 className="mt-5 font-display text-7xl font-black uppercase leading-[.8] tracking-[-.12em] md:text-9xl">This fit sold out.</h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink/62">
        The page you wanted is not in this boutique rotation. Jump back to the catalog, drops or editorial lookbook.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="punch" size="lg"><Link href="/shop">Open shop <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
        <Button asChild variant="outline" size="lg"><Link href="/lookbook">Open lookbook</Link></Button>
      </div>
    </main>
  );
}
