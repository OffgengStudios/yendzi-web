"use client";

import Link from "next/link";
import { TrendingUp, Package, ShoppingBag, Clock, Plus, ArrowRight, CheckCircle2, Truck } from "lucide-react";
import { useVendorStore } from "../../../lib/store/vendor";

const statusConfig = {
  pending:   { label: "Pending",   color: "bg-soft-yellow/20 text-charcoal",     icon: Clock },
  packed:    { label: "Packed",    color: "bg-green-light text-green-deep",       icon: Package },
  delivered: { label: "Delivered", color: "bg-green-deep/10 text-green-deep",     icon: CheckCircle2 },
};

export default function VendorDashboard() {
  const { products, orders, totalEarnings, businessName } = useVendorStore();

  const liveProducts  = products.filter((p) => p.status === "live").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const weekEarnings  = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total Earnings", value: `GHS ${totalEarnings.toLocaleString()}`, icon: TrendingUp, color: "bg-green-deep text-cream" },
    { label: "This Week",      value: `GHS ${weekEarnings}`,                    icon: TrendingUp, color: "bg-white text-charcoal" },
    { label: "Products Live",  value: liveProducts,                             icon: Package,    color: "bg-white text-charcoal" },
    { label: "Pending Orders", value: pendingOrders,                            icon: ShoppingBag,color: "bg-white text-charcoal" },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
          Good morning, {businessName || "Farmer"} 👋
        </h1>
        <p className="text-charcoal-light text-sm mt-1">
          Here&apos;s what&apos;s happening on your farm store today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 sm:p-5 border border-cream-dark ${s.color}`}>
            <s.icon className="w-4 h-4 sm:w-5 sm:h-5 mb-2 sm:mb-3 opacity-70" />
            <p className={`font-heading font-bold text-xl sm:text-2xl ${s.color.includes("text-cream") ? "text-cream" : "text-charcoal"}`}>
              {s.value}
            </p>
            <p className={`text-xs mt-1 font-medium ${s.color.includes("text-cream") ? "text-cream/70" : "text-charcoal-light"}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8 sm:mb-10">
        <Link
          href="/vendor/products/new"
          className="inline-flex items-center gap-2 bg-green-deep text-cream rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-green-mid transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
        <Link
          href="/vendor/orders"
          className="inline-flex items-center gap-2 border border-cream-dark text-charcoal rounded-full px-5 py-2.5 text-sm font-semibold hover:border-green-deep transition-colors"
        >
          <Truck className="w-4 h-4" /> View Orders
        </Link>
      </div>

      {/* Recent orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg text-charcoal">Recent Orders</h2>
          <Link href="/vendor/orders" className="text-xs text-green-deep font-semibold flex items-center gap-1 hover:gap-1.5 transition-all">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-cream-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Qty</th>
                  <th className="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Total</th>
                  <th className="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 4).map((order) => {
                  const cfg = statusConfig[order.status];
                  return (
                    <tr key={order.id} className="border-b border-cream-dark/50 last:border-0 hover:bg-cream/50 transition-colors">
                      <td className="px-4 sm:px-5 py-3.5 font-medium text-charcoal whitespace-nowrap">{order.customer}</td>
                      <td className="px-4 sm:px-5 py-3.5 text-charcoal-light">{order.product}</td>
                      <td className="px-4 sm:px-5 py-3.5 text-charcoal-light">{order.qty}</td>
                      <td className="px-4 sm:px-5 py-3.5 font-semibold text-charcoal whitespace-nowrap">GHS {order.total}</td>
                      <td className="px-4 sm:px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>
                          <cfg.icon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Products snapshot */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg text-charcoal">Your Products</h2>
          <Link href="/vendor/products" className="text-xs text-green-deep font-semibold flex items-center gap-1 hover:gap-1.5 transition-all">
            Manage <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.slice(0, 3).map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-cream-dark p-4 flex gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-charcoal text-sm truncate">{p.name}</p>
                <p className="text-charcoal-light text-xs mt-0.5">GHS {p.price} / {p.unit}</p>
                <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  p.status === "live" ? "bg-green-light text-green-deep" : "bg-cream-dark text-charcoal-light"
                }`}>
                  {p.status === "live" ? "Live" : "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
