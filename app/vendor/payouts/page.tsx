"use client";

import { useState } from "react";
import { Banknote, Clock, CheckCircle2, AlertCircle, ChevronDown, Phone } from "lucide-react";
import { clsx } from "clsx";
import { useVendorStore } from "../../../lib/store/vendor";

const PAYOUT_HISTORY = [
  { id: "P001", date: "Fri 23 May 2026", orders: 8,  amount: 840.00, method: "MTN MoMo", status: "paid"    },
  { id: "P002", date: "Fri 16 May 2026", orders: 11, amount: 1120.50, method: "MTN MoMo", status: "paid"   },
  { id: "P003", date: "Fri 09 May 2026", orders: 6,  amount: 620.00, method: "MTN MoMo", status: "paid"    },
  { id: "P004", date: "Fri 02 May 2026", orders: 9,  amount: 890.75, method: "MTN MoMo", status: "paid"    },
];

const PENDING_AMOUNT = 640.00;
const NEXT_PAYOUT_DATE = "Friday, 30 May 2026";
const MOMO_NUMBER = "055 ••• ••34";

const statusStyle = {
  paid:    { label: "Paid",    icon: CheckCircle2, className: "text-green-deep bg-green-light" },
  pending: { label: "Pending", icon: Clock,        className: "text-soft-yellow bg-soft-yellow-light" },
  failed:  { label: "Failed",  icon: AlertCircle,  className: "text-terra bg-terra-light" },
};

export default function PayoutsPage() {
  const { totalEarnings } = useVendorStore();
  const [showMomoForm, setShowMomoForm] = useState(false);
  const [savedMomo, setSavedMomo] = useState(false);

  const handleSaveMomo = () => {
    setSavedMomo(true);
    setTimeout(() => {
      setSavedMomo(false);
      setShowMomoForm(false);
    }, 2000);
  };

  return (
    <div className="p-5 sm:p-8 max-w-4xl">
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-1">Payouts</h1>
      <p className="text-charcoal-light text-sm mb-8">
        Your earnings are paid every Friday via MoMo — no bank account required.
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-deep text-cream rounded-2xl p-5">
          <p className="text-green-light/60 text-xs font-medium mb-1">Pending payout</p>
          <p className="font-heading font-bold text-3xl">GHS {PENDING_AMOUNT.toFixed(2)}</p>
          <p className="text-green-light/70 text-xs mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Arrives {NEXT_PAYOUT_DATE}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-cream-dark p-5">
          <p className="text-charcoal-light text-xs font-medium mb-1">Total earned (all time)</p>
          <p className="font-heading font-bold text-2xl text-charcoal">GHS {totalEarnings.toFixed(2)}</p>
          <p className="text-charcoal-light text-xs mt-2">{PAYOUT_HISTORY.length} payouts completed</p>
        </div>

        <div className="bg-white rounded-2xl border border-cream-dark p-5">
          <p className="text-charcoal-light text-xs font-medium mb-2">Payout method</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-soft-yellow rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-charcoal" />
            </div>
            <div>
              <p className="font-semibold text-charcoal text-sm">MTN MoMo</p>
              <p className="text-charcoal-light text-xs">{MOMO_NUMBER}</p>
            </div>
          </div>
          <button
            onClick={() => setShowMomoForm(!showMomoForm)}
            className="mt-3 text-xs text-green-deep font-semibold hover:underline flex items-center gap-1"
          >
            Update number <ChevronDown className={clsx("w-3 h-3 transition-transform", showMomoForm && "rotate-180")} />
          </button>
          {showMomoForm && (
            <div className="mt-3 space-y-2">
              <input
                type="tel"
                placeholder="055 000 0000"
                className="w-full border border-cream-dark rounded-xl px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-green-deep"
              />
              <button
                onClick={handleSaveMomo}
                disabled={savedMomo}
                className="w-full bg-green-deep text-cream rounded-xl py-2 text-xs font-semibold hover:bg-green-mid transition-colors disabled:opacity-80"
              >
                {savedMomo ? "Saved" : "Save number"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Early payout notice */}
      <div className="bg-soft-yellow-light border border-soft-yellow/40 rounded-2xl px-5 py-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-charcoal shrink-0 mt-0.5" />
        <div>
          <p className="text-charcoal text-sm font-semibold">Early payout</p>
          <p className="text-charcoal-light text-xs mt-0.5 leading-relaxed">
            Instant payout (same-day MoMo) is available for vendors with 30+ completed orders.
            You currently have 17 orders — keep selling to unlock this feature.
          </p>
        </div>
      </div>

      {/* Payout history */}
      <div className="bg-white rounded-2xl border border-cream-dark overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-dark">
          <h2 className="font-heading font-bold text-charcoal">Payout history</h2>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream text-charcoal-light text-xs">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Date</th>
                <th className="px-5 py-3 text-left font-semibold">Reference</th>
                <th className="px-5 py-3 text-left font-semibold">Orders</th>
                <th className="px-5 py-3 text-left font-semibold">Method</th>
                <th className="px-5 py-3 text-right font-semibold">Amount</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {PAYOUT_HISTORY.map((p) => {
                const s = statusStyle[p.status as keyof typeof statusStyle];
                return (
                  <tr key={p.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-5 py-4 text-charcoal">{p.date}</td>
                    <td className="px-5 py-4 text-charcoal-light font-mono text-xs">{p.id}</td>
                    <td className="px-5 py-4 text-charcoal">{p.orders} orders</td>
                    <td className="px-5 py-4 text-charcoal-light">{p.method}</td>
                    <td className="px-5 py-4 text-right font-bold text-charcoal">GHS {p.amount.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className={clsx("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold", s.className)}>
                        <s.icon className="w-3 h-3" /> {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-cream-dark">
          {PAYOUT_HISTORY.map((p) => {
            const s = statusStyle[p.status as keyof typeof statusStyle];
            return (
              <div key={p.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-charcoal text-sm font-semibold">{p.date}</p>
                  <p className="text-charcoal-light text-xs mt-0.5">{p.orders} orders · {p.method}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-charcoal text-sm">GHS {p.amount.toFixed(2)}</p>
                  <span className={clsx("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1", s.className)}>
                    <s.icon className="w-2.5 h-2.5" /> {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-5 py-4 border-t border-cream-dark bg-cream/30">
          <p className="text-xs text-charcoal-light">
            Payouts are processed every Friday at 8 AM. Questions? WhatsApp us at{" "}
            <a href="https://wa.me/233300000000" className="text-green-deep font-semibold">+233 30 000 0000</a>
          </p>
        </div>
      </div>
    </div>
  );
}
