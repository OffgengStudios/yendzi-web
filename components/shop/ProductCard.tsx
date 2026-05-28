"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { ProductBadge } from "../ui/Badge";
import { FreshnessBadge } from "../product/FreshnessBadge";
import { useCartStore } from "../../lib/store/cart";
import { useToastStore } from "../../lib/store/toast";
import type { Product } from "../../lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToastStore((s) => s.push);

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-cream-dark"
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <FreshnessBadge harvestDate={product.harvestDate} size="sm" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {product.badges.slice(0, 2).map((badge) => (
            <ProductBadge key={badge} badge={badge} size="sm" />
          ))}
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-charcoal text-base leading-snug hover:text-green-deep transition-colors mb-0.5">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-charcoal-light mb-2">
          by {product.farmer.name} · {product.farmer.location.split(",")[0]}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-soft-yellow text-soft-yellow" />
          <span className="text-xs font-medium text-charcoal">{product.rating}</span>
          <span className="text-xs text-charcoal-light">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="font-heading font-bold text-lg text-charcoal">
              GHS {product.price}
            </span>
            <span className="text-xs text-charcoal-light ml-1">/ {product.unit}</span>
          </div>
          <motion.button
            onClick={() => { addItem(product, product.minQty); toast(`${product.name} added to cart`); }}
            whileTap={{ scale: 0.82 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="w-11 h-11 bg-green-deep text-cream rounded-full flex items-center justify-center hover:bg-green-mid transition-colors shrink-0"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
