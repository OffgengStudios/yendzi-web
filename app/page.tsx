import { HeroBanner } from "../components/home/HeroBanner";
import { MarqueeStrip } from "../components/home/MarqueeStrip";
import { HowItWorks } from "../components/home/HowItWorks";
import { LiveActivityFeed } from "../components/home/LiveActivityFeed";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { FarmerSpotlight } from "../components/home/FarmerSpotlight";
import { SubscriptionBoxes } from "../components/home/SubscriptionBoxes";
import { ImpactSection } from "../components/home/ImpactSection";
import { LearnPreview } from "../components/home/LearnPreview";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { Leaf, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="-mt-16">
        <HeroBanner />
      </div>

      <ScrollReveal>
        <LiveActivityFeed />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <MarqueeStrip />
      </ScrollReveal>

      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>

      <ScrollReveal>
        <CategoryGrid />
      </ScrollReveal>

      <ScrollReveal>
        <FeaturedProducts />
      </ScrollReveal>

      {/* Value props */}
      <ScrollReveal>
        <section className="bg-cream py-14 px-4">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <Leaf className="w-7 h-7 text-green-deep" />,
                  title: "100% Traceable",
                  desc: "Every product links to a named farmer with a verified farm location and story.",
                },
                {
                  icon: <Truck className="w-7 h-7 text-terra" />,
                  title: "Harvested & Delivered",
                  desc: "From farm to your door in under 24 hours. Fresh, not processed.",
                },
                {
                  icon: <ShieldCheck className="w-7 h-7 text-green-mid" />,
                  title: "Freshness Guarantee",
                  desc: "Not happy? We'll refund or replace — no questions asked.",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center gap-3 p-6">
                  <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-charcoal text-lg">{item.title}</h3>
                  <p className="text-charcoal-light text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <FarmerSpotlight />
      </ScrollReveal>

      <ScrollReveal>
        <SubscriptionBoxes />
      </ScrollReveal>

      <ScrollReveal>
        <ImpactSection />
      </ScrollReveal>

      <ScrollReveal>
        <LearnPreview />
      </ScrollReveal>

      {/* Newsletter CTA */}
      <ScrollReveal>
        <section className="bg-terra-light py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal mb-3">
              Yɛn Adze — Our Thing
            </h2>
            <p className="text-charcoal-light text-base mb-6">
              Join thousands of Accra households eating fresh, local, and supporting
              Ghanaian farmers every week.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-full border border-cream-dark px-5 py-3 text-sm outline-none focus:border-green-deep focus:ring-2 focus:ring-green-deep/10 bg-white"
              />
              <button
                type="submit"
                className="bg-green-deep text-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-green-mid transition-colors"
              >
                Get updates
              </button>
            </form>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
