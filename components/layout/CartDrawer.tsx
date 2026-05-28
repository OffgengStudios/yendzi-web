"use client";

import { useEffect } from "react";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../lib/store/cart";
import { Button } from "../ui/Button";

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

const glassPanel: React.CSSProperties = {
  backdropFilter: "blur(16px) saturate(160%)",
  WebkitBackdropFilter: "blur(16px) saturate(160%)",
  background: "rgba(247,243,235,0.92)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.04)",
};

export function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, removeItem, updateQty, total } = useCartStore();
  const cartTotal = total();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-charcoal/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer — drag right to dismiss */}
      <motion.div
        className="fixed top-16 right-0 h-[calc(100%-9rem)] sm:h-[calc(100%-4rem)] w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        drag={isOpen ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.4 }}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80 || info.velocity.x > 500) closeCart();
        }}
      >
        {/* Drag hint strip */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex items-center justify-center pointer-events-none">
          <div className="w-0.5 h-12 rounded-full bg-charcoal/10" />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-white/50"
          style={glassPanel}
        >
          <h2 className="font-heading text-xl font-bold text-charcoal flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-green-deep" />
            Your Cart
          </h2>
          <motion.button
            onClick={closeCart}
            whileTap={{ scale: 0.85 }}
            transition={springTap}
            className="p-1.5 rounded-full hover:bg-cream-dark transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-charcoal" />
          </motion.button>
        </div>

        {/* Items */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-5xl">🛒</div>
              <p className="text-charcoal-light text-sm">Your cart is empty.</p>
              <Button variant="outline" size="sm" onClick={() => { closeCart(); router.push("/shop"); }}>
                Start shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence initial={false}>
                {items.map(({ product, quantity }) => {
                  const step = product.minQty;
                  const qtyLabel = Number.isInteger(quantity) ? quantity : quantity.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");

                  return (
                    <motion.li
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="flex gap-4 bg-white rounded-2xl p-3"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-charcoal text-sm truncate">{product.name}</p>
                        <p className="text-xs text-charcoal-light mt-0.5">GHS {product.price} / {product.unit}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <motion.button
                              onClick={() => updateQty(product.id, quantity - step)}
                              whileTap={{ scale: 0.78 }}
                              transition={springTap}
                              className="w-6 h-6 rounded-full bg-cream-dark flex items-center justify-center hover:bg-green-light transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3 text-charcoal" />
                            </motion.button>
                            <span className="text-sm font-medium min-w-6 text-center">{qtyLabel}</span>
                            <motion.button
                              onClick={() => updateQty(product.id, quantity + step)}
                              whileTap={{ scale: 0.78 }}
                              transition={springTap}
                              className="w-6 h-6 rounded-full bg-cream-dark flex items-center justify-center hover:bg-green-light transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3 text-charcoal" />
                            </motion.button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-green-deep text-sm">
                              GHS {(product.price * quantity).toFixed(2)}
                            </span>
                            <motion.button
                              onClick={() => removeItem(product.id)}
                              whileTap={{ scale: 0.80 }}
                              transition={springTap}
                              className="p-1 text-charcoal-light hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/50 px-6 py-5" style={{ ...glassPanel, background: "rgba(255,255,255,0.92)" }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-charcoal-light text-sm">Subtotal</span>
              <span className="font-heading font-bold text-xl text-charcoal">
                GHS {cartTotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-charcoal-light mb-4 text-center">Delivery calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart}>
              <Button fullWidth size="lg">Proceed to Checkout</Button>
            </Link>
          </div>
        )}
      </motion.div>
    </>
  );
}
