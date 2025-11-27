import { CTA } from "./components/CTA";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white">
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
