import Image from "next/image";
import Link from "next/link";
import { MapPin, Award, ArrowRight } from "lucide-react";
import type { Farmer } from "../../lib/types";

interface FarmerCardProps {
  farmer: Farmer;
}

export function FarmerCard({ farmer }: FarmerCardProps) {
  return (
    <div className="bg-green-light rounded-2xl p-5 border border-green-mid/20">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-green-mid/30">
          <Image src={farmer.photo} alt={farmer.name} fill className="object-cover" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-charcoal text-base">{farmer.name}</h3>
          <p className="text-charcoal-light text-xs flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {farmer.location}
          </p>
          <p className="text-charcoal-light text-xs mt-1">
            {farmer.productsCount} products · Member since {new Date(farmer.memberSince).toLocaleDateString("en-GH", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <p className="text-charcoal text-sm leading-relaxed mt-4 line-clamp-3">
        {farmer.story}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {farmer.certifications.map((cert) => (
          <span
            key={cert}
            className="inline-flex items-center gap-1 text-xs bg-green-deep/10 text-green-deep rounded-full px-2.5 py-0.5"
          >
            <Award className="w-2.5 h-2.5" /> {cert}
          </span>
        ))}
      </div>

      <Link
        href={`/farmers/${farmer.slug}`}
        className="inline-flex items-center gap-1.5 text-green-deep text-sm font-semibold mt-2 hover:gap-2.5 transition-all min-h-[44px]"
      >
        View full profile <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
