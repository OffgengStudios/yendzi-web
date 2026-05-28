"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, Truck, Leaf } from "lucide-react";
import { Button } from "../../components/ui/Button";

function OrderConfirmedContent() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "YNZ-DEMO";
  const orderNumber = ref.replace("YNZ-", "#YNZ-").toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-green-light rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-deep" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-terra rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-cream" />
            </div>
          </div>
        </div>

        <h1 className="font-heading text-3xl font-bold text-charcoal mb-3">
          Order Confirmed!
        </h1>
        <p className="text-charcoal-light text-base mb-2">
          Akwaaaba — your order is on its way! 🎉
        </p>
        <p className="text-charcoal-light text-sm mb-8">
          Our farmers are preparing your fresh produce right now.
        </p>

        {/* Order info card */}
        <div className="bg-white rounded-2xl border border-cream-dark p-6 mb-6 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-charcoal-light">Order reference</span>
            <span className="font-mono font-semibold text-charcoal text-sm">{orderNumber}</span>
          </div>

          <div className="flex items-center gap-3 bg-green-light rounded-xl p-4">
            <Truck className="w-5 h-5 text-green-deep shrink-0" />
            <div>
              <p className="font-medium text-charcoal text-sm">Delivery scheduled</p>
              <p className="text-xs text-charcoal-light mt-0.5">
                You&apos;ll receive an SMS confirmation shortly with your delivery window.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {[
              { label: "Order received", done: true },
              { label: "Farmer notified", done: true },
              { label: "Preparing your produce", done: false },
              { label: "Out for delivery", done: false },
              { label: "Delivered", done: false },
            ].map((status) => (
              <div key={status.label} className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                    status.done
                      ? "bg-green-deep text-cream"
                      : "border-2 border-cream-dark"
                  }`}
                >
                  {status.done && "✓"}
                </div>
                <span className={status.done ? "text-charcoal" : "text-charcoal-light"}>
                  {status.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/shop">
            <Button fullWidth size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" fullWidth>
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-charcoal-light mt-6">
          Questions? WhatsApp us at{" "}
          <span className="font-medium text-green-deep">+233 XX XXX XXXX</span>
        </p>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-charcoal-light">Loading...</p></div>}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
