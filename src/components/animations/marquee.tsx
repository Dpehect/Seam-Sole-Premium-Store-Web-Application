export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-3 text-cream">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[.2em]">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            {item}
            <span className="h-2 w-2 rounded-full bg-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}
