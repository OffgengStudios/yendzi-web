"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../lib/store/cart";
import { useAuthStore } from "../../lib/store/auth";
import { useToastStore } from "../../lib/store/toast";
import { useHydrated } from "../../lib/hooks/useHydrated";
import { CartItem } from "../../components/cart/CartItem";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { openPaystackCheckout } from "../../lib/paystack";
import { MapPin, Clock, CreditCard, Check, Loader2, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const DELIVERY_AREAS = [
  "East Legon", "Labone", "Cantonments", "Airport Residential",
  "Spintex", "Tema", "Adenta", "Haatso", "Achimota", "Osu",
  "Dzorwulu", "Abelenkpe", "Tesano", "Roman Ridge",
];

const DELIVERY_SLOTS = [
  { id: "s1", label: "Tomorrow, 7am – 10am" },
  { id: "s2", label: "Tomorrow, 10am – 1pm" },
  { id: "s3", label: "Tomorrow, 3pm – 6pm" },
  { id: "s4", label: "Day after, 7am – 10am" },
  { id: "s5", label: "Day after, 10am – 1pm" },
];

type Step = "address" | "slot" | "payment";

const STEPS: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: "address", label: "Address", icon: <MapPin className="w-4 h-4" /> },
  { id: "slot", label: "Delivery", icon: <Clock className="w-4 h-4" /> },
  { id: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
];

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const pushToast = useToastStore((s) => s.push);
  const hydrated = useHydrated();
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState({ area: "", street: "", notes: "" });
  const [slot, setSlot] = useState("");
  const [paying, setPaying] = useState(false);
  // Set the moment payment succeeds, before the cart is emptied, so the
  // empty-cart guard below does not bounce the customer away from the
  // confirmation page they are being routed to.
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartTotal = total();
  const deliveryFee = 25;
  const grandTotal = cartTotal + deliveryFee;

  useEffect(() => {
    // Both guards read localStorage-backed stores, which are still empty on
    // the first effect pass — acting then threw signed-in customers with a
    // full cart back to /shop.
    if (!hydrated || orderPlaced) return;
    if (!isAuthenticated) {
      router.replace("/signup");
      return;
    }
    if (items.length === 0) router.replace("/shop");
  }, [hydrated, isAuthenticated, items.length, orderPlaced, router]);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const handlePayment = () => {
    if (!user) return;
    setPaying(true);
    openPaystackCheckout({
      email: user.email ?? `${user.phone.replace(/\s/g, "")}@yendzi.app`,
      amountGHS: grandTotal,
      phone: user.phone,
      firstName: user.name,
      onSuccess: (reference) => {
        setOrderPlaced(true);
        clearCart();
        router.push(`/order-confirmed?ref=${reference}`);
      },
      onCancel: () => setPaying(false),
      // Covers both a modal that never opened and one that failed after
      // opening — either way the button must not stay disabled.
      onFailure: (message) => {
        setPaying(false);
        pushToast(message, "error");
      },
    });
  };

  if (!hydrated) return null;
  if (items.length === 0 && !orderPlaced) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-bold text-charcoal mb-5 sm:mb-8">Checkout</h1>

      {/* Mobile order summary banner */}
      <div className="lg:hidden bg-white rounded-2xl border border-cream-dark px-5 py-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-charcoal-light font-medium">{items.length} item{items.length > 1 ? "s" : ""}</p>
          <p className="font-heading font-bold text-charcoal text-lg">GHS {grandTotal.toFixed(2)}</p>
        </div>
        <div className="text-xs text-charcoal-light text-right">
          <p>Subtotal GHS {cartTotal.toFixed(2)}</p>
          <p>+ Delivery GHS {deliveryFee.toFixed(2)}</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: stepIndex === i ? 1 : 0.95,
                }}
                transition={springTap}
                className={clsx(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                  stepIndex > i
                    ? "bg-green-deep text-cream"
                    : stepIndex === i
                    ? "bg-green-deep text-cream ring-4 ring-green-light"
                    : "bg-cream-dark text-charcoal-light"
                )}
              >
                {stepIndex > i ? <Check className="w-4 h-4" /> : s.icon}
              </motion.div>
              <span
                className={clsx(
                  "text-sm font-medium hidden sm:block",
                  stepIndex >= i ? "text-charcoal" : "text-charcoal-light"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <motion.div
                animate={{ backgroundColor: stepIndex > i ? "var(--color-green-deep, #1e5a32)" : "var(--color-cream-dark, #e8e0d0)" }}
                transition={{ duration: 0.3 }}
                className={clsx("flex-1 h-0.5 mx-3")}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Steps */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {step === "address" && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="bg-white rounded-2xl p-6 border border-cream-dark"
              >
                <h2 className="font-heading text-xl font-bold text-charcoal mb-5">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1.5 block">
                      Delivery Area *
                    </label>
                    <select
                      value={address.area}
                      onChange={(e) => setAddress({ ...address, area: e.target.value })}
                      className="w-full rounded-xl border border-cream-dark px-4 py-3 text-charcoal bg-white outline-none focus:border-green-deep focus:ring-2 focus:ring-green-deep/10"
                    >
                      <option value="">Select your area</option>
                      {DELIVERY_AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Street Address"
                    placeholder="House / Street name"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  />
                  <Input
                    label="Delivery Notes (optional)"
                    placeholder="Gate colour, landmark, etc."
                    value={address.notes}
                    onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                  />
                </div>
                <Button
                  fullWidth
                  size="lg"
                  className="mt-6"
                  disabled={!address.area || !address.street}
                  onClick={() => setStep("slot")}
                >
                  Continue to Delivery Slot
                </Button>
              </motion.div>
            )}

            {step === "slot" && (
              <motion.div
                key="slot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="bg-white rounded-2xl p-6 border border-cream-dark"
              >
                <h2 className="font-heading text-xl font-bold text-charcoal mb-2">Choose Delivery Slot</h2>
                <p className="text-charcoal-light text-sm mb-5">
                  Delivering to <strong>{address.area}</strong>
                </p>
                <div className="space-y-3">
                  {DELIVERY_SLOTS.map((s) => (
                    <motion.label
                      key={s.id}
                      whileTap={{ scale: 0.98 }}
                      transition={springTap}
                      className={clsx(
                        "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                        slot === s.id
                          ? "border-green-deep bg-green-light"
                          : "border-cream-dark hover:border-green-mid"
                      )}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={s.id}
                        checked={slot === s.id}
                        onChange={() => setSlot(s.id)}
                        className="accent-green-deep"
                      />
                      <div>
                        <p className="font-medium text-charcoal text-sm">{s.label}</p>
                        <p className="text-xs text-charcoal-light">GHS {deliveryFee} delivery fee</p>
                      </div>
                    </motion.label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep("address")}>Back</Button>
                  <Button fullWidth disabled={!slot} onClick={() => setStep("payment")}>
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="bg-white rounded-2xl p-6 border border-cream-dark"
              >
                <h2 className="font-heading text-xl font-bold text-charcoal mb-5">Review & Pay</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-cream rounded-xl text-sm">
                    <MapPin className="w-4 h-4 text-green-deep shrink-0" />
                    <span className="text-charcoal-light">Delivering to</span>
                    <span className="font-medium text-charcoal ml-auto text-right">
                      {address.street}, {address.area}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cream rounded-xl text-sm">
                    <Clock className="w-4 h-4 text-terra shrink-0" />
                    <span className="text-charcoal-light">Slot</span>
                    <span className="font-medium text-charcoal ml-auto text-right">
                      {DELIVERY_SLOTS.find((s) => s.id === slot)?.label}
                    </span>
                  </div>
                </div>

                <div className="border-t border-cream-dark pt-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between text-charcoal-light">
                    <span>Subtotal ({items.length} items)</span>
                    <span>GHS {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light">
                    <span>Delivery fee</span>
                    <span>GHS {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-charcoal text-base pt-2 border-t border-cream-dark">
                    <span>Total</span>
                    <span>GHS {grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-light rounded-xl p-4 mb-5 text-sm text-charcoal">
                  <p className="font-medium mb-1 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-green-deep shrink-0" />
                    Pay with Mobile Money or card
                  </p>
                  <p className="text-charcoal-light">
                    MTN MoMo, Telecel Cash, AirtelTigo Money, or Visa/Mastercard — powered by Paystack.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("slot")}>Back</Button>
                  <Button fullWidth size="lg" onClick={handlePayment} disabled={paying}>
                    <AnimatePresence mode="wait" initial={false}>
                      {paying ? (
                        <motion.span
                          key="paying"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Opening payment…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                        >
                          Pay GHS {grandTotal.toFixed(2)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-cream-dark overflow-hidden sticky top-24">
            <div className="px-5 py-4 border-b border-cream-dark">
              <h3 className="font-heading font-bold text-lg text-charcoal">
                Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
              </h3>
            </div>
            <div className="max-h-72 overflow-y-auto">
              <ul className="p-3 space-y-2">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </ul>
            </div>
            <div className="px-5 py-4 border-t border-cream-dark">
              <div className="flex justify-between font-bold text-charcoal">
                <span>Total</span>
                <span className="text-green-deep">GHS {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
