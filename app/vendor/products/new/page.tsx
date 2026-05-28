"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorStore } from "../../../../lib/store/vendor";
import { ArrowLeft, ImagePlus, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const categories = [
  { value: "fresh-produce",     label: "Fresh Produce" },
  { value: "butchery",          label: "Butchery" },
  { value: "juices",            label: "Juices" },
  { value: "nuts-pantry",       label: "Nuts & Pantry" },
  { value: "eco-products",      label: "Eco Products" },
  { value: "subscription-boxes",label: "Subscription Boxes" },
];

const units = ["kg", "bunch", "piece", "litre", "pack"];

const badges = [
  { value: "organic",        label: "Organic" },
  { value: "locally-grown",  label: "Locally Grown" },
  { value: "eco-packaged",   label: "Eco Packaged" },
  { value: "seasonal",       label: "Seasonal" },
  { value: "bulk-available", label: "Bulk Available" },
];

export default function NewProductPage() {
  const router = useRouter();
  const addProduct = useVendorStore((s) => s.addProduct);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "fresh-produce",
    price: "",
    unit: "kg",
    stock: "",
    description: "",
    harvestDate: new Date().toISOString().split("T")[0],
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500",
    status: "live" as "live" | "draft",
    selectedBadges: [] as string[],
  });

  const field = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleBadge = (v: string) =>
    setForm((f) => ({
      ...f,
      selectedBadges: f.selectedBadges.includes(v)
        ? f.selectedBadges.filter((b) => b !== v)
        : [...f.selectedBadges, v],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      unit: form.unit,
      stock: Number(form.stock),
      description: form.description,
      harvestDate: form.harvestDate,
      image: form.image,
      status: form.status,
    });
    setSaved(true);
    setTimeout(() => router.push("/vendor/products"), 1500);
  };

  if (saved) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-deep mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">Product added!</h2>
          <p className="text-charcoal-light text-sm">Redirecting to your products…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/vendor/products" className="p-2 rounded-xl hover:bg-cream-dark transition-colors text-charcoal-light">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">Add a Product</h1>
          <p className="text-charcoal-light text-sm mt-0.5">Fill in the details below and publish to your store.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1.5">Product name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => field("name", e.target.value)}
            placeholder="e.g. Organic Garden Tomatoes"
            className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
          />
        </div>

        {/* Category + Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Category *</label>
            <select
              value={form.category}
              onChange={(e) => field("category", e.target.value)}
              className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Unit *</label>
            <select
              value={form.unit}
              onChange={(e) => field("unit", e.target.value)}
              className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
            >
              {units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Price (GHS) *</label>
            <input
              required
              type="number"
              min="1"
              value={form.price}
              onChange={(e) => field("price", e.target.value)}
              placeholder="12"
              className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Stock quantity *</label>
            <input
              required
              type="number"
              min="1"
              value={form.stock}
              onChange={(e) => field("stock", e.target.value)}
              placeholder="50"
              className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
            />
          </div>
        </div>

        {/* Harvest date */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1.5">Harvest date *</label>
          <input
            required
            type="date"
            value={form.harvestDate}
            onChange={(e) => field("harvestDate", e.target.value)}
            className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1.5">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => field("description", e.target.value)}
            placeholder="What makes this product special? How is it grown?"
            className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1.5">
            <span className="flex items-center gap-1.5"><ImagePlus className="w-3.5 h-3.5" /> Product image URL</span>
          </label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => field("image", e.target.value)}
            placeholder="https://images.pexels.com/…"
            className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
          />
          {form.image && (
            <img src={form.image} alt="preview" className="mt-3 w-20 h-20 rounded-xl object-cover border border-cream-dark" />
          )}
        </div>

        {/* Badges */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-2.5">Labels</label>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => {
              const selected = form.selectedBadges.includes(b.value);
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => toggleBadge(b.value)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selected
                      ? "bg-green-deep text-cream"
                      : "bg-white border border-cream-dark text-charcoal hover:border-green-deep"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-2.5">Publish status</label>
          <div className="flex gap-3">
            {(["live", "draft"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm((f) => ({ ...f, status: s }))}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all capitalize ${
                  form.status === s
                    ? s === "live"
                      ? "bg-green-deep text-cream border-green-deep"
                      : "bg-cream-dark text-charcoal border-cream-dark"
                    : "bg-white border-cream-dark text-charcoal-light hover:border-charcoal"
                }`}
              >
                {s === "live" ? "Publish now" : "Save as draft"}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-deep text-cream rounded-full py-3.5 font-semibold hover:bg-green-mid transition-colors text-sm"
        >
          {form.status === "live" ? "Publish Product" : "Save Draft"}
        </button>
      </form>
    </div>
  );
}
