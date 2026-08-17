import { notFound } from "next/navigation";
import { Star, Package, Leaf, ShieldCheck, BadgeCheck } from "lucide-react";
import { products, getProductBySlug } from "../../../lib/mock-data/products";
import { ProductImages } from "../../../components/product/ProductImages";
import { FarmerCard } from "../../../components/product/FarmerCard";
import { FreshnessBadge } from "../../../components/product/FreshnessBadge";
import { ProductBadge } from "../../../components/ui/Badge";
import { AddToCartButton } from "../../../components/product/AddToCartButton";
import { ProductCard } from "../../../components/shop/ProductCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} — Yendzi` : "Product not found",
  };
}

const mockReviews = [
  { id: "r1", author: "Ama O.", rating: 5, comment: "Absolutely fresh! Arrived the same day, still had soil on them. Best tomatoes I've had in Accra.", date: "2026-05-20", verified: true },
  { id: "r2", author: "Kojo M.", rating: 5, comment: "My restaurant switched to Yendzi a month ago. Consistent quality, always on time.", date: "2026-05-15", verified: true },
  { id: "r3", author: "Nana A.", rating: 4, comment: "Love that I can see the farmer's name and location. Makes such a difference knowing where it comes from.", date: "2026-05-10", verified: true },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        {/* Images */}
        <ProductImages images={product.images} alt={product.name} />

        {/* Details — sticky on desktop while image scrolls */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <FreshnessBadge
              harvestDate={product.harvestDate}
              action={product.harvestAction}
              category={product.category}
              size="md"
            />
            {product.badges.map((badge) => (
              <ProductBadge key={badge} badge={badge} size="md" />
            ))}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(product.rating)
                      ? "fill-soft-yellow text-soft-yellow"
                      : "text-cream-dark"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-charcoal">{product.rating}</span>
            <span className="text-sm text-charcoal-light">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-6">
            <span className="font-heading text-4xl font-bold text-charcoal">
              GHS {product.price}
            </span>
            <span className="text-charcoal-light text-lg">/ {product.unit}</span>
          </div>

          <p className="text-charcoal-light text-base leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Product info */}
          <div className="bg-white rounded-2xl p-4 mb-6 grid grid-cols-2 gap-3 border border-cream-dark">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-deep" />
              <span className="text-xs text-charcoal-light capitalize">{product.harvestAction}</span>
              <span className="text-xs font-medium text-charcoal ml-auto">
                {new Date(product.harvestDate).toLocaleDateString("en-GH", { day: "numeric", month: "short" })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-terra" />
              <span className="text-xs text-charcoal-light">In stock</span>
              <span className="text-xs font-medium text-charcoal ml-auto">{product.inventoryQty} {product.unit}</span>
            </div>
          </div>

          {/* Add to cart — client component */}
          <AddToCartButtonSection product={JSON.parse(JSON.stringify(product))} />

          {/* Freshness guarantee */}
          <p className="text-xs text-charcoal-light text-center mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-green-mid shrink-0" />
            Freshness guaranteed — full refund if not satisfied
          </p>
        </div>
      </div>

      {/* Farmer card */}
      <div className="mb-16 max-w-xl">
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-5">Meet the Farmer</h2>
        <FarmerCard farmer={product.farmer} />
      </div>

      {/* Reviews */}
      <div className="mb-16">
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-5 border border-cream-dark">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-light rounded-full flex items-center justify-center text-sm font-semibold text-green-deep">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{review.author}</p>
                    {review.verified && (
                      <p className="text-xs text-green-mid flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5 shrink-0" /> Verified purchase
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-soft-yellow text-soft-yellow" : "text-cream-dark"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-charcoal-light text-sm leading-relaxed">{review.comment}</p>
              <p className="text-xs text-charcoal-light/60 mt-2">
                {new Date(review.date).toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">More from this Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AddToCartButtonSection({ product }: { product: Parameters<typeof AddToCartButton>[0]["product"] }) {
  return <AddToCartButton product={product} quantity={1} />;
}
