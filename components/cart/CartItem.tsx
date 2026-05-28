"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../../lib/store/cart";
import type { CartItem as CartItemType } from "../../lib/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQty, removeItem } = useCartStore();
  const { product, quantity } = item;
  const step = product.minQty;
  const formatQty = (value: number) => Number.isInteger(value) ? value : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");

  return (
    <li className="flex gap-4 bg-white rounded-2xl p-4 border border-cream-dark">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-charcoal">{product.name}</p>
        <p className="text-sm text-charcoal-light mt-0.5">
          GHS {product.price} / {product.unit} · {product.farmer.name}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 bg-cream rounded-full px-3 py-1">
            <button
              onClick={() => updateQty(product.id, quantity - step)}
              className="w-5 h-5 flex items-center justify-center hover:text-green-deep transition-colors"
              aria-label="Decrease"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-medium min-w-6 text-center">{formatQty(quantity)}</span>
            <button
              onClick={() => updateQty(product.id, quantity + step)}
              className="w-5 h-5 flex items-center justify-center hover:text-green-deep transition-colors"
              aria-label="Increase"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-green-deep">
              GHS {(product.price * quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(product.id)}
              className="text-charcoal-light hover:text-red-500 transition-colors"
              aria-label="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
