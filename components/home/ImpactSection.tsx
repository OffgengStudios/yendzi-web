import { farmers } from "../../lib/mock-data/farmers";

/**
 * The ledger, not a stat row.
 *
 * A grid of big round numbers with `+` and `%` suffixes is the most generic
 * shape this section could take. It reads as a pitch deck. Naming the farms
 * and their regions says the same thing and can actually be checked.
 */
export function ImpactSection() {
  return (
    <section className="bg-green-deep py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 border-b border-green-light/20 pb-4 mb-10">
          <h2 className="type-h2 text-cream max-w-xl">
            Every crate on this site has a name on it.
          </h2>
          <p className="type-stencil text-terra pb-1 shrink-0">
            {farmers.length} farms · Eastern &amp; Greater Accra
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-green-light/15 border border-green-light/15">
          {farmers.map((f) => (
            <li key={f.id} className="bg-green-deep p-5 flex items-baseline justify-between gap-4">
              <div className="min-w-0">
                <p className="type-h3 text-cream truncate">{f.name}</p>
                <p className="text-[13px] text-green-light/60 truncate">{f.location}</p>
              </div>
              <p className="type-price text-xl text-terra shrink-0 tnum">
                {f.productsCount}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-green-light/60 text-sm mt-6 max-w-lg">
          Farming since {Math.min(...farmers.map((f) => new Date(f.memberSince).getFullYear()))}.
          Every lot lists the farm it came from and the day it came in.
        </p>
      </div>
    </section>
  );
}
