import Link from "next/link";
import Image from "next/image";
import { Sprout, MapPin, Check } from "lucide-react";
import type { Metadata } from "next";
import { Icon } from "../../components/ui/Icon";

export const metadata: Metadata = {
  title: "About Yendzi — Our Soil. Our Harvest. Our Future.",
  description:
    "Yendzi connects Ghanaian farmers directly with families. Food with a face, fair to farmers, proudly Ghanaian.",
};

const beliefs = [
  {
    icon: "Sprout" as const,
    title: "Food Should Have a Face",
    body: "Every product on Yendzi traces back to the person who grew it. No middlemen hiding the story. Real names, real farms, real soil.",
  },
  {
    icon: "HeartHandshake" as const,
    title: "Local Is Powerful",
    body: "Every cedi spent on Yendzi flows back to Ghanaian farmers and their communities — supporting the hands that work the land.",
  },
  {
    icon: "Recycle" as const,
    title: "Green Is Not a Trend",
    body: "Sustainability is part of our heritage. We carry eco-products, push reusable packaging, and believe the future of food must be lighter on the earth.",
  },
  {
    icon: "TreeDeciduous" as const,
    title: "Community Is the Harvest",
    body: "Yendzi is building a community around food and culture — the same spirit that made the market the heartbeat of every Ghanaian town.",
  },
];

const steps = [
  { num: "1", title: "Harvest", body: "Farmers harvest fresh produce daily, picked at peak ripeness." },
  { num: "2", title: "Connect", body: "Products go directly to customers — no middlemen, no long cold-chain." },
  { num: "3", title: "Pack", body: "Orders are packed sustainably with minimal plastic at our fulfilment hubs." },
  { num: "4", title: "Deliver", body: "Fresh produce arrives at your door, usually within 24 hours of harvest." },
];

const promises = [
  "Fresh produce harvested within 24 hours of your delivery",
  "Transparent sourcing — you always know which farm it came from",
  "Fair pricing for farmers and honest prices for families",
  "Eco-conscious packaging — minimal plastic, maximum care",
  "Proudly Ghanaian — built here, for here, by us",
];

const storyImages = [
  {
    src: "https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Customers buying fresh vegetables at an outdoor market",
  },
  {
    src: "https://images.pexels.com/photos/8540196/pexels-photo-8540196.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Farmer standing with fresh produce at a market stall",
  },
  {
    src: "https://images.pexels.com/photos/36611201/pexels-photo-36611201.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Woman shopping at a Ghanaian produce market",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[560px] flex items-center justify-center text-center py-32 px-4 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/36611201/pexels-photo-36611201.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Fresh produce at a Ghanaian market"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative max-w-3xl mx-auto text-cream">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Our Soil. Our Harvest.<br className="hidden sm:block" /> Our Future.
          </h1>
          <p className="text-cream/85 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Yendzi connects Ghanaian farmers directly with families, chefs,
            and communities who care about fresh food, honest sourcing,
            and a healthier future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-green-deep text-cream rounded-full px-8 py-3.5 font-semibold hover:bg-green-mid transition-colors"
            >
              <Sprout className="w-4 h-4" /> Shop Fresh Produce
            </Link>
            <Link
              href="/farmers"
              className="inline-flex items-center justify-center gap-2 border-2 border-cream text-cream rounded-full px-8 py-3.5 font-semibold hover:bg-cream/10 transition-colors"
            >
              <MapPin className="w-4 h-4" /> Meet Our Farmers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-8">
            Our Story
          </h2>
          <div className="space-y-5 text-charcoal-light text-base sm:text-lg leading-loose">
            <p className="font-semibold text-charcoal text-xl font-heading">
              It started with a question.
            </p>
            <p>
              Why is it that in a country blessed with some of the richest soil in West Africa —
              where mangoes ripen on roadside trees and tomatoes burst with flavour you can&apos;t
              find anywhere else — many of us have lost touch with where our food actually comes from?
            </p>
            <p>
              We walk through supermarkets picking up vegetables wrapped in plastic and shipped
              from far away. Meanwhile, less than a hundred kilometres away, a Ghanaian farmer
              watches her harvest spoil because she cannot reach the right customers in time.
            </p>
            <p className="font-medium text-charcoal">
              So we built Yendzi — a place where the farmer and the family find each other again.
            </p>
          </div>

          {/* 3-image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {storyImages.map((img) => (
              <div key={img.alt} className="relative h-64 sm:h-56 rounded-2xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why "Yendzi"? ── */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-6">
            Why &ldquo;Yendzi&rdquo;?
          </h2>
          <p className="text-charcoal-light text-base sm:text-lg leading-loose mb-6">
            <strong className="text-charcoal">Yendzi (yen-dzee)</strong> comes from the Twi phrase{" "}
            <strong className="text-charcoal">yɛn adze</strong> — meaning:
          </p>
          <blockquote className="border-l-4 border-green-deep pl-6 my-8">
            <p className="font-heading text-xl sm:text-2xl text-charcoal italic leading-snug">
              Our thing.<br />
              What belongs to us.<br />
              What we share.
            </p>
          </blockquote>
          <p className="text-charcoal-light text-base sm:text-lg leading-loose">
            Because the food on our table, the soil it grew in, and the hands that grew it —
            all of it is ours.
          </p>
        </div>
      </section>

      {/* ── What We Believe ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-10">
            What We Believe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl border border-cream-dark p-7 hover:shadow-md hover:border-green-light transition-all duration-200"
              >
                <Icon name={b.icon} className="w-6 h-6 text-green-deep mb-4" />
                <h3 className="font-heading font-bold text-charcoal text-lg mb-3">{b.title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── From Farm to Family ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-10">
            From Farm to Family
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-cream rounded-2xl border border-cream-dark p-7 text-center hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-green-deep text-cream flex items-center justify-center font-heading font-bold text-xl mx-auto mb-5">
                  {s.num}
                </div>
                <h3 className="font-heading font-bold text-charcoal text-lg mb-2">{s.title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Promise ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-8">
            Our Promise
          </h2>
          <ul className="space-y-4">
            {promises.map((p) => (
              <li key={p} className="flex items-start gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-green-deep flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-cream" strokeWidth={3} />
                </div>
                <p className="text-charcoal text-base sm:text-lg leading-relaxed">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Welcome Home CTA ── */}
      <section className="bg-green-deep py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream mb-5">
            Welcome Home
          </h2>
          <p className="text-cream/75 text-base sm:text-lg leading-relaxed mb-4">
            Whether you are a household, a chef, a farmer, or someone who simply
            believes Ghana can do this better — there is a seat at this table for you.
          </p>
          <h3 className="font-heading text-xl font-semibold text-cream mb-3">
            Welcome to Yendzi.
          </h3>
          <p className="font-heading italic text-2xl text-gold mb-10">
            Yɛn adze.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-terra text-cream rounded-full px-9 py-4 font-semibold text-base hover:bg-terra/85 transition-colors"
          >
            <Sprout className="w-4 h-4" /> Start Shopping
          </Link>
        </div>
      </section>

    </div>
  );
}
