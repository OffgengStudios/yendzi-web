import Link from "next/link";
import { categories } from "../../lib/mock-data/categories";

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-2">
          Shop by Category
        </h2>
        <p className="text-charcoal-light text-base">
          Everything fresh, local, and delivered with care
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.id}`}
            className={`group flex flex-col items-center gap-3 p-5 rounded-2xl hover:shadow-md hover:scale-[1.04] transition-all duration-200 ${cat.color}`}
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
              {cat.icon}
            </span>
            <span className="text-xs font-semibold text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
