"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCartStore } from "../../lib/store/cart";
import { useAuthStore } from "../../lib/store/auth";
import { SearchModal } from "../ui/SearchModal";

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hasHydrated = useCartStore.persist?.hasHydrated?.() ?? false;
  const itemCount = useCartStore((s) => s.items.reduce((sum, item) => sum + item.quantity, 0));
  const toggleCart = useCartStore((s) => s.toggleCart);
  const { isAuthenticated, logout, user } = useAuthStore();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  // Transparent only on home page when at the very top
  const isHome = pathname === "/";
  const showGlass = !isHome || scrolled;

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/farmers", label: "Farmers" },
    { href: "/learn", label: "Learn" },
    { href: "/about", label: "About" },
    { href: "/for-business", label: "For Business" },
  ];

  // Dark glass — floats over the green hero at rest
  const darkGlassStyle: React.CSSProperties = {
    background: "rgba(15, 45, 22, 0.52)",
    backdropFilter: "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 20px rgba(0,0,0,0.14)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  };

  // Cream glass — appears on scroll or non-hero pages
  const lightGlassStyle: React.CSSProperties = {
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    background: "rgba(247,243,235,0.85)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 0 rgba(0,0,0,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.45)",
  };

  const isDarkGlass = isHome && !scrolled;
  const currentStyle = isDarkGlass ? darkGlassStyle : lightGlassStyle;

  // Text colours — cream over dark hero, charcoal over cream glass
  const logoText = isDarkGlass ? "text-cream" : "text-green-deep";
  const leafBg   = isDarkGlass ? "bg-cream/20" : "bg-green-deep";
  const navLink  = isDarkGlass ? "text-cream/80 hover:text-cream" : "text-charcoal hover:text-green-deep";
  const actionBtn = isDarkGlass ? "text-cream/80 hover:text-cream" : "text-charcoal hover:text-green-deep";
  const signInLink = isDarkGlass ? "text-cream/60 hover:text-cream" : "text-charcoal-light hover:text-charcoal";

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={currentStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${leafBg}`}>
              <Leaf className="w-4 h-4 text-cream" />
            </div>
            <span className={`font-heading font-bold text-xl tracking-tight transition-colors duration-300 ${logoText}`}>
              Yendzi
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${navLink}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setSearchOpen(true)}
              whileTap={{ scale: 0.85 }}
              transition={springTap}
              className={`p-2 transition-colors duration-300 ${actionBtn}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

            {isAuthenticated ? (
              <Link
                href={user?.role === "vendor" ? "/vendor/dashboard" : "/shop"}
                className={`hidden md:block text-sm font-medium transition-colors duration-300 ${signInLink}`}
              >
                {user?.role === "vendor" ? "My Dashboard" : "My Account"}
              </Link>
            ) : (
              <Link href="/signup" className={`hidden md:block text-sm font-medium transition-colors duration-300 ${signInLink}`}>
                Sign in
              </Link>
            )}

            <motion.button
              onClick={toggleCart}
              whileTap={{ scale: 0.85 }}
              transition={springTap}
              className={`relative p-2 transition-colors duration-300 ${actionBtn}`}
              aria-label={`Cart (${hasHydrated ? itemCount : 0} items)`}
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {hasHydrated && itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 18 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-terra text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none ring-2 ring-cream pointer-events-none"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              className={`md:hidden p-2 transition-colors duration-300 ${actionBtn}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.85 }}
              transition={springTap}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            className="md:hidden overflow-hidden bg-cream border-t border-cream-dark/60"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-charcoal hover:text-green-deep transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  transition={springTap}
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="text-left text-base font-medium text-charcoal-light hover:text-charcoal transition-colors"
                >
                  Sign out
                </motion.button>
              ) : (
                <Link
                  href="/signup"
                  className="text-base font-medium text-charcoal-light hover:text-charcoal transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in / Sign up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
