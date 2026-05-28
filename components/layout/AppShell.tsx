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
  const isDemoRoute = pathname === "/demo" || pathname.startsWith("/demo/");

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  return (
    <>
      {!isDemoRoute && <Header />}
      {!isDemoRoute && <CartDrawer />}
      <PageTransition>{children}</PageTransition>
      {!isDemoRoute && <Footer />}
      {!isDemoRoute && <BottomNav />}
      <Toaster />
      <Suspense>
        <DemoBar />
      </Suspense>
    </>
  );
}
