"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, Store, MapPin, Phone, Leaf } from "lucide-react";

interface Application {
  id: string;
  businessName: string;
  farmerName: string;
  phone: string;
  region: string;
  categories: string[];
  description: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app-001",
    businessName: "Mensah Organic Farm",
    farmerName: "Akua Mensah",
    phone: "055 012 3456",
    region: "Eastern Region",
    categories: ["Fresh Vegetables", "Herbs & Spices"],
    description: "I've been farming in Aburi for 15 years. Specialise in organic vegetables — no pesticides, rich red soil. Want to reach Accra customers directly.",
    status: "pending",
    submittedAt: "2026-05-27",
  },
  {
    id: "app-002",
    businessName: "Volta Fresh Fish",
    farmerName: "Kwame Adjei",
    phone: "024 987 6543",
    region: "Volta Region",
    categories: ["Fish & Seafood"],
    description: "Tilapia and catfish from the Kpong river. Caught fresh every morning. Can supply up to 200kg per week.",
    status: "pending",
    submittedAt: "2026-05-26",
  },
  {
    id: "app-003",
    businessName: "Ashanti Roots",
    farmerName: "Yaw Frimpong",
    phone: "020 111 2233",
    region: "Ashanti",
    categories: ["Grains & Staples", "Fresh Vegetables"],
    description: "Heritage yam and cassava varieties. Third generation farmer. Our produce is sold at Kumasi Central but we want to expand to Accra.",
    status: "approved",
    submittedAt: "2026-05-24",
  },
  {
    id: "app-004",
    businessName: "Nsawam Eco Goods",
    farmerName: "Efua Darko",
    phone: "050 555 7788",
    region: "Eastern Region",
    categories: ["Eco Products"],
    description: "Solar-powered coconut oil pressing and raw shea butter. Zero-waste packaging. Already exporting to 3 countries.",
    status: "rejected",
    submittedAt: "2026-05-22",
  },
];

const statusConfig = {
  pending:  { label: "Pending Review", color: "bg-soft-yellow/20 text-charcoal",    icon: Clock },
  approved: { label: "Approved",       color: "bg-green-light text-green-deep",     icon: CheckCircle2 },
  rejected: { label: "Rejected",       color: "bg-terra-light text-terra",          icon: XCircle },
};

export default function AdminPage() {
  const [apps, setApps] = useState(MOCK_APPLICATIONS);
  const [filter, setFilter] = useState<"all" | Application["status"]>("all");

  const update = (id: string, status: Application["status"]) =>
    setApps((a) => a.map((x) => (x.id === id ? { ...x, status } : x)));

  const visible = filter === "all" ? apps : apps.filter((a) => a.status === filter);
  const pending = apps.filter((a) => a.status === "pending").length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-green-deep text-cream px-6 py-5 flex items-center gap-3">
        <div className="w-8 h-8 bg-terra rounded-full flex items-center justify-center">
          <Leaf className="w-4 h-4 text-cream" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg">Yendzi Admin</h1>
          <p className="text-green-light/60 text-xs">Vendor Applications</p>
        </div>
        {pending > 0 && (
          <span className="ml-auto bg-terra text-cream text-xs font-bold rounded-full px-2.5 py-1">
            {pending} pending
          </span>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {(["pending", "approved", "rejected"] as const).map((s) => {
            const count = apps.filter((a) => a.status === s).length;
            const cfg = statusConfig[s];
            return (
              <button
                key={s}
                onClick={() => setFilter(filter === s ? "all" : s)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  filter === s ? "border-green-deep shadow-sm" : "border-cream-dark bg-white"
                }`}
              >
                <p className="font-heading font-bold text-2xl text-charcoal">{count}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-1 px-2.5 py-1 rounded-full ${cfg.color}`}>
                  <cfg.icon className="w-3 h-3" /> {cfg.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {visible.map((app) => {
            const cfg = statusConfig[app.status];
            return (
              <div key={app.id} className="bg-white rounded-2xl border border-cream-dark p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-light rounded-full flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5 text-green-deep" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-charcoal text-base">{app.businessName}</h3>
                      <p className="text-charcoal-light text-sm">{app.farmerName}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full shrink-0 ${cfg.color}`}>
                    <cfg.icon className="w-3 h-3" /> {cfg.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-charcoal-light mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.region}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {app.phone}</span>
                  <span>Submitted {new Date(app.submittedAt).toLocaleDateString("en-GH", { day: "numeric", month: "short" })}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {app.categories.map((c) => (
                    <span key={c} className="bg-cream text-charcoal text-xs font-medium px-2.5 py-1 rounded-full">{c}</span>
                  ))}
                </div>

                <p className="text-charcoal-light text-sm leading-relaxed mb-5 border-l-4 border-cream-dark pl-3 italic">
                  &ldquo;{app.description}&rdquo;
                </p>

                {app.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => update(app.id, "approved")}
                      className="inline-flex items-center gap-2 bg-green-deep text-cream rounded-full px-5 py-2 text-sm font-semibold hover:bg-green-mid transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => update(app.id, "rejected")}
                      className="inline-flex items-center gap-2 border border-terra text-terra rounded-full px-5 py-2 text-sm font-semibold hover:bg-terra-light transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
