"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../lib/store/cart";
import { Button } from "../ui/Button";
import type { Product } from "../../lib/types";

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
}

export function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedQty, setSelectedQty] = useState(Math.max(quantity, product.minQty));
  const [added, setAdded] = useState(false);
  const step = product.minQty;
  const formatQty = (value: number) => Number.isInteger(value) ? value : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");

  const handleAdd = () => {
    addItem(product, selectedQty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-2xl border border-cream-dark bg-white p-2">
        <motion.button
          type="button"
          onClick={() => setSelectedQty((q) => Math.max(product.minQty, Number((q - step).toFixed(2))))}
          whileTap={{ scale: 0.82 }}
          transition={springTap}
          className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-charcoal hover:bg-cream-dark transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <div className="text-center">
          <p className="font-heading text-2xl font-bold text-charcoal">{formatQty(selectedQty)}</p>
          <p className="text-xs text-charcoal-light">Buying by {product.unit}</p>
        </div>
        <motion.button
          type="button"
          onClick={() => setSelectedQty((q) => Number((q + step).toFixed(2)))}
          whileTap={{ scale: 0.82 }}
          transition={springTap}
          className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-charcoal hover:bg-cream-dark transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>
      <Button
        onClick={handleAdd}
        size="lg"
        fullWidth
        className={added ? "bg-green-mid" : ""}
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-5 h-5" /> Added to Cart
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <ShoppingCart className="w-5 h-5" /> Add {formatQty(selectedQty)} {product.unit}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
