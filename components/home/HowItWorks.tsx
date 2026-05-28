"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Truck, Leaf, Bell, Banknote, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const customerSteps = [
  {
    icon: Search,
    num: "01",
    title: "Browse by freshness",
    desc: "Every product shows its harvest date. Filter by category, location, or badge — organic, local, seasonal.",
    color: "bg-green-light",
    iconColor: "text-green-deep",
  },
  {
    icon: ShoppingCart,
    num: "02",
    title: "Order in seconds",
    desc: "Add to cart, pick a delivery slot that works for you, and pay via MoMo, Telecel Cash, or card — all in under 3 minutes.",
    color: "bg-soft-yellow-light",
    iconColor: "text-charcoal",
  },
  {
    icon: Truck,
    num: "03",
    title: "Delivered same day",
    desc: "Your produce leaves the farm within hours. Track your order in real time and receive it at your door — fresh, not frozen.",
    color: "bg-terra-light",
    iconColor: "text-terra",
  },
];

const farmerSteps = [
  {
    icon: Leaf,
    num: "01",
    title: "List your harvest",
    desc: "Apply in 2 minutes. Once approved, list your products with photos, prices, and available stock — no technical skills needed.",
    color: "bg-green-light",
    iconColor: "text-green-deep",
  },
  {
    icon: Bell,
    num: "02",
    title: "Get notified on orders",
    desc: "When a customer orders, you get an instant WhatsApp alert. Pack the order and Yendzi handles pickup and delivery.",
    color: "bg-soft-yellow-light",
    iconColor: "text-charcoal",
  },
  {
    icon: Banknote,
    num: "03",
    title: "Get paid via MoMo",
    desc: "Earnings land in your MTN MoMo or Telecel Cash wallet every Friday — no bank account required. No middlemen. Full transparency.",
    color: "bg-terra-light",
    iconColor: "text-terra",
  },
];

export function HowItWorks() {
  const [tab, setTab] = useState<"customer" | "farmer">("customer");
  const steps = tab === "customer" ? customerSteps : farmerSteps;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-3">The Yendzi Model</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            How it works
          </h2>
          <p className="text-charcoal-light text-base max-w-md mx-auto">
            A direct marketplace connecting Ghanaian farmers to urban households — no middlemen, no cold storage.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-cream rounded-full p-1 gap-1">
            <motion.button
              onClick={() => setTab("customer")}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={clsx(
                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all",
                tab === "customer"
                  ? "bg-green-deep text-cream shadow-sm"
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
                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all",
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
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px border-t-2 border-dashed border-cream-dark z-0" />
                )}

                <div className="relative z-10 flex flex-col items-center text-center sm:block sm:text-left">
                  <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto sm:mx-0", step.color)}>
                    <step.icon className={clsx("w-7 h-7", step.iconColor)} />
                  </div>
                  <p className="text-xs font-bold text-charcoal-light tracking-widest mb-1">{step.num}</p>
                  <h3 className="font-heading font-bold text-charcoal text-lg mb-2">{step.title}</h3>
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
                className="flex items-center gap-2 bg-green-deep text-cream px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-green-mid transition-colors"
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
                className="flex items-center gap-2 bg-terra text-cream px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-terra/85 transition-colors"
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
