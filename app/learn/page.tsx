import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { LearnArticles } from "../../components/learn/LearnArticles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn — Yendzi",
  description: "Guides on seasonal eating, Ghanaian produce, storage tips, and supporting local farmers.",
};

const featured = {
  category: "Seasonal Eating",
  title: "What's in season in Ghana right now — May & June guide",
  excerpt:
    "The rainy season brings an abundance of leafy greens, garden eggs, and the first wave of mangoes from the Volta Region. Here's what to buy, why it's better now, and how to cook it.",
  readTime: "5 min read",
  image: "https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export default function LearnPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Learn
          </h1>
          <p className="text-charcoal-light text-lg max-w-xl mx-auto leading-relaxed">
            Guides on seasonal produce, Ghanaian cooking, storage tips, and the farmers
            who grow your food.
          </p>
        </div>

        {/* Featured article */}
        <Link href="/learn" className="block group mb-12">
          <div className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-end">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
            <div className="relative p-8 sm:p-12 text-cream w-full">
              <span className="inline-block bg-terra text-cream text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
                {featured.category}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-3 max-w-2xl">
                {featured.title}
              </h2>
              <p className="text-cream/75 text-sm sm:text-base leading-relaxed max-w-xl mb-5">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-cream/60 text-sm">
                  <Clock className="w-4 h-4" /> {featured.readTime}
                </span>
                <span className="flex items-center gap-1.5 text-soft-yellow text-sm font-medium group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Category filter + article grid (client component) */}
        <LearnArticles />
      </section>

      {/* Newsletter CTA */}
      <section className="bg-terra-light py-14 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
            Get the seasonal guide each month
          </h2>
          <p className="text-charcoal-light text-sm mb-8">
            We&apos;ll tell you what&apos;s at peak freshness, which farms are harvesting, and what to cook
            with it — delivered to your inbox, never more than once a month.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border border-cream-dark rounded-full px-5 py-3 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep bg-white"
            />
            <button
              type="submit"
              className="bg-green-deep text-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-green-mid transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-charcoal-light mt-3">No spam. Unsubscribe any time.</p>
        </div>
      </section>
    </div>
  );
}
