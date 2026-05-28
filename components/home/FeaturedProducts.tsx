import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "../../lib/mock-data/products";
import { ProductCard } from "../shop/ProductCard";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-1">
            Fresh Today
          </h2>
          <p className="text-charcoal-light text-sm">
            Harvested this morning, at your door tonight
          </p>
        </div>
        <Link
          href="/shop"
          className="hidden sm:flex items-center gap-1.5 text-green-deep text-sm font-semibold hover:gap-2.5 transition-all"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="sm:hidden mt-6 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-green-deep text-sm font-semibold"
        >
          View all products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
