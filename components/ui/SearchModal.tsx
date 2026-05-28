"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "../../lib/mock-data/products";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.farmer.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-charcoal/50 z-[100] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 left-0 right-0 z-[110] bg-white shadow-2xl">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-cream-dark max-w-3xl mx-auto">
          <Search className="w-5 h-5 text-charcoal-light shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, farmers, categories…"
            className="flex-1 text-base text-charcoal outline-none bg-transparent placeholder:text-charcoal-light/50"
          />
          <button onClick={onClose} className="p-1 text-charcoal-light hover:text-charcoal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-w-3xl mx-auto">
          {query.trim().length > 1 && results.length === 0 && (
            <p className="px-5 py-6 text-sm text-charcoal-light text-center">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-cream-dark">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/shop/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-cream/60 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-charcoal text-sm">{p.name}</p>
                      <p className="text-xs text-charcoal-light mt-0.5">
                        by {p.farmer.name} · GHS {p.price} / {p.unit}
                      </p>
                    </div>
                    <span className="text-xs font-semibold bg-green-light text-green-deep rounded-full px-2.5 py-0.5 capitalize shrink-0">
                      {p.category.replace("-", " ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.trim().length <= 1 && (
            <div className="px-5 py-5">
              <p className="text-xs text-charcoal-light font-semibold uppercase tracking-wider mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {["Tomatoes", "Plantain", "Kontomire", "Pineapple", "Palm Oil", "Garden Eggs"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="bg-cream text-charcoal text-sm px-3.5 py-1.5 rounded-full hover:bg-cream-dark transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
