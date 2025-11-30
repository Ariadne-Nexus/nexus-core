import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center gap-4 py-24">
      <p className="eyebrow">404</p>
      <h1 className="section-title">Page not found</h1>
      <p className="section-subtitle">The page you’re looking for doesn’t exist. Return to the homepage to keep exploring.</p>
      <Link href="/" className="nav-link text-sm">
        ← Back to home
      </Link>
    </section>
  );
}
