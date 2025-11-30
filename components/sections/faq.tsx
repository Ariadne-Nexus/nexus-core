import type { FaqItem } from "@/types/content";

export default function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="py-16">
      <div className="mb-6 flex flex-col gap-3">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-title">Answers to the most common questions</h2>
        <p className="section-subtitle">If you don’t see what you need, reach out and we’ll respond within one business day.</p>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm" open>
            <summary className="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-slate-900">
              <span>{item.question}</span>
              <span className="text-slate-500 transition group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
