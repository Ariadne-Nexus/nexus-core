import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { metadataBaseUrl, siteConfig, metadataDefaults, getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();
const sharedTitle = `${siteConfig.name} — operations, telemetry, and controls`;

export const metadata: Metadata = {
  title: sharedTitle,
  description: siteConfig.description,
  metadataBase: metadataBaseUrl(),
  keywords: metadataDefaults.keywords,
  openGraph: {
    title: sharedTitle,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero-visual.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} workspace illustration`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.social?.twitterHandle || siteConfig.name,
    title: sharedTitle,
    description: siteConfig.description,
    images: ["/images/hero-visual.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-surface text-slate-900"
      >
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        ) : null}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
          </Script>
        ) : null}
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="min-h-screen bg-grid text-slate-900">
          <NavBar />
          <main id="main-content" className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
