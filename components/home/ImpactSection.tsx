const stats = [
  { num: "120+", label: "Farmers Supported" },
  { num: "5K+",  label: "Orders Delivered" },
  { num: "30%",  label: "Spoilage Reduced" },
  { num: "2T",   label: "Plastic Avoided" },
];

export function ImpactSection() {
  return (
    <section className="bg-green-deep py-20 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-3 text-terra text-xs font-semibold tracking-widest uppercase mb-5">
          <span className="w-6 h-px bg-terra block" />
          Our Impact
          <span className="w-6 h-px bg-terra block" />
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream mb-3">
          Every order is a ripple.
        </h2>
        <p className="text-green-light/70 text-base italic mb-14">
          Across every harvest, every delivery, every family fed.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`${i < stats.length - 1 ? "sm:border-r sm:border-green-light/20" : ""}`}>
              <p className="font-heading text-5xl font-bold text-terra leading-none mb-3">
                {s.num}
              </p>
              <p className="text-green-light/70 text-xs font-semibold tracking-widest uppercase leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
