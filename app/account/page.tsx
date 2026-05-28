"use client";

import Link from "next/link";
import { Package, Clock, CheckCircle2, Truck, ShoppingBag, User, LogOut } from "lucide-react";
import { useAuthStore } from "../../lib/store/auth";
import { useRouter } from "next/navigation";

const MOCK_ORDERS = [
  {
    id: "YNZ-1042",
    date: "2026-05-27",
    items: [
      { name: "Cherry Tomatoes", qty: 2, price: 25 },
      { name: "Fresh Pineapple", qty: 1, price: 15 },
    ],
    total: 65,
    status: "out-for-delivery" as const,
  },
  {
    id: "YNZ-1038",
    date: "2026-05-24",
    items: [
      { name: "Kontomire Leaves", qty: 3, price: 18 },
      { name: "Garden Eggs", qty: 2, price: 20 },
    ],
    total: 58,
    status: "delivered" as const,
  },
  {
    id: "YNZ-1031",
    date: "2026-05-20",
    items: [{ name: "Organic Palm Oil", qty: 1, price: 45 }],
    total: 45,
    status: "delivered" as const,
  },
];

const statusConfig = {
  "processing":       { label: "Processing",       color: "bg-cream-dark text-charcoal-light",  icon: Clock },
  "out-for-delivery": { label: "Out for Delivery", color: "bg-soft-yellow/20 text-charcoal",    icon: Truck },
  "delivered":        { label: "Delivered",        color: "bg-green-light text-green-deep",     icon: CheckCircle2 },
};

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-green-light rounded-full flex items-center justify-center mx-auto mb-5">
            <User className="w-7 h-7 text-green-deep" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-3">Sign in to your account</h2>
          <p className="text-charcoal-light text-sm mb-6">View your orders and manage your Yendzi account.</p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 w-full bg-green-deep text-cream rounded-full py-3 font-semibold hover:bg-green-mid transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-deep flex items-center justify-center">
            <span className="font-heading font-bold text-cream text-xl">
              {user?.name?.[0] ?? "U"}
            </span>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-charcoal">{user?.name}</h1>
            <p className="text-charcoal-light text-sm">{user?.phone}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); router.push("/"); }}
          className="inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      {/* Orders */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag className="w-5 h-5 text-green-deep" />
          <h2 className="font-heading text-xl font-bold text-charcoal">Your Orders</h2>
        </div>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => {
            const cfg = statusConfig[order.status];
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-cream-dark p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-charcoal text-sm">Order #{order.id}</p>
                    <p className="text-xs text-charcoal-light mt-0.5">
                      {new Date(order.date).toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full ${cfg.color}`}>
                    <cfg.icon className="w-3 h-3" /> {cfg.label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <span className="text-charcoal-light">{item.name} × {item.qty}</span>
                      <span className="text-charcoal font-medium">GHS {item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-cream-dark">
                  <span className="text-xs text-charcoal-light">Total</span>
                  <span className="font-heading font-bold text-charcoal">GHS {order.total}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-green-deep text-cream rounded-full px-7 py-3 font-semibold hover:bg-green-mid transition-colors text-sm"
          >
            <Package className="w-4 h-4" /> Shop More
          </Link>
        </div>
      </div>
    </div>
  );
}
