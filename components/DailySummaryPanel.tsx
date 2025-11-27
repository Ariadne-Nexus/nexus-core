// app/components/DailySummaryPanel.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type DailySummary = {
  meta: {
    run_id: string;
    generated_at_utc: string;
    version: string;
  };
  summary: {
    date: string;
    title: string;
    overview: string;
    categories: string[];
  };
  sections: {
    name: string;
    items: string[];
  }[];
  metrics: Record<string, number>;
  links: {
    label: string;
    url: string;
  }[];
};

export function DailySummaryPanel() {
  const [data, setData] = useState<DailySummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/daily-summary");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Could not load daily summary");
      }
    }
    load();
  }, []);

  const metrics = useMemo(() => {
    if (!data) return [] as Array<[string, number]>;
    return Object.entries(data.metrics ?? {});
  }, [data]);

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  if (!data) {
    return <div className="text-zinc-500 text-sm">Loading daily summary…</div>;
  }

  return (
    <section className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5 text-zinc-900 shadow-sm">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Daily Automation Summary
          </p>
          <h2 className="text-lg font-semibold leading-tight">{data.summary.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="rounded-full bg-zinc-100 px-2 py-1 font-medium text-zinc-700">
              {data.summary.date}
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700">
              v{data.meta.version} · run {data.meta.run_id}
            </span>
            <span className="text-[11px]">generated at {data.meta.generated_at_utc}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.summary.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800">
          Notion-friendly JSON
        </div>
      </header>

      <p className="text-sm leading-relaxed text-zinc-700">{data.summary.overview}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {data.sections.map((section) => (
          <div key={section.name} className="space-y-2 rounded-lg border border-zinc-100 p-3">
            <h3 className="text-sm font-semibold text-zinc-800">{section.name}</h3>
            <ul className="list-disc pl-5 text-sm text-zinc-700">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {metrics.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-zinc-800">Metrics</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-center"
              >
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                  {label.replace(/_/g, " ")}
                </p>
                <p className="text-xl font-semibold text-zinc-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.links.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-zinc-800">Links</h3>
          <ul className="space-y-1 text-sm text-indigo-700">
            {data.links.map((link) => (
              <li key={link.url}>
                <a
                  className="hover:underline"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
