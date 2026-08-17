"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Leaf, LogOut, ChevronRight, Menu, X, Banknote } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useVendorStore } from "../../lib/store/vendor";

const navItems = [
  { href: "/vendor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/vendor/products",  icon: Package,         label: "Products" },
  { href: "/vendor/orders",    icon: ShoppingBag,     label: "Orders" },
  { href: "/vendor/payouts",   icon: Banknote,        label: "Payouts" },
];

const RAIL_W = 64;
const PANEL_W = 240;

interface SidebarProps {
  /** Desktop rail state. The mobile drawer is always expanded. */
  expanded: boolean;
  /** Desktop only — toggles the rail. */
  onToggle?: () => void;
  /** Mobile drawer only — closes it after a tap. */
  onNav?: () => void;
}

function SidebarContent({ expanded, onToggle, onNav }: SidebarProps) {
  const pathname = usePathname();
  const { businessName } = useVendorStore();

  // Collapsed, a row is an icon centred in the rail; expanded, it is an icon
  // and a label. Same height either way so nothing jumps as the rail moves.
  const row = (active: boolean) =>
    `flex items-center h-11 rounded-crate text-sm font-medium transition-colors ${
      expanded ? "gap-3 px-3" : "justify-center"
    } ${active ? "bg-white/15 text-cream" : "text-green-light/70 hover:bg-white/10 hover:text-cream"}`;

  return (
    <div className="h-full flex flex-col bg-green-deep text-cream">
      <div className={`border-b border-green-light/10 py-4 flex items-center gap-2.5 ${expanded ? "px-3" : "px-0 justify-center"}`}>
        <button
          onClick={onToggle ?? onNav}
          aria-label={onToggle ? (expanded ? "Collapse menu" : "Expand menu") : "Close menu"}
          aria-expanded={onToggle ? expanded : undefined}
          className="w-9 h-9 shrink-0 grid place-items-center rounded-crate text-cream/70 hover:text-cream hover:bg-white/10 transition-colors"
        >
          {onToggle ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>

        {expanded && (
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-crate bg-terra grid place-items-center shrink-0">
              <Leaf className="w-4 h-4 text-cream" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block font-heading font-bold text-base leading-none">Yendzi</span>
              <span className="block type-stencil text-green-light/50 mt-1 whitespace-nowrap">Vendor portal</span>
            </span>
          </div>
        )}
      </div>

      {expanded && (
        <div className="px-5 py-4 border-b border-green-light/10">
          <p className="type-stencil text-green-light/50 mb-1.5">Logged in as</p>
          <p className="text-sm font-semibold text-cream truncate">{businessName || "My Farm"}</p>
        </div>
      )}

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNav}
              // The label is the accessible name whether or not it is drawn,
              // and doubles as the hover tooltip once the rail is collapsed.
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              title={expanded ? undefined : item.label}
              className={row(active)}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {expanded && (
                <>
                  <span className="truncate">{item.label}</span>
                  {active && <ChevronRight className="w-3 h-3 ml-auto opacity-50 shrink-0" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-green-light/10">
        <Link
          href="/"
          onClick={onNav}
          aria-label="Back to store"
          title={expanded ? undefined : "Back to store"}
          className={row(false)}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {expanded && <span className="truncate">Back to store</span>}
        </Link>
      </div>
    </div>
  );
}

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Starts as a rail. The portal is four destinations deep — the labels are
  // worth a click, not a permanent quarter of the screen.
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const currentLabel = navItems.find((item) => pathname.startsWith(item.href))?.label ?? "Vendor portal";

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop rail. The terra edge is load-bearing: the sidebar and the
          /vendor/apply hero are both green-deep, so without it the boundary
          disappears. Terra is the one brand colour that separates from the
          green and from the cream on the other pages. */}
      <motion.aside
        className="hidden md:block shrink-0 bg-green-deep border-r-2 border-terra"
        initial={false}
        animate={{ width: expanded ? PANEL_W : RAIL_W }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <SidebarContent
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
          />
        </div>
      </motion.aside>

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
              className="fixed inset-y-0 left-0 w-64 z-50 md:hidden border-r-2 border-terra"
            >
              <SidebarContent expanded onNav={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile top bar — same terra rule, same reason. */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-green-deep text-cream border-b-2 border-terra sticky top-0 z-30">
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
