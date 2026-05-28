"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const boxes = [
  {
    icon: "🌿",
    name: "Garden Box",
    desc: "Seasonal vegetables for 2 — perfect for households",
    price: "GHS 85",
    per: "per week",
  },
  {
    icon: "🏡",
    name: "Family Box",
    desc: "Full produce for 4–6 including fruits, veg & herbs",
    price: "GHS 160",
    per: "per week",
  },
  {
    icon: "🏢",
    name: "Business Box",
    desc: "Bulk supply for restaurants & offices — fully customisable",
    price: "GHS 420",
    per: "per week",
  },
];

export function SubscriptionBoxes() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-terra py-16 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-cream/70 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-6 h-px bg-cream/70 block" />
              Never run out
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream leading-tight mb-4">
              Your Weekly Harvest Box,{" "}
              <em className="italic">delivered.</em>
            </h2>
            <p className="text-cream/75 text-base leading-loose mb-8 max-w-md">
              Set it once and enjoy fresh Ghanaian produce every week without
              lifting a finger. Customise your box, choose your delivery day,
              and pause anytime.
            </p>
            <Link
              href="/shop?category=subscription-boxes"
              className="inline-flex items-center gap-2 bg-cream text-terra font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors group text-sm"
            >
              Start my box
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right — box selector */}
          <div className="flex flex-col gap-3">
            {boxes.map((box, i) => (
              <button
                key={box.name}
                onClick={() => setActive(i)}
                className={`flex items-center justify-between gap-4 px-6 py-5 border text-left transition-all rounded-2xl ${
                  active === i
                    ? "bg-white/20 border-white/50"
                    : "bg-white/10 border-white/20 hover:bg-white/15"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{box.icon}</span>
                  <div>
                    <p className="font-heading font-semibold text-cream text-base">{box.name}</p>
                    <p className="text-cream/65 text-xs mt-0.5">{box.desc}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading font-bold text-cream text-xl">{box.price}</p>
                  <p className="text-cream/60 text-[10px] font-medium">{box.per}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
