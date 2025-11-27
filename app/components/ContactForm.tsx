"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
  honeypot: string;
};

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
  consent: false,
  honeypot: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<SubmissionState>({ status: "idle", message: "" });

  const isDisabled = useMemo(() => {
    const hasRequiredValues = form.name.trim() && form.email.trim() && form.message.trim() && form.consent;
    return !hasRequiredValues || result.status === "submitting";
  }, [form, result.status]);

  const updateField = (field: keyof FormState, value: FormState[keyof FormState]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult({ status: "submitting", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          consent: form.consent,
          honeypot: form.honeypot,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to send message");
      }

      setResult({ status: "success", message: payload.message ?? "Message sent!" });
      resetForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      setResult({ status: "error", message: errorMessage });
    }
  };

  return (
    <section className="w-full rounded-3xl bg-white/70 p-8 shadow-xl ring-1 ring-zinc-200 backdrop-blur-md dark:bg-zinc-900/70 dark:ring-white/10">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Contact</p>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Ready to start a project?</h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Send a quick note and I&apos;ll get back within one business day.
        </p>
      </div>

      <form className="grid grid-cols-1 gap-6" onSubmit={submitForm}>
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-indigo-500/40"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-indigo-500/40"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            required
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-indigo-500/40"
            placeholder="Share your goals, timeline, or anything else."
          />
        </div>

        <div className="grid gap-3">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              checked={form.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              required
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-200">
              I agree to be contacted about my inquiry and understand my information will be handled in accordance with the
              privacy policy.
            </span>
          </label>

          {/* Honeypot anti-spam field */}
          <label className="sr-only" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.honeypot}
            onChange={(event) => updateField("honeypot", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-300 dark:focus-visible:ring-offset-zinc-900"
        >
          {result.status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </form>

      {result.status === "success" && (
        <p className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-900 dark:border-green-900/60 dark:bg-green-950 dark:text-green-100">
          {result.message}
        </p>
      )}

      {result.status === "error" && (
        <p className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-900 dark:border-rose-900/60 dark:bg-rose-950 dark:text-rose-100">
          {result.message}
        </p>
      )}
    </section>
  );
}

export default ContactForm;
