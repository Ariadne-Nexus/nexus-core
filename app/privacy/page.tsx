import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Avidelta handles and protects your data.",
};

export default function PrivacyPage() {
  return (
    <section className="space-y-6 py-16">
      <div className="space-y-2">
        <p className="eyebrow">Privacy</p>
        <h1 className="section-title">Privacy Policy</h1>
        <p className="section-subtitle">Last updated: {new Date().getFullYear()}</p>
      </div>
      <div className="space-y-4 text-sm text-slate-700">
        <p>
          We collect the minimum data required to operate the service, provide support, and improve performance. Customer data is never sold and is only shared with subprocessors necessary to deliver the product.
        </p>
        <p>
          Access to customer data is limited to authorized personnel, protected by SSO and MFA. Data is encrypted in transit and at rest. Audit trails are available upon request.
        </p>
        <p>
          You can contact us at <a className="nav-link" href="mailto:hello@avidelta.com">hello@avidelta.com</a> to request access, updates, or deletion of your information.
        </p>
      </div>
      <Link href="/" className="nav-link text-sm">
        ← Back to home
      </Link>
    </section>
  );
}
