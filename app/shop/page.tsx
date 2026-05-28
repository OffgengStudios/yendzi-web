"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../lib/mock-data/products";
import { categories } from "../../lib/mock-data/categories";
import { ProductCard } from "../../components/shop/ProductCard";
import type { Badge, ProductCategory } from "../../lib/types";

const BADGE_OPTIONS: { value: Badge; label: string }[] = [
  { value: "organic", label: "Organic" },
  { value: "locally-grown", label: "Locally Grown" },
  { value: "eco-packaged", label: "Eco Packaged" },
  { value: "seasonal", label: "Seasonal" },
];

const SORT_OPTIONS = [
  { value: "freshness", label: "Freshness" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    (searchParams.get("category") as ProductCategory) || "all"
  );

  useEffect(() => {
    const cat = searchParams.get("category") as ProductCategory | null;
    setSelectedCategory(cat || "all");
  }, [searchParams]);
  const [selectedBadges, setSelectedBadges] = useState<Badge[]>([]);
  const [sort, setSort] = useState("freshness");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setShowFilters(false);
  }, [pathname]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBadges.length > 0) {
      result = result.filter((p) =>
        selectedBadges.every((b) => p.badges.includes(b))
      );
    }
    if (sort === "freshness") {
      result.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime());
    } else if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [selectedCategory, selectedBadges, sort]);

  const toggleBadge = (badge: Badge) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  const hasActiveFilters = selectedBadges.length > 0 || selectedCategory !== "all";
  const clearAll = () => { setSelectedCategory("all"); setSelectedBadges([]); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-1">
          Fresh from the Farm
        </h1>
        <p className="text-charcoal-light text-sm">{filtered.length} products available</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop only, sticky */}
        <aside className="hidden lg:block w-60 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-charcoal text-base">Filters</h2>
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileTap={{ scale: 0.88 }}
                  transition={springTap}
                  onClick={clearAll}
                  className="text-xs text-terra font-semibold hover:text-terra/70 transition-colors"
                >
                  Clear all
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Sort — desktop only in sidebar */}
          <div className="mb-7">
            <h3 className="font-semibold text-charcoal text-sm mb-3">Sort by</h3>
            <div className="space-y-1">
              {SORT_OPTIONS.map((o) => (
                <motion.button
                  key={o.value}
                  onClick={() => setSort(o.value)}
                  whileTap={{ scale: 0.96 }}
                  transition={springTap}
                  className={`w-full text-left text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    sort === o.value
                      ? "bg-green-deep text-cream font-medium"
                      : "text-charcoal hover:bg-cream-dark"
                  }`}
                >
                  {o.label}
                </motion.button>
              ))}
            </div>
          </div>

          <FilterPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBadges={selectedBadges}
            toggleBadge={toggleBadge}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile toolbar — floating glass pill, sticks below header */}
          <div className="lg:hidden sticky top-[72px] z-30 mb-4">
          <div
            className="flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 border border-white/60"
            style={{
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              background: "rgba(255,255,255,0.88)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)",
            }}
          >
            <motion.button
              whileTap={{ scale: 0.94 }}
              transition={springTap}
              className="flex items-center gap-2 text-sm font-medium text-charcoal border border-cream-dark rounded-full px-4 py-2 hover:border-green-deep transition-colors"
              onClick={() => setShowFilters(true)}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={springTap}
                    className="w-4 h-4 bg-green-deep text-cream text-xs rounded-full flex items-center justify-center"
                  >
                    {selectedBadges.length + (selectedCategory !== "all" ? 1 : 0)}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-charcoal-light">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-cream-dark rounded-full px-3 py-1.5 bg-white outline-none focus:border-green-deep"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🌱</p>
              <p className="text-charcoal-light">No products match your filters.</p>
              <motion.button
                whileTap={{ scale: 0.94 }}
                transition={springTap}
                onClick={clearAll}
                className="mt-4 text-green-deep text-sm font-semibold hover:underline"
              >
                Clear filters
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter — iOS-style bottom sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              className="fixed inset-0 bg-charcoal/40 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 bg-cream rounded-t-3xl shadow-2xl max-h-[88vh] flex flex-col overflow-hidden"
              style={{ boxShadow: "0 -4px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 500) setShowFilters(false);
              }}
            >
              {/* Drag handle */}
              <div className="flex flex-col items-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-charcoal/20" />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-6 py-3 shrink-0">
                <h2 className="font-heading font-bold text-lg">Filters</h2>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  transition={springTap}
                  onClick={() => setShowFilters(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-dark hover:bg-cream-dark/70 transition-colors"
                >
                  <X className="w-4 h-4 text-charcoal" />
                </motion.button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 pb-10">
                <FilterPanel
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBadges={selectedBadges}
                  toggleBadge={toggleBadge}
                />
                {hasActiveFilters && (
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    transition={springTap}
                    onClick={() => { clearAll(); setShowFilters(false); }}
                    className="mt-6 text-sm text-terra font-semibold"
                  >
                    Clear all filters
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPanel({
  selectedCategory,
  setSelectedCategory,
  selectedBadges,
  toggleBadge,
}: {
  selectedCategory: ProductCategory | "all";
  setSelectedCategory: (c: ProductCategory | "all") => void;
  selectedBadges: Badge[];
  toggleBadge: (b: Badge) => void;
}) {
  const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

  return (
    <div className="space-y-7">
      <div>
        <h3 className="font-semibold text-charcoal text-sm mb-3">Category</h3>
        <ul className="space-y-1">
          <li>
            <motion.button
              onClick={() => setSelectedCategory("all")}
              whileTap={{ scale: 0.96 }}
              transition={springTap}
              className={`w-full text-left text-sm px-3 py-2.5 rounded-lg transition-colors ${
                selectedCategory === "all"
                  ? "bg-green-deep text-cream font-medium"
                  : "text-charcoal hover:bg-cream-dark"
              }`}
            >
              All products
            </motion.button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <motion.button
                onClick={() => setSelectedCategory(cat.id)}
                whileTap={{ scale: 0.96 }}
                transition={springTap}
                className={`w-full text-left text-sm px-3 py-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-green-deep text-cream font-medium"
                    : "text-charcoal hover:bg-cream-dark"
                }`}
              >
                <span>{cat.icon}</span> {cat.name}
              </motion.button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-charcoal text-sm mb-3">Labels</h3>
        <div className="space-y-2">
          {BADGE_OPTIONS.map((opt) => (
            <motion.label
              key={opt.value}
              whileTap={{ scale: 0.96 }}
              transition={springTap}
              className="flex items-center gap-2.5 cursor-pointer group py-1.5"
            >
              <input
                type="checkbox"
                checked={selectedBadges.includes(opt.value)}
                onChange={() => toggleBadge(opt.value)}
                className="w-4 h-4 rounded accent-green-deep"
              />
              <span className="text-sm text-charcoal group-hover:text-green-deep transition-colors">
                {opt.label}
              </span>
            </motion.label>
          ))}
        </div>
      </div>
    </div>
  );
}
