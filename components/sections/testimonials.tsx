import type { Testimonial } from "@/types/content";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-16">
      <div className="mb-6 flex flex-col gap-3">
        <p className="eyebrow">Testimonials</p>
        <h2 className="section-title">Operators who ship on schedule</h2>
        <p className="section-subtitle">
          Teams use Avidelta to create a single source of truth for the processes that drive revenue and customer trust.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <figure key={item.name} className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm">
            <blockquote className="text-base leading-relaxed text-slate-700">“{item.quote}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-slate-900">
              {item.name} · <span className="font-normal text-slate-600">{item.role}, {item.company}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
