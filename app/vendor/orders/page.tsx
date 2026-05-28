"use client";

import { Clock, Package, CheckCircle2, ChevronRight } from "lucide-react";
import { useVendorStore } from "../../../lib/store/vendor";

const statusConfig = {
  pending:   { label: "Pending",   color: "bg-soft-yellow/20 text-charcoal",  icon: Clock,         next: "packed"    },
  packed:    { label: "Packed",    color: "bg-green-light text-green-deep",   icon: Package,       next: "delivered" },
  delivered: { label: "Delivered", color: "bg-green-deep/10 text-green-deep", icon: CheckCircle2,  next: null        },
} as const;

export default function VendorOrdersPage() {
  const { orders, updateOrderStatus } = useVendorStore();

  const pending   = orders.filter((o) => o.status === "pending");
  const packed    = orders.filter((o) => o.status === "packed");
  const delivered = orders.filter((o) => o.status === "delivered");

  const grouped = [
    { label: "Pending",   orders: pending,   color: "border-soft-yellow" },
    { label: "Packed",    orders: packed,    color: "border-green-mid" },
    { label: "Delivered", orders: delivered, color: "border-green-deep" },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">Orders</h1>
        <p className="text-charcoal-light text-sm mt-1">
          {orders.length} total · {pending.length} need action
        </p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
        {grouped.map((g) => (
          <div
            key={g.label}
            className={`bg-white rounded-xl border-l-4 ${g.color} border border-cream-dark px-3 sm:px-4 py-3 flex-1`}
          >
            <p className="font-heading font-bold text-xl text-charcoal">{g.orders.length}</p>
            <p className="text-xs text-charcoal-light font-medium">{g.label}</p>
          </div>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {orders.map((order) => {
          const cfg = statusConfig[order.status];
          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-cream-dark p-4 sm:p-5 hover:shadow-sm transition-shadow"
            >
              {/* Top row: customer info + amount */}
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-charcoal text-sm">{order.customer}</p>
                    <span className="text-charcoal-light text-xs hidden sm:inline">·</span>
                    <p className="text-charcoal-light text-xs">{order.date}</p>
                  </div>
                  <p className="text-charcoal-light text-sm truncate">
                    {order.product} × {order.qty}
                  </p>
                </div>
                <p className="font-heading font-bold text-charcoal text-base shrink-0">
                  GHS {order.total}
                </p>
              </div>

              {/* Bottom row: status badge + action button */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cream-dark/60">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full ${cfg.color}`}>
                  <cfg.icon className="w-3 h-3" />
                  {cfg.label}
                </span>

                {cfg.next && (
                  <button
                    onClick={() => updateOrderStatus(order.id, cfg.next as "packed" | "delivered")}
                    className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-green-deep border border-green-deep rounded-full px-3 py-1.5 hover:bg-green-light transition-colors"
                  >
                    Mark {cfg.next} <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
