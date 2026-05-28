import Image from "next/image";
import Link from "next/link";
import { MapPin, Award, Package } from "lucide-react";
import { farmers } from "../../lib/mock-data/farmers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Farmers — Yendzi",
  description: "Meet the Ghanaian farmers behind every Yendzi product.",
};

export default function FarmersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-charcoal mb-4">
          Meet Our Farmers
        </h1>
        <p className="text-charcoal-light text-lg leading-relaxed">
          Every product on Yendzi traces back to a real Ghanaian farmer. We verify every
          farm, visit every field, and make sure your food is grown with care.
        </p>
      </div>

      {/* Farmers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.map((farmer) => (
          <Link
            key={farmer.id}
            href={`/farmers/${farmer.slug}`}
            className="block bg-white rounded-2xl overflow-hidden border border-cream-dark hover:shadow-lg hover:border-green-light transition-all duration-200"
          >
            {/* Hero */}
            <div className="relative h-48 bg-green-light">
              <Image
                src={farmer.photo}
                alt={farmer.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="font-heading font-bold text-xl text-cream">{farmer.name}</h2>
                <p className="text-cream/80 text-sm flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {farmer.location}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-charcoal-light text-sm leading-relaxed line-clamp-3 mb-4">
                {farmer.story}
              </p>

              <div className="flex items-center gap-4 text-xs text-charcoal-light mb-4">
                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" /> {farmer.productsCount} products
                </span>
                <span>
                  Member since{" "}
                  {new Date(farmer.memberSince).toLocaleDateString("en-GH", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {farmer.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 text-xs bg-green-light text-green-deep rounded-full px-2.5 py-0.5"
                  >
                    <Award className="w-2.5 h-2.5" /> {cert}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-terra-light rounded-3xl p-8 sm:p-12 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
          Are you a Ghanaian farmer?
        </h2>
        <p className="text-charcoal-light text-base mb-6 max-w-md mx-auto">
          Join Yendzi and reach thousands of urban households in Accra with your produce.
          We handle logistics, payments, and marketing — you focus on growing.
        </p>
        <Link
          href="/vendor/apply"
          className="inline-flex items-center gap-2 bg-green-deep text-cream rounded-full px-7 py-3 font-semibold hover:bg-green-mid transition-colors"
        >
          Sell on Yendzi
        </Link>
      </div>
    </div>
  );
}
