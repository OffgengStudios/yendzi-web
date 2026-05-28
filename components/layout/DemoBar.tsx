"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingBag, Leaf, BarChart2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../lib/store/auth";
import { useCartStore } from "../../lib/store/cart";
import { products } from "../../lib/mock-data/products";

export const DEMO_KEY = "yendzi_demo";

type Persona = "consumer" | "farmer" | "investor";

const PERSONAS = [
  { key: "consumer" as Persona, label: "Consumer", icon: ShoppingBag },
  { key: "farmer"   as Persona, label: "Farmer",   icon: Leaf },
  { key: "investor" as Persona, label: "Investor",  icon: BarChart2 },
];

const glassStyle: React.CSSProperties = {
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  background: "rgba(10, 35, 18, 0.72)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.10)",
};

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

export function DemoBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [persona, setPersona] = useState<Persona>("consumer");

  useEffect(() => {
    if (searchParams.get("demo") === "1") {
      sessionStorage.setItem(DEMO_KEY, "1");
    }
    setVisible(sessionStorage.getItem(DEMO_KEY) === "1");
  }, [searchParams]);

  const exit = () => {
    sessionStorage.removeItem(DEMO_KEY);
    setVisible(false);
  };

  const switchPersona = (p: Persona) => {
    setPersona(p);
    if (p === "consumer") {
      useAuthStore.getState().login("0551234567", "Ama Owusu", "customer");
      useCartStore.getState().clearCart();
      useCartStore.getState().addItem(products[0], 2);
      useCartStore.getState().addItem(products[1], 1);
      router.push("/shop");
    } else if (p === "farmer") {
      useAuthStore.getState().login("0241234567", "Kwame Asante", "vendor");
      router.push("/vendor/dashboard");
    } else {
      router.push("/for-business");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-10 right-0 z-[200]">

      {/* Collapsed stub */}
      <AnimatePresence>
        {collapsed && (
          <motion.button
            key="stub"
            onClick={() => setCollapsed(false)}
            aria-label="Expand demo panel"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            whileTap={{ scale: 0.88 }}
            transition={springTap}
            style={{ ...glassStyle, transformOrigin: "right center" }}
            className="absolute right-0 bottom-0 w-4 h-6 sm:w-5 sm:h-8 flex items-center justify-center rounded-l-md sm:rounded-l-lg border border-white/20 border-r-0"
          >
            <span
              className="text-white/60 font-bold text-[5px] sm:text-[6px] tracking-widest uppercase select-none"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              DEMO
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full panel */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="panel"
            className="flex items-stretch"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            style={{ transformOrigin: "right center" }}
          >
            {/* Left tab strip */}
            <div
              className="w-4 sm:w-5 flex items-center justify-center rounded-l-lg sm:rounded-l-xl border border-white/20 border-r-0 shrink-0"
              style={glassStyle}
            >
              <span
                className="text-white/50 font-bold text-[6px] sm:text-[7px] tracking-widest uppercase select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                DEMO
              </span>
            </div>

            {/* Panel body */}
            <div
              className="w-28 sm:w-36 overflow-hidden border-y border-r border-white/15"
              style={glassStyle}
            >
              <div className="flex items-center justify-between px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-white/10">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase text-white/60">
                    Demo
                  </span>
                </div>
                <motion.button
                  onClick={() => setCollapsed(true)}
                  whileTap={{ scale: 0.80 }}
                  transition={springTap}
                  aria-label="Collapse"
                  className="text-white/40 hover:text-white/80 transition-colors"
                >
                  <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </motion.button>
              </div>

              <div className="p-1 sm:p-1.5 flex flex-col gap-0.5">
                {PERSONAS.map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    onClick={() => switchPersona(key)}
                    whileTap={{ scale: 0.90 }}
                    transition={springTap}
                    className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all w-full text-left"
                    style={
                      persona === key
                        ? {
                            background: "rgba(255,255,255,0.18)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "rgba(255,255,255,0.95)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                          }
                        : { color: "rgba(255,255,255,0.55)", border: "1px solid transparent" }
                    }
                  >
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                    {label}
                  </motion.button>
                ))}
              </div>

              <div className="px-2 sm:px-2.5 pb-1.5 sm:pb-2">
                <motion.button
                  onClick={exit}
                  whileTap={{ scale: 0.90 }}
                  transition={springTap}
                  className="text-[8px] sm:text-[9px] text-white/25 hover:text-white/55 transition-colors"
                >
                  Exit demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
