import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import LeadForm from "@/components/sections/lead-form";
import Metrics from "@/components/sections/metrics";
import Outcomes from "@/components/sections/outcomes";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import {
  contactCopy,
  ctaContent,
  faqItems,
  features,
  heroContent,
  metrics,
  outcomes,
  pricing,
  testimonials,
} from "@/lib/content";

export default function Home() {
  return (
    <div className="space-y-6 pb-8">
      <Hero content={heroContent} />
      <Metrics items={metrics} />
      <Features items={features} />
      <Outcomes items={outcomes} />
      <Testimonials items={testimonials} />
      <Pricing tiers={pricing} />
      <LeadForm content={contactCopy} />
      <FAQ items={faqItems} />
      <CTA content={ctaContent} />
    </div>
  );
}
