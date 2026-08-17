"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Truck, Leaf, Bell, Banknote, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const customerSteps = [
  {
    icon: Search,
    num: "Any time",
    title: "Browse by freshness",
    desc: "Every product shows its harvest date. Filter by category, location, or badge — organic, local, seasonal.",
  },
  {
    icon: ShoppingCart,
    num: "Before 12:00",
    title: "Order in seconds",
    desc: "Add to cart, pick a delivery slot that works for you, and pay via MoMo, Telecel Cash, or card — all in under 3 minutes.",
  },
  {
    icon: Truck,
    num: "By 18:00",
    title: "Delivered same day",
    desc: "Your produce leaves the farm within hours. Track your order in real time and receive it at your door — fresh, not frozen.",
  },
];

const farmerSteps = [
  {
    icon: Leaf,
    num: "2 minutes",
    title: "List your harvest",
    desc: "Apply in 2 minutes. Once approved, list your products with photos, prices, and available stock — no technical skills needed.",
  },
  {
    icon: Bell,
    num: "Instant",
    title: "Get notified on orders",
    desc: "When a customer orders, you get an instant WhatsApp alert. Pack the order and Yendzi handles pickup and delivery.",
  },
  {
    icon: Banknote,
    num: "Every Friday",
    title: "Get paid via MoMo",
    desc: "Earnings land in your MTN MoMo or Telecel Cash wallet every Friday — no bank account required. No middlemen. Full transparency.",
  },
];

export function HowItWorks() {
  const [tab, setTab] = useState<"customer" | "farmer">("customer");
  const steps = tab === "customer" ? customerSteps : farmerSteps;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-charcoal/15 pb-4 mb-8">
          <div>
            <p className="type-stencil text-terra mb-2">The Yendzi model</p>
            <h2 className="type-h2 text-charcoal">No middlemen. No cold storage.</h2>
          </div>
        </div>

        {/* Tab toggle */}
        <div className="flex mb-10">
          <div className="flex border border-charcoal/20">
            <motion.button
              onClick={() => setTab("customer")}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={clsx(
                "px-6 py-2.5 text-sm font-semibold transition-colors",
                tab === "customer"
                  ? "bg-green-deep text-cream"
                  : "text-charcoal-light hover:text-charcoal"
              )}
            >
              I want to buy
            </motion.button>
            <motion.button
              onClick={() => setTab("farmer")}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={clsx(
                "px-6 py-2.5 text-sm font-semibold transition-colors",
                tab === "farmer"
                  ? "bg-green-deep text-cream shadow-sm"
                  : "text-charcoal-light hover:text-charcoal"
              )}
            >
              I want to sell
            </motion.button>
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line — desktop only */}
                {i < steps.length - 1 && <span className="sr-only">then</span>}

                <div className="relative z-10 border-t-2 border-charcoal/20 pt-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <step.icon className="w-5 h-5 text-green-deep" strokeWidth={1.7} />
                    <p className="type-stencil text-terra">{step.num}</p>
                  </div>
                  <h3 className="type-h3 text-charcoal mb-1.5">{step.title}</h3>
                  <p className="text-charcoal-light text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {tab === "customer" ? (
            <>
              <Link
                href="/shop"
                className="flex items-center gap-2 bg-green-deep text-cream px-8 py-3.5 font-semibold text-sm hover:bg-green-mid transition-colors"
              >
                Start shopping <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/signup"
                className="text-sm text-charcoal-light hover:text-charcoal font-medium transition-colors"
              >
                Create a free account →
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/vendor/apply"
                className="flex items-center gap-2 bg-terra text-cream px-8 py-3.5 font-semibold text-sm hover:bg-terra/85 transition-colors"
              >
                Apply to sell on Yendzi <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/for-business"
                className="text-sm text-charcoal-light hover:text-charcoal font-medium transition-colors"
              >
                B2B bulk supply →
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
