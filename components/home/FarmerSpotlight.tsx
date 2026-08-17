import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Award } from "lucide-react";
import { farmers } from "../../lib/mock-data/farmers";
import { Button } from "../ui/Button";

export function FarmerSpotlight() {
  const farmer = farmers[0];

  return (
    <section className="bg-green-deep py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <p className="type-stencil text-terra mb-4">
              Farm {farmer.id} · {farmer.region} Region
            </p>
            <h2 className="type-h2 text-cream mb-5">
              {farmer.name} has worked the red soil at {farmer.location.split(",")[0]}{" "}
              since {new Date(farmer.memberSince).getFullYear()}.
            </h2>
            <p className="text-cream/70 text-base leading-relaxed mb-6">
              {farmer.productsCount} lots on Yendzi today, each one dated. We walk
              every farm before it lists and check the claims on the label —{" "}
              {farmer.certifications.join(", ").toLowerCase()} included.
            </p>

            <blockquote className="border-l-4 border-terra pl-4 mb-8">
              <p className="text-cream/80 italic text-lg leading-relaxed">
                &ldquo;{farmer.story.split(".")[0]}.&rdquo;
              </p>
              <footer className="mt-2 flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={farmer.photo} alt={farmer.name} fill className="object-cover" sizes="40px" />
                </div>
                <span className="text-cream/70 text-sm font-medium">{farmer.name}</span>
                <span className="text-cream/40 text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {farmer.location}
                </span>
              </footer>
            </blockquote>

            <Link href="/farmers">
              <Button variant="secondary" size="md" className="gap-2">
                Meet All Farmers <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Farmer cards */}
          <div className="grid grid-cols-2 gap-4">
            {farmers.slice(0, 4).map((f) => (
              <Link
                key={f.id}
                href={`/farmers/${f.slug}`}
                className="group bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-4 transition-all"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
                  <Image src={f.photo} alt={f.name} fill className="object-cover" sizes="80px" />
                </div>
                <p className="font-semibold text-cream text-sm">{f.name}</p>
                <p className="text-cream/60 text-xs flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5" /> {f.location.split(",")[0]}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {f.certifications.slice(0, 1).map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1 text-xs text-soft-yellow/80 bg-white/5 rounded-full px-2 py-0.5"
                    >
                      <Award className="w-2.5 h-2.5" /> {cert}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
