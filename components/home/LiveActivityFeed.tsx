"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Sprout, Star } from "lucide-react";

const ACTIVITIES = [
  { icon: ShoppingBag, color: "text-terra", text: "Ama in East Legon just ordered Organic Tomatoes" },
  { icon: Sprout,      color: "text-green-deep", text: "New farmer Kwame Asante joined from Ashanti Region" },
  { icon: ShoppingBag, color: "text-terra", text: "Chef Kojo in Cantonments ordered 5 kg Garden Eggs" },
  { icon: Star,        color: "text-soft-yellow", text: "Abena left a 5-star review for Ama's Kontomire" },
  { icon: ShoppingBag, color: "text-terra", text: "Kofi in Labone just ordered Fresh Plantain" },
  { icon: Sprout,      color: "text-green-deep", text: "Mensah Organic Farm listed 3 new products today" },
  { icon: ShoppingBag, color: "text-terra", text: "Sandra in Adenta ordered the Weekly Family Box" },
  { icon: Star,        color: "text-soft-yellow", text: "4 orders delivered in Spintex in the last hour" },
];

export function LiveActivityFeed() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activity = ACTIVITIES[current];

  return (
    <div className="bg-green-deep border-t border-green-mid/40 py-3 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-terra text-[10px] font-bold tracking-widest uppercase shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-terra animate-pulse inline-block" />
          Live
        </span>
        <div
          className="flex items-center gap-2 transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <activity.icon className={`w-3.5 h-3.5 shrink-0 ${activity.color}`} />
          <p className="text-green-light/80 text-xs font-medium truncate max-w-[220px] sm:max-w-xs">{activity.text}</p>
        </div>
      </div>
    </div>
  );
}
