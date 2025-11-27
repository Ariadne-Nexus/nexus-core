import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Avidelta",
  description: "Review the terms that govern use of Avidelta products and services.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-gray-500">Legal</p>
        <h1 className="text-3xl font-semibold text-black">Terms of Service</h1>
        <p className="text-gray-700">
          These placeholder terms outline the rules for using our products and
          services. Replace this text with your official legal terms and contact
          details.
        </p>
      </div>
      <div className="space-y-4 text-gray-700">
        <p>
          Use this space to describe account requirements, acceptable use, payment
          terms, disclaimers, and limitation of liability.
        </p>
        <p>
          Include instructions for terminating service and how to get support for
          questions about these terms.
        </p>
      </div>
    </section>
  );
}
