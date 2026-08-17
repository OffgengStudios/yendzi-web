"use client";

import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { BottomNav } from "./BottomNav";
import { Toaster } from "../ui/Toaster";
import { DemoBar } from "./DemoBar";
import { PageTransition } from "./PageTransition";
import { useCartStore } from "../../lib/store/cart";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const closeCart = useCartStore((s) => s.closeCart);
  // The vendor portal, admin and the auth screens all carry their own chrome.
  // Rendering the storefront header and footer around them stacked two
  // navigations on one page, showed the wordmark twice, and left the sidebar
  // floating in a gap. Auth is also a funnel: the fewer ways out, the better.
  // `/login` re-exports the sign-up page, so it needs the same treatment.
  const CHROMELESS = ["/demo", "/vendor", "/admin", "/signup", "/login"];
  const isStorefront = !CHROMELESS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  return (
    <>
      {isStorefront && <Header />}
      {isStorefront && <CartDrawer />}
      <PageTransition>{children}</PageTransition>
      {isStorefront && <Footer />}
      {isStorefront && <BottomNav />}
      <Toaster />
      <Suspense>
        <DemoBar />
      </Suspense>
    </>
  );
}
