import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Award, Package, Calendar, Star, ArrowLeft } from "lucide-react";
import { farmers, getFarmerBySlug } from "../../../lib/mock-data/farmers";
import { products } from "../../../lib/mock-data/products";
import { ProductCard } from "../../../components/shop/ProductCard";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return farmers.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const farmer = getFarmerBySlug(slug);
  return {
    title: farmer ? `${farmer.name} — Yendzi Farmer` : "Farmer not found",
    description: farmer?.story,
  };
}

export default async function FarmerProfilePage({ params }: Props) {
  const { slug } = await params;
  const farmer = getFarmerBySlug(slug);
  if (!farmer) notFound();

  const farmerProducts = products.filter((p) => p.farmer.id === farmer.id);
  const avgRating =
    farmerProducts.length > 0
      ? (farmerProducts.reduce((s, p) => s + p.rating, 0) / farmerProducts.length).toFixed(1)
      : "—";
  const totalReviews = farmerProducts.reduce((s, p) => s + p.reviewCount, 0);

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 bg-green-deep overflow-hidden">
        <Image
          src={farmer.photo}
          alt={farmer.name}
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/60 to-transparent" />

        {/* Back link */}
        <div className="absolute top-5 left-5">
          <Link
            href="/farmers"
            className="inline-flex items-center gap-1.5 text-cream/80 hover:text-cream text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Farmers
          </Link>
        </div>

        {/* Farmer info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 flex items-end gap-5">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-cream/30 shrink-0 shadow-xl">
            <Image src={farmer.photo} alt={farmer.name} fill className="object-cover" sizes="(max-width: 640px) 80px, 96px" />
          </div>
          <div className="pb-1">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-cream leading-tight">
              {farmer.name}
            </h1>
            <p className="text-cream/70 text-sm flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5" /> {farmer.location}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Package,  label: "Products",       value: farmer.productsCount },
            { icon: Star,     label: "Avg Rating",     value: avgRating },
            { icon: Package,  label: "Total Reviews",  value: totalReviews },
            { icon: Calendar, label: "Member Since",   value: new Date(farmer.memberSince).toLocaleDateString("en-GH", { month: "short", year: "numeric" }) },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-cream-dark p-4 text-center">
              <p className="font-heading font-bold text-xl text-charcoal">{s.value}</p>
              <p className="text-xs text-charcoal-light mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          {/* Story */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-xl font-bold text-charcoal mb-4">About {farmer.name}</h2>
            <p className="text-charcoal-light text-base leading-loose">{farmer.story}</p>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {farmer.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 bg-green-light text-green-deep text-sm font-semibold rounded-full px-3.5 py-1.5"
                >
                  <Award className="w-3.5 h-3.5" /> {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        {farmerProducts.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
              {farmer.name.split(" ")[0]}&apos;s Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {farmerProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-green-deep rounded-3xl p-8 sm:p-10 text-center">
          <h3 className="font-heading text-2xl font-bold text-cream mb-3">
            Want to support {farmer.name.split(" ")[0]}?
          </h3>
          <p className="text-cream/70 text-sm mb-6 max-w-md mx-auto">
            Every purchase goes directly to the farmer within 24 hours.
            No middlemen. Fair prices. Real impact.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-terra text-cream rounded-full px-7 py-3 font-semibold hover:bg-terra/85 transition-colors"
          >
            Shop Fresh Produce
          </Link>
        </div>
      </div>
    </div>
  );
}
