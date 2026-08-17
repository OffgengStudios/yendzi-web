"use client";

const items = [
  "Free Delivery on First Order",
  "100% Ghanaian Farmers",
  "Harvested Within 24 Hours",
  "Eco-Friendly Packaging",
  "Weekly Subscription Boxes",
  "Farm-to-Doorstep Accra",
];

export function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-terra py-3.5 overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex gap-0 marquee-track"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-cream text-xs font-semibold tracking-widest uppercase px-10"
          >
            {item}
            <span className="opacity-40 text-[7px]" aria-hidden>&#9642;</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-play-state: paused; }
        }
      `}</style>
    </div>
  );
}
