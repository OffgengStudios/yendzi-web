"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Sprout, Clock, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Named lots with the hour they came in — the one claim a supermarket can't
// make. Each carries its own verb: greens are cut, a fowl is dressed.
const INTAKE = [
  { item: "Kontomire", verb: "cut", farm: "Akua Mensah · Aburi", at: "05:40" },
  { item: "Pineapple", verb: "cut", farm: "Kofi Asante · Suhum", at: "06:15" },
  { item: "Akoko tuntum", verb: "dressed", farm: "Ama Boateng · Krobo", at: "07:05" },
];

const HERO_PRODUCTS = [
  {
    name: "Organic Tomatoes",
    price: 12,
    unit: "kg",
    img: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300",
    tag: "Harvested Today",
  },
  {
    name: "Fresh Kontomire",
    price: 8,
    unit: "bunch",
    img: "https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=300",
    tag: "Organic",
  },
  {
    name: "Ripe Plantain",
    price: 15,
    unit: "bunch",
    img: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=300",
    tag: "Local Pick",
  },
];

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

export function HeroBanner() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const textY        = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textOpacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const imageScale   = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.8, 0.5]);

  return (
    <section
      ref={ref}
      className="relative bg-green-deep min-h-screen flex items-center overflow-hidden"
    >
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[80%] rounded-full bg-green-mid/25 blur-3xl" />
        <div className="absolute left-[10%] bottom-[10%] w-[35%] h-[40%] rounded-full bg-terra/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — text with parallax */}
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <div className="inline-flex items-center gap-2 text-terra text-xs font-semibold tracking-widest uppercase mb-5 sm:mb-7">
            <span className="w-8 h-px bg-terra block" />
            Fresh from Ghana&apos;s Soil
          </div>

          <h1 className="type-display text-cream mb-5 sm:mb-6">
            Cut this morning<br />
            in <em className="not-italic text-terra">Aburi</em>.
          </h1>

          <p className="text-cream/70 text-sm sm:text-base leading-relaxed max-w-md mb-8 sm:mb-10">
            Yɛn adze — our thing. Order before noon and Akua&apos;s kontomire,
            Kofi&apos;s pineapple and Ama&apos;s akoko tuntum reach your door in
            Accra tonight. Every lot carries the farm it came from and the day
            it came in.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <motion.div whileTap={{ scale: 0.96 }} transition={springTap}>
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 bg-terra text-cream px-7 py-4 font-semibold text-sm hover:bg-terra/85 transition-all group"
              >
                Shop today&apos;s harvest
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.96 }} transition={springTap}>
              <Link
                href="/farmers"
                className="flex items-center justify-center gap-2 border border-green-light/30 text-green-light/80 text-sm font-medium px-7 py-4 hover:text-cream hover:border-cream transition-colors"
              >
                Meet the farms
              </Link>
            </motion.div>
          </div>

          {/* Cut-off time, not a vanity count. It tells you when to act. */}
          <p className="text-cream/50 text-[13px] mt-6 border-t border-green-light/15 pt-4 max-w-md">
            Orders close at <span className="text-soft-yellow tnum">12:00</span> for
            same-day delivery in Accra. Delivery GHS <span className="tnum">25</span>.
          </p>

          {/* Mobile product preview strip */}
          <div className="lg:hidden mt-7 overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>
              {HERO_PRODUCTS.map((p) => (
                <motion.div key={p.name} whileTap={{ scale: 0.95 }} transition={springTap}>
                  <Link
                    href="/shop"
                    className="shrink-0 w-36 bg-green-mid/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-green-light/20 hover:border-terra/50 transition-colors block"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }}
                  >
                    <div className="relative h-24 overflow-hidden">
                      <Image src={p.img} alt={p.name} fill className="object-cover" sizes="144px" />
                      <span className="absolute top-2 left-2 bg-gold text-green-deep text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        {p.tag}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <p className="text-cream text-xs font-semibold leading-tight line-clamp-1">{p.name}</p>
                      <p className="text-terra text-sm font-bold mt-0.5">
                        GHS {p.price}{" "}
                        <span className="text-green-light/50 font-normal text-[10px]">/{p.unit}</span>
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
              <motion.div whileTap={{ scale: 0.95 }} transition={springTap}>
                <Link
                  href="/shop"
                  className="shrink-0 w-24 bg-green-mid/20 rounded-2xl border border-green-light/20 flex flex-col items-center justify-center gap-1 text-green-light/70 hover:text-cream hover:border-green-light/40 transition-colors h-full"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-[10px] font-semibold text-center leading-tight">See all products</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — product card + floating stats (image scales on scroll) */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-[440px]">
            <div className="relative aspect-[4/5] bg-gradient-to-br from-green-mid to-green-deep/60 overflow-hidden">
              {/* opacity belongs on the motion element — next/image is a plain
                  component and would receive the MotionValue as a raw object */}
              <motion.div
                className="absolute inset-0"
                style={{ scale: imageScale, opacity: imageOpacity }}
              >
                <Image
                  src="https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Fresh Kontomire at a Ghanaian market stall"
                  fill
                  className="object-cover"
                  priority
                  sizes="440px"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gold text-green-deep flex flex-col items-center justify-center text-center font-bold text-xs leading-snug shadow-lg">
                <Leaf className="w-4 h-4 mb-0.5" />
                Harvested<br />Today
              </div>

              {/* Today's Pick label — bottom-left corner of image */}
              <div className="absolute bottom-0 left-0 bg-terra text-cream px-5 py-3 min-w-[180px] shadow-xl">
                <p className="text-[10px] font-medium tracking-widest uppercase opacity-75 mb-0.5">Today&apos;s Pick</p>
                <p className="font-heading font-semibold text-base">Organic Kontomire</p>
              </div>
            </div>

            {/* The cut list — what actually came in, with who and when. */}
            <div
              className="absolute -right-5 top-1/4 w-60 bg-green-deep/92 border border-green-light/20 backdrop-blur-sm"
              style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10)" }}
            >
              <p className="type-stencil text-green-light/50 px-4 pt-3.5 pb-2.5 border-b border-green-light/15">
                Came in today
              </p>
              <ul>
                {INTAKE.map((lot) => (
                  <li
                    key={lot.item}
                    className="px-4 py-2.5 border-b border-green-light/10 last:border-0 flex items-baseline justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-cream text-[13px] font-semibold truncate">{lot.item}</p>
                      <p className="text-green-light/50 text-[11px] truncate">{lot.verb} · {lot.farm}</p>
                    </div>
                    <span className="type-price text-terra text-[13px] shrink-0 tnum">{lot.at}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile gets the same cut list — the hero image is desktop-only. */}
        <div className="lg:hidden border-y border-green-light/15">
          <p className="type-stencil text-green-light/50 py-2.5">Came in today</p>
          <ul className="border-t border-green-light/10">
            {INTAKE.map((lot) => (
              <li
                key={lot.item}
                className="py-2.5 border-b border-green-light/10 last:border-0 flex items-baseline justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-cream text-sm font-semibold truncate">{lot.item}</p>
                  <p className="text-green-light/50 text-xs truncate">{lot.verb} · {lot.farm}</p>
                </div>
                <span className="type-price text-terra text-sm shrink-0 tnum">{lot.at}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
