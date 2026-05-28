"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorStore } from "../../../lib/store/vendor";
import { Leaf, CheckCircle2, MapPin, Phone, Sprout } from "lucide-react";
import Link from "next/link";

const regions = [
  "Greater Accra", "Ashanti", "Eastern", "Western", "Volta",
  "Central", "Northern", "Upper East", "Upper West", "Brong-Ahafo",
];

const categories = [
  "Fresh Vegetables", "Fruits", "Herbs & Spices",
  "Butchery & Poultry", "Fish & Seafood", "Juices & Drinks",
  "Eco Products", "Dairy & Eggs", "Grains & Staples",
];

export default function VendorApplyPage() {
  const router = useRouter();
  const applyAsVendor = useVendorStore((s) => s.applyAsVendor);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    farmerName: "",
    phone: "",
    region: "",
    farmSize: "",
    description: "",
    selectedCategories: [] as string[],
  });

  const field = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleCat = (c: string) =>
    setForm((f) => ({
      ...f,
      selectedCategories: f.selectedCategories.includes(c)
        ? f.selectedCategories.filter((x) => x !== c)
        : [...f.selectedCategories, c],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyAsVendor(form.businessName);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-cream-dark p-12 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-green-light rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-deep" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-3">
            Application received!
          </h2>
          <p className="text-charcoal-light text-sm leading-relaxed mb-8">
            Welcome to Yendzi, <strong className="text-charcoal">{form.businessName}</strong>.
            Your account is ready — you can now list your first product and start selling.
          </p>
          <Link
            href="/vendor/dashboard"
            className="inline-flex items-center justify-center gap-2 w-full bg-green-deep text-cream rounded-full py-3.5 font-semibold hover:bg-green-mid transition-colors"
          >
            <Sprout className="w-4 h-4" /> Go to my dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-green-deep text-cream py-16 px-4 text-center">
        <div className="w-12 h-12 bg-terra rounded-full flex items-center justify-center mx-auto mb-5">
          <Leaf className="w-6 h-6 text-cream" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
          Sell on Yendzi
        </h1>
        <p className="text-cream/75 text-base max-w-md mx-auto leading-relaxed">
          Join 120+ Ghanaian farmers reaching thousands of urban households.
          Apply in 2 minutes — we review within 24 hours.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto px-4 py-14">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-cream-dark p-8 shadow-sm space-y-6">

          {/* Business / farm name */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Farm / Business name *</label>
            <input
              required
              type="text"
              value={form.businessName}
              onChange={(e) => field("businessName", e.target.value)}
              placeholder="e.g. Mensah Organic Farm"
              className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
            />
          </div>

          {/* Your name + phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Your name *</label>
              <input
                required
                type="text"
                value={form.farmerName}
                onChange={(e) => field("farmerName", e.target.value)}
                placeholder="Akua Mensah"
                className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5 flex items-center gap-1">
                <Phone className="w-3 h-3" /> WhatsApp number *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => field("phone", e.target.value)}
                placeholder="055 000 0000"
                className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
              />
            </div>
          </div>

          {/* Region + Farm size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Region *
              </label>
              <select
                required
                value={form.region}
                onChange={(e) => field("region", e.target.value)}
                className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
              >
                <option value="">Select…</option>
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Farm size</label>
              <select
                value={form.farmSize}
                onChange={(e) => field("farmSize", e.target.value)}
                className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
              >
                <option value="">Select…</option>
                <option>Under 1 acre</option>
                <option>1–5 acres</option>
                <option>5–20 acres</option>
                <option>20+ acres</option>
              </select>
            </div>
          </div>

          {/* What you grow */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-2.5">What do you grow / produce? *</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const sel = form.selectedCategories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCat(c)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      sel
                        ? "bg-green-deep text-cream"
                        : "bg-white border border-cream-dark text-charcoal hover:border-green-deep"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brief description */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Tell us about your farm</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => field("description", e.target.value)}
              placeholder="How long have you been farming? What makes your produce special?"
              className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-deep text-cream rounded-full py-3.5 font-semibold hover:bg-green-mid transition-colors"
          >
            Submit Application
          </button>

          <p className="text-center text-xs text-charcoal-light">
            We review all applications within 24 hours and reach out on WhatsApp.
          </p>
        </form>
      </div>
    </div>
  );
}
