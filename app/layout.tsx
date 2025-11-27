import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isProd = process.env.NEXT_PUBLIC_ENV === "production";

export const metadata: Metadata = {
  title: "Avidelta",
  description: "Avidelta — advisory & ops systems.",
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
  metadataBase: isProd ? new URL("https://yourdomain.com") : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
