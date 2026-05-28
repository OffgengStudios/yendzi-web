"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { href: "/",        icon: Home,        label: "Home" },
  { href: "/shop",    icon: ShoppingBag, label: "Shop" },
  { href: "/account", icon: User,        label: "Account" },
];

const glassNav: React.CSSProperties = {
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  background: "rgba(255, 255, 255, 0.78)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1), inset 0 0 0 1px rgba(255,255,255,0.5)",
  borderTop: "1px solid rgba(255,255,255,0.9)",
};

export function BottomNav() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/vendor") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/verify")
  ) return null;

  return (
    <nav
      className="md:hidden fixed left-3 right-3 z-50 h-16 rounded-2xl flex items-stretch border border-white/60 overflow-hidden"
      style={{ ...glassNav, bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      {tabs.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center justify-center gap-1 relative"
          >
            {active && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-xl"
                style={{
                  background: "rgba(30, 90, 50, 0.09)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 0 0 1px rgba(255,255,255,0.4)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <motion.div
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex flex-col items-center gap-1 relative z-10"
            >
              <tab.icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  active ? "text-green-deep stroke-[2.5]" : "text-charcoal-light stroke-2"
                }`}
              />
              <span
                className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                  active ? "text-green-deep" : "text-charcoal-light"
                }`}
              >
                {tab.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
