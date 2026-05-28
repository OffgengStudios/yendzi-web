"use client";

import Link from "next/link";
import { Plus, Trash2, Edit3, Package } from "lucide-react";
import { useVendorStore } from "../../../lib/store/vendor";

export default function VendorProductsPage() {
  const { products, removeProduct } = useVendorStore();

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">Products</h1>
          <p className="text-charcoal-light text-sm mt-1">{products.length} products in your store</p>
        </div>
        <Link
          href="/vendor/products/new"
          className="inline-flex items-center gap-2 bg-green-deep text-cream rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold hover:bg-green-mid transition-colors"
        >
          <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream-dark p-10 sm:p-16 text-center">
          <Package className="w-12 h-12 text-charcoal-light/40 mx-auto mb-4" />
          <p className="font-heading font-bold text-charcoal text-lg mb-2">No products yet</p>
          <p className="text-charcoal-light text-sm mb-6">Add your first product to start selling on Yendzi.</p>
          <Link
            href="/vendor/products/new"
            className="inline-flex items-center gap-2 bg-green-deep text-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-green-mid transition-colors"
          >
            <Plus className="w-4 h-4" /> Add your first product
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block bg-white rounded-2xl border border-cream-dark overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark bg-cream/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Stock</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Harvest Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-cream-dark/50 last:border-0 hover:bg-cream/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div>
                          <p className="font-semibold text-charcoal">{p.name}</p>
                          <p className="text-charcoal-light text-xs capitalize">{p.category.replace("-", " ")}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-charcoal">
                      GHS {p.price}<span className="text-charcoal-light font-normal text-xs"> / {p.unit}</span>
                    </td>
                    <td className="px-5 py-4 text-charcoal-light">{p.stock} {p.unit}</td>
                    <td className="px-5 py-4 text-charcoal-light">
                      {new Date(p.harvestDate).toLocaleDateString("en-GH", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        p.status === "live" ? "bg-green-light text-green-deep" : "bg-cream-dark text-charcoal-light"
                      }`}>
                        {p.status === "live" ? "Live" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href="/vendor/products/new"
                          className="p-1.5 text-charcoal-light hover:text-green-deep transition-colors rounded-lg hover:bg-green-light"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="p-1.5 text-charcoal-light hover:text-terra transition-colors rounded-lg hover:bg-terra-light"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-cream-dark p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-charcoal text-sm truncate">{p.name}</p>
                    <p className="text-charcoal-light text-xs mt-0.5 capitalize">{p.category.replace("-", " ")}</p>
                    <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      p.status === "live" ? "bg-green-light text-green-deep" : "bg-cream-dark text-charcoal-light"
                    }`}>
                      {p.status === "live" ? "Live" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal-light border-t border-cream-dark pt-3">
                  <span><span className="font-semibold text-charcoal">GHS {p.price}</span> / {p.unit}</span>
                  <span>{p.stock} {p.unit} in stock</span>
                  <span>{new Date(p.harvestDate).toLocaleDateString("en-GH", { day: "numeric", month: "short" })}</span>
                  <div className="flex items-center gap-1">
                    <Link
                      href="/vendor/products/new"
                      className="p-1.5 text-charcoal-light hover:text-green-deep transition-colors rounded-lg hover:bg-green-light"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="p-1.5 text-charcoal-light hover:text-terra transition-colors rounded-lg hover:bg-terra-light"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
