import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="px-5 pt-32 md:px-8">
      <section className="mx-auto max-w-4xl rounded-[3rem] border border-ink/10 bg-white/35 p-8 shadow-soft backdrop-blur-xl md:p-14">
        <p className="text-xs font-black uppercase tracking-[.24em] text-punch">Contact</p>
        <h1 className="mt-4 font-display text-7xl font-black leading-[.82] tracking-[-.1em] md:text-8xl">Let’s talk drops.</h1>
        <div className="mt-8 grid gap-4">
          <input placeholder="Name" className="rounded-3xl border border-ink/10 bg-cream/70 px-5 py-4 outline-none focus:border-ink" />
          <input placeholder="Email" className="rounded-3xl border border-ink/10 bg-cream/70 px-5 py-4 outline-none focus:border-ink" />
          <textarea placeholder="Message" rows={6} className="rounded-3xl border border-ink/10 bg-cream/70 px-5 py-4 outline-none focus:border-ink" />
          <Button variant="punch" size="lg">Send message</Button>
        </div>
      </section>
    </div>
  );
}
