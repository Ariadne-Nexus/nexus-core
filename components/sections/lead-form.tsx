"use client";

import { useState } from "react";
import type { ContactCopy } from "@/types/content";

const initialState = {
  name: "",
  email: "",
  company: "",
  message: "",
  consent: false,
  website: "",
};

export default function LeadForm({ content }: { content: ContactCopy }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setStatus("success");
      setForm(initialState);
    } else {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg sm:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <p className="eyebrow">Talk with us</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle">{content.subtitle}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {content.checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="form-label">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
                autoComplete="email"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="form-input"
                autoComplete="organization"
              />
            </div>
            <div className="hidden">
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <input
                id="website"
                name="website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="form-input"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="form-label">
              What can we help you launch?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="form-input"
            />
          </div>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              required
            />
            <span>I agree to be contacted about Avidelta products and services.</span>
          </label>
          {error ? <p className="text-sm text-rose-600" role="alert">{error}</p> : null}
          {status === "success" ? (
            <p className="text-sm text-emerald-700" role="status">
              Thanks for reaching out. We’ll reply shortly.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Send request"}
          </button>
          <p className="text-xs text-slate-500">We respond in under one business day.</p>
        </form>
      </div>
    </section>
  );
}
