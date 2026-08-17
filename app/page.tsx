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

      {/* The three-icon value-prop row that lived here said what the rest of
          the page already shows. One line of terms replaces it. */}
      <ScrollReveal>
        <section className="bg-cream border-y border-charcoal/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="type-stencil text-charcoal-light">Terms</p>
            <p className="text-sm text-charcoal">
              Delivery GHS <span className="tnum">25</span> across Accra
            </p>
            <p className="text-sm text-charcoal">Orders close <span className="tnum">12:00</span></p>
            <p className="text-sm text-charcoal">Not fresh? Refunded, no questions</p>
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
