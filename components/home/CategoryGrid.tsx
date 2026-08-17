import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../../lib/mock-data/categories";
import { products } from "../../lib/mock-data/products";
import { Icon } from "../ui/Icon";

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between gap-6 mb-8 border-b border-charcoal/15 pb-4">
        <h2 className="type-h2 text-charcoal">The stalls</h2>
        <p className="type-stencil text-charcoal-light pb-1 shrink-0">
          {products.length} lots today
        </p>
      </div>

      {/* A row of crates: hard edges, hairline rules, counts carrying the weight. */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group relative bg-cream hover:bg-green-light transition-colors duration-150 p-5 sm:p-6 flex flex-col gap-6 min-h-40"
            >
              <div className="flex items-start justify-between">
                <Icon name={cat.icon} className="w-6 h-6 text-green-deep" />
                <span className="type-price text-2xl text-charcoal/25 group-hover:text-green-deep transition-colors">
                  {String(count).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-auto">
                <h3 className="type-h3 text-charcoal flex items-center gap-1.5">
                  {cat.name}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                </h3>
                <p className="text-[13px] text-charcoal-light leading-snug mt-1">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
