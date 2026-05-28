"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Sprout, Clock, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { icon: Sprout, num: "120+", label: "Local Farmers" },
  { icon: Clock, num: "24hr", label: "Farm to Door" },
  { icon: ShieldCheck, num: "100%", label: "Traceable" },
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

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-[1.08] mb-4 sm:mb-5">
            From <em className="not-italic text-terra">farm</em><br />
            to your table.
          </h1>

          <p className="font-heading italic text-cream/75 text-base sm:text-lg mb-3 sm:mb-4 leading-relaxed">
            Yɛn adze — our thing.
          </p>

          <p className="text-cream/70 text-sm sm:text-base leading-loose max-w-md mb-8 sm:mb-10">
            Real farmers. Real freshness. Delivered to your doorstep across Accra
            before the day is done. Every product on Yendzi traces back to
            a Ghanaian farmer you can meet.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <motion.div whileTap={{ scale: 0.96 }} transition={springTap}>
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 bg-terra text-cream px-7 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-terra/85 transition-all group"
              >
                Shop Fresh Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.96 }} transition={springTap}>
              <Link
                href="/farmers"
                className="flex items-center justify-center gap-2 border border-green-light/30 text-green-light/80 text-sm font-medium px-7 py-4 rounded-full hover:text-cream hover:border-cream transition-colors"
              >
                Meet our farmers
              </Link>
            </motion.div>
          </div>

          {/* Traction signal */}
          <div className="flex items-center gap-2 mt-5">
            <div className="flex -space-x-1.5">
              {[
                "https://images.pexels.com/photos/36611201/pexels-photo-36611201.jpeg?auto=compress&cs=tinysrgb&w=120",
                "https://images.pexels.com/photos/27935664/pexels-photo-27935664.jpeg?auto=compress&cs=tinysrgb&w=120",
                "https://images.pexels.com/photos/30893262/pexels-photo-30893262.jpeg?auto=compress&cs=tinysrgb&w=120",
              ].map((src) => (
                <div key={src} className="w-7 h-7 rounded-full border-2 border-green-deep overflow-hidden relative">
                  <Image src={src} alt="User" fill className="object-cover" sizes="28px" />
                </div>
              ))}
            </div>
            <p className="text-cream/70 text-xs">
              <span className="text-soft-yellow font-semibold">1,200+</span> households on early access
            </p>
          </div>

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
              <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
                <Image
                  src="https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Fresh Kontomire at a Ghanaian market stall"
                  fill
                  className="object-cover"
                  style={{ opacity: imageOpacity as unknown as number }}
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

            {/* Floating stat pills */}
            <div className="absolute -right-4 top-1/3 flex flex-col gap-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 bg-green-deep/90 border border-green-light/20 backdrop-blur-sm px-4 py-3 min-w-[160px] shadow-lg"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <s.icon className="w-5 h-5 text-terra shrink-0" />
                  <div>
                    <p className="font-heading font-bold text-cream text-base leading-none">{s.num}</p>
                    <p className="text-green-light/70 text-[10px] tracking-widest uppercase mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stats row */}
        <div className="lg:hidden flex gap-6 mt-2">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-heading font-bold text-soft-yellow text-2xl">{s.num}</p>
              <p className="text-green-light/60 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
