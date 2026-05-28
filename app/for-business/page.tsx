import Link from "next/link";
import Image from "next/image";
import { Building2, Clock, FileText, Truck, ShieldCheck, ChefHat, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yendzi for Business — Bulk Fresh Produce for Restaurants & Hotels",
  description:
    "Premium farm-fresh ingredients delivered on your schedule. Net-7 invoicing, dedicated account manager, custom sourcing for Accra's top restaurants and hotels.",
};

const benefits = [
  {
    icon: Truck,
    title: "Scheduled Bulk Deliveries",
    body: "Pre-dawn deliveries (4–6 AM) so your kitchen is stocked before service begins. Weekly, bi-weekly, or daily — you set the cadence.",
  },
  {
    icon: FileText,
    title: "Net-7 Invoicing",
    body: "Invoice-based billing with 7-day payment terms. No card on file required. Itemised receipts sent straight to your accounts email.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guarantee",
    body: "Every item is inspected at the farm gate. If anything falls short of grade, we replace it free on your next delivery — no back-and-forth.",
  },
  {
    icon: ChefHat,
    title: "Custom Sourcing",
    body: "Need heirloom tomatoes, specific herb varieties, or large volumes of a single crop? Tell us and we'll locate the right farmer within 48 hours.",
  },
  {
    icon: Clock,
    title: "Dedicated Account Manager",
    body: "One number, one person. Your account manager knows your menu, your volumes, and your preferences — no repeating yourself each order.",
  },
  {
    icon: Building2,
    title: "Multi-Outlet Support",
    body: "Running multiple locations? Consolidate all your produce orders under one account with per-outlet delivery notes and split invoicing.",
  },
];

const clients = [
  { name: "Restaurants", desc: "From neighbourhood chop bars to fine dining" },
  { name: "Hotels & Resorts", desc: "High-volume, consistent quality every day" },
  { name: "Catering Companies", desc: "Event sourcing with 48-hour notice" },
  { name: "Corporate Canteens", desc: "Steady weekly supply, predictable cost" },
  { name: "Juice Bars & Cafés", desc: "Specialty fruits and cold-press stock" },
  { name: "School Feeding Programs", desc: "Bulk staples at contract pricing" },
];

const steps = [
  { num: "01", title: "Tell us your needs", body: "Fill in the form below or call us. We'll ask about your menu, weekly volume, and delivery window." },
  { num: "02", title: "Get a custom quote", body: "Within 24 hours we'll send a price list and sample delivery schedule tailored to your kitchen." },
  { num: "03", title: "Trial delivery", body: "We do a free 3-item trial delivery so your chef can grade the quality before you commit." },
  { num: "04", title: "Go live", body: "Sign the supply agreement and your first regular delivery is booked. Adjust quantities any time." },
];

export default function ForBusinessPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative bg-green-deep text-cream py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.pexels.com/photos/27052301/pexels-photo-27052301.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Fresh produce supply at an outdoor market"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-green-deep/70 to-green-deep/90" />
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-block bg-terra/20 text-terra-light text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            Yendzi for Business
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Farm-fresh ingredients,<br className="hidden sm:block" /> built for your kitchen
          </h1>
          <p className="text-cream/75 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Skip the market. We source directly from verified Ghanaian farmers and deliver
            inspection-graded produce to your restaurant, hotel, or canteen on the schedule
            your kitchen demands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#enquire"
              className="inline-flex items-center justify-center gap-2 bg-terra text-cream rounded-full px-8 py-3.5 font-semibold hover:bg-terra/90 transition-colors"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+233300000000"
              className="inline-flex items-center justify-center gap-2 border border-cream/30 text-cream rounded-full px-8 py-3.5 font-semibold hover:bg-cream/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call us now
            </a>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <div className="bg-green-mid text-cream/80 text-sm py-3 px-4 text-center">
        Trusted by restaurants, hotels, and caterers across Accra — from East Legon to Cantonments
      </div>

      {/* Who we serve */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-10">
          Who we supply
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {clients.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl border border-cream-dark p-5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-deep shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal text-sm">{c.name}</p>
                <p className="text-xs text-charcoal-light mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
              Why kitchens choose Yendzi
            </h2>
            <p className="text-charcoal-light text-base max-w-xl mx-auto">
              We&apos;re not a wholesale market — we&apos;re a supply partner built around your operations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-cream-dark p-6 hover:shadow-md hover:border-green-light transition-all">
                <div className="w-10 h-10 bg-green-light rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-green-deep" />
                </div>
                <h3 className="font-semibold text-charcoal text-base mb-2">{b.title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12">
          How it works
        </h2>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={s.num} className="flex gap-5 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-green-deep text-cream flex items-center justify-center font-heading font-bold text-sm">
                {s.num}
              </div>
              <div className="pt-2">
                <h3 className="font-semibold text-charcoal text-base mb-1">{s.title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">{s.body}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden" /> /* spacer only used for visual clarity */
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative bg-terra-light py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Fresh produce market"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="shrink-0 w-20 h-20 rounded-full overflow-hidden border-4 border-terra/30 shadow-md">
            <Image
              src="https://images.pexels.com/photos/28074289/pexels-photo-28074289.jpeg?auto=compress&cs=tinysrgb&w=240"
              alt="Chef Kojo Mensah"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-heading text-lg sm:text-xl text-charcoal leading-relaxed mb-4">
              &ldquo;Before Yendzi, I was at Makola by 5 AM three times a week. Now I send a WhatsApp
              and the produce is waiting when my team arrives. The quality is consistently better
              than anything I could find at the market.&rdquo;
            </p>
            <p className="font-semibold text-charcoal">Chef Kojo Mensah</p>
            <p className="text-xs text-charcoal-light mt-0.5">Executive Chef · The Palm Restaurant, East Legon</p>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquire" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
            Get a custom quote
          </h2>
          <p className="text-charcoal-light text-sm">
            We&apos;ll get back to you within 24 hours with a price list and sample schedule.
          </p>
        </div>

        <form className="bg-white rounded-3xl border border-cream-dark p-8 space-y-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Business name</label>
              <input
                type="text"
                placeholder="The Palm Restaurant"
                className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Business type</label>
              <select className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep">
                <option value="">Select…</option>
                <option>Restaurant</option>
                <option>Hotel / Resort</option>
                <option>Catering Company</option>
                <option>Corporate Canteen</option>
                <option>Juice Bar / Café</option>
                <option>School Feeding Program</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Contact name</label>
              <input
                type="text"
                placeholder="Chef Kojo"
                className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Phone (WhatsApp)</label>
              <input
                type="tel"
                placeholder="055 000 0000"
                className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">What do you need most?</label>
            <textarea
              rows={4}
              placeholder="e.g. Fresh tomatoes, garden eggs, plantain — about 80 kg/week. Delivery before 6 AM would be ideal."
              className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-green-deep/30 focus:border-green-deep resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-deep text-cream rounded-full py-3.5 font-semibold hover:bg-green-mid transition-colors"
          >
            Send enquiry
          </button>
          <p className="text-center text-xs text-charcoal-light">
            Or call <a href="tel:+233300000000" className="text-green-deep font-medium">+233 30 000 0000</a> · Mon–Sat, 6 AM–6 PM
          </p>
        </form>
      </section>

      {/* Bottom CTA */}
      <section className="bg-green-deep text-cream py-14 px-4 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
          Already on Yendzi? Upgrade to a business account
        </h2>
        <p className="text-cream/70 text-base mb-8 max-w-lg mx-auto">
          Existing customers can unlock bulk pricing, invoice billing, and a dedicated manager
          by applying from their account dashboard.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-terra text-cream rounded-full px-8 py-3.5 font-semibold hover:bg-terra/90 transition-colors"
        >
          Create a business account <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
