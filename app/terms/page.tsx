import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules of the road for using Avidelta.",
};

export default function TermsPage() {
  return (
    <section className="space-y-6 py-16">
      <div className="space-y-2">
        <p className="eyebrow">Terms</p>
        <h1 className="section-title">Terms of Service</h1>
        <p className="section-subtitle">Last updated: {new Date().getFullYear()}</p>
      </div>
      <div className="space-y-4 text-sm text-slate-700">
        <p>
          By accessing or using Avidelta, you agree to follow these terms and applicable laws. If you are using the service on behalf of an organization, you represent that you have authority to bind that organization.
        </p>
        <p>
          All content, features, and intellectual property are owned by Avidelta. You may not reverse engineer, resell, or misuse the platform. Use must comply with acceptable security and data handling practices.
        </p>
        <p>
          Liability is limited to the extent permitted by law. The service is provided as-is, with SLAs available on contracted plans. These terms may be updated; we will notify you of material changes.
        </p>
      </div>
      <Link href="/" className="nav-link text-sm">
        ← Back to home
      </Link>
    </section>
  );
}
