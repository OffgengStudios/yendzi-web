"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Leaf, LogOut, ChevronRight, Menu, X, Banknote } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVendorStore } from "../../lib/store/vendor";

const navItems = [
  { href: "/vendor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/vendor/products",  icon: Package,         label: "Products" },
  { href: "/vendor/orders",    icon: ShoppingBag,     label: "Orders" },
  { href: "/vendor/payouts",   icon: Banknote,        label: "Payouts" },
];

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  const { businessName } = useVendorStore();

  return (
    <div className="h-full flex flex-col bg-green-deep text-cream">
      <div className="px-6 py-5 border-b border-green-light/10 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-terra rounded-full flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-cream" />
            </div>
            <span className="font-heading font-bold text-base">Yendzi</span>
          </div>
          <p className="text-[10px] text-green-light/60 font-medium tracking-wider uppercase pl-9">
            Vendor Portal
          </p>
        </div>
        {onNav && (
          <button
            onClick={onNav}
            className="p-1 text-cream/50 hover:text-cream transition-colors mt-0.5"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="px-6 py-4 border-b border-green-light/10">
        <p className="text-[10px] text-green-light/50 uppercase tracking-wider mb-1">Logged in as</p>
        <p className="text-sm font-semibold text-cream truncate">{businessName || "My Farm"}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNav}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-white/15 text-cream"
                  : "text-green-light/70 hover:bg-white/8 hover:text-cream"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-green-light/10">
        <Link
          href="/"
          onClick={onNav}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-green-light/60 hover:text-cream transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Back to Store
        </Link>
      </div>
    </div>
  );
}

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const currentLabel = navItems.find((item) => pathname.startsWith(item.href))?.label ?? "Vendor Portal";

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop sidebar */}
      <aside className="w-60 shrink-0 hidden md:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-charcoal/50 z-40 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="fixed inset-y-0 left-0 w-64 z-50 md:hidden"
            >
              <SidebarContent onNav={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-green-deep text-cream sticky top-0 z-30">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1 text-cream/80 hover:text-cream transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading font-bold text-base">{currentLabel}</span>
        </div>
        {children}
      </main>
    </div>
  );
}
