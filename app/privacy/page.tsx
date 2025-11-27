import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Avidelta",
  description: "Learn how Avidelta collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-gray-500">Legal</p>
        <h1 className="text-3xl font-semibold text-black">Privacy Policy</h1>
        <p className="text-gray-700">
          This placeholder privacy policy explains how we handle your data. Replace
          this content with your organization&apos;s actual practices and contact
          information.
        </p>
      </div>
      <div className="space-y-4 text-gray-700">
        <p>
          We respect your privacy and are committed to safeguarding any information
          you share with us. Use this page to describe what data you collect, why
          you collect it, and how it&apos;s protected.
        </p>
        <p>
          Include details about cookie usage, third-party services, and how users
          can request data updates or deletion.
        </p>
      </div>
    </section>
  );
}
