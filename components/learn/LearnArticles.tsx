"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Leaf, Utensils, Sprout, Clock } from "lucide-react";

const articles = [
  {
    icon: Leaf,
    category: "Farming",
    title: "How regenerative farming works in the Ashanti Region",
    excerpt: "Meet the farmers switching to no-till and cover crops — and why your tomatoes taste better because of it.",
    readTime: "4 min",
    image: "https://images.pexels.com/photos/8540196/pexels-photo-8540196.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    icon: Utensils,
    category: "Cooking",
    title: "5 things you can do with garden eggs besides stew",
    excerpt: "Garden eggs are one of Ghana's most underused vegetables. Here are five simple ideas from our farmers' own kitchens.",
    readTime: "3 min",
    image: "https://images.pexels.com/photos/27935664/pexels-photo-27935664.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    icon: Sprout,
    category: "Storage",
    title: "How to keep plantain at every stage of ripeness",
    excerpt: "From green to very ripe — the right storage method for each stage, so nothing goes to waste.",
    readTime: "3 min",
    image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    icon: BookOpen,
    category: "Guides",
    title: "Understanding freshness dates on Yendzi products",
    excerpt: "What the harvest date actually means, how we calculate freshness scores, and why it matters for nutrition.",
    readTime: "4 min",
    image: "https://images.pexels.com/photos/36611201/pexels-photo-36611201.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    icon: Leaf,
    category: "Farming",
    title: "The journey from farm gate to your door — in 24 hours",
    excerpt: "A step-by-step look at how produce is harvested, inspected, packed, and delivered on the same day in Accra.",
    readTime: "5 min",
    image: "https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    icon: Utensils,
    category: "Cooking",
    title: "Quick yam dishes that aren't just ampesi",
    excerpt: "Yam is a Ghanaian staple, but there's a world beyond boiling it. Roasted, spiced, and fried — a weekend recipe set.",
    readTime: "6 min",
    image: "https://images.pexels.com/photos/15050245/pexels-photo-15050245.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
];

const categories = ["All", "Farming", "Cooking", "Storage", "Seasonal Eating", "Guides"];

export function LearnArticles() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      {/* Category pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              cat === active
                ? "bg-green-deep text-cream"
                : "bg-white border border-cream-dark text-charcoal hover:border-green-light hover:text-green-deep"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="col-span-3 text-center text-charcoal-light py-12">
            No articles in this category yet — check back soon.
          </p>
        ) : (
          filtered.map((a) => (
            <Link
              key={a.title}
              href="/learn"
              className="group bg-white rounded-2xl border border-cream-dark overflow-hidden hover:shadow-md hover:border-green-light transition-all duration-200 flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-white/90 text-green-deep text-xs font-semibold rounded-full px-2.5 py-1">
                    <a.icon className="w-3 h-3" /> {a.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-charcoal text-base leading-snug mb-2 group-hover:text-green-deep transition-colors">
                  {a.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed flex-1 mb-4">
                  {a.excerpt}
                </p>
                <span className="flex items-center gap-1.5 text-xs text-charcoal-light">
                  <Clock className="w-3.5 h-3.5" /> {a.readTime} read
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
