"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { FreshnessBadge } from "../product/FreshnessBadge";
import { useCartStore } from "../../lib/store/cart";
import { useToastStore } from "../../lib/store/toast";
import type { Product } from "../../lib/types";

interface ProductCardProps {
  product: Product;
}

/**
 * A lot ticket, not a marketing card.
 *
 * The farm and the cutting date are the things Yendzi can claim and nobody
 * else can, so they get typographic weight. Rating and badges were competing
 * with them for attention and have been demoted. Prices are tabular so they
 * line up down a column the way a written price list does.
 */
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToastStore((s) => s.push);

  return (
    <motion.article
      className="group bg-white border border-charcoal/15 flex flex-col h-full"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Link href={`/shop/${product.slug}`} className="block relative aspect-[5/4] overflow-hidden bg-cream-dark">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute top-0 left-0">
          <FreshnessBadge
            harvestDate={product.harvestDate}
            action={product.harvestAction}
            category={product.category}
            size="sm"
          />
        </div>
      </Link>

      <div className="p-3.5 flex flex-col flex-1 gap-3">
        <div className="min-h-[3.75rem]">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="type-h3 text-charcoal hover:text-green-deep transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-[12.5px] text-charcoal-light leading-snug mt-1">
            {product.farmer.name} · {product.farmer.location.split(",")[0]}
          </p>
        </div>

        {/* Price row pinned to the bottom so every card in a row aligns. */}
        <div className="mt-auto flex items-end justify-between gap-2 border-t border-charcoal/10 pt-3">
          <div className="min-w-0">
            <p className="type-price text-xl text-charcoal leading-none">
              GHS&nbsp;{product.price}
            </p>
            <p className="text-[12px] text-charcoal-light mt-1 truncate">
              per {product.unit}
            </p>
          </div>
          <motion.button
            onClick={() => {
              addItem(product, product.minQty);
              toast(`${product.name} added`);
            }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="w-10 h-10 bg-green-deep text-cream flex items-center justify-center hover:bg-green-mid transition-colors shrink-0"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-4 h-4" strokeWidth={2.4} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
