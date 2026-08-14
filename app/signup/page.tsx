"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, ArrowRight, ShieldCheck, CheckCircle2, Loader2,
  ShoppingBag, Sprout,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/auth";

type Role = "customer" | "vendor";
type Step = "role" | "phone" | "otp" | "success";

const springTap = { type: "spring", stiffness: 500, damping: 28 } as const;

const slideVariants = {
  enter:  { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0  },
  exit:   { opacity: 0, x: -24 },
};

const roleCfg = {
  customer: {
    panel: {
      eyebrow: "Fresh from Ghana's soil",
      heading: "Farm-fresh produce,\ndelivered to your door.",
      sub: "Join 1,200+ Accra households eating local, fresh, and supporting Ghanaian farmers every week.",
    },
    stats: [
      { num: "120+", label: "Farmers" },
      { num: "24hr", label: "Delivery" },
      { num: "100%", label: "Traceable" },
    ],
    redirect: "/shop",
    done: "Taking you to the shop…",
    accent: "bg-green-deep hover:bg-green-mid",
    verifyAccent: "bg-terra hover:bg-terra/85",
    checkBg: "bg-green-light",
    checkIcon: "text-green-deep",
  },
  vendor: {
    panel: {
      eyebrow: "Grow. List. Earn.",
      heading: "Reach 10,000+\nAccra households.",
      sub: "List your harvest in minutes. Get paid every Friday via MoMo — no bank account required.",
    },
    stats: [
      { num: "0%", label: "Listing fee" },
      { num: "24hr", label: "Order alerts" },
      { num: "MoMo", label: "Weekly pay" },
    ],
    redirect: "/vendor/dashboard",
    done: "Taking you to your dashboard…",
    accent: "bg-terra hover:bg-terra/85",
    verifyAccent: "bg-terra hover:bg-terra/85",
    checkBg: "bg-terra-light",
    checkIcon: "text-terra",
  },
} as const;

export default function SignUpPage() {
  const router = useRouter();
  const login  = useAuthStore((s) => s.login);

  const [role,    setRole]    = useState<Role>("customer");
  const [step,    setStep]    = useState<Step>("role");
  const [phone,   setPhone]   = useState("");
  const [otp,     setOtp]     = useState("");
  const [name,    setName]    = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // Accept 0241234567, 241234567 or 233241234567 and reduce them all to the
  // 9-digit national number. Validating before this step let 024412345 — nine
  // characters but only eight once the trunk 0 is dropped — through as a
  // malformed +2338xxxxxxx.
  const nationalPhone = phone.replace(/\D/g, "").replace(/^(?:233|0)/, "");
  const fullPhone = `+233${nationalPhone}`;
  const cfg = roleCfg[role];

  const handleSendOtp = async () => {
    if (nationalPhone.length !== 9) return setError("Enter a valid 9-digit Ghanaian number");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      if (!res.ok) throw new Error();
      setStep("otp");
    } catch {
      setError("Could not send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return setError("Enter the 4-digit OTP sent to your phone");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, otp, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      login(fullPhone, data.user.name, role);
      setStep("success");
      setTimeout(() => router.push(cfg.redirect), 1600);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex">

      {/* ── Left panel (desktop only) ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex flex-col justify-between w-[400px] shrink-0 bg-green-deep p-12 relative overflow-hidden"
        >
          <div className="absolute right-0 top-1/3 w-72 h-72 rounded-full bg-green-mid/25 blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-1/4 w-48 h-48 rounded-full bg-terra/10 blur-3xl pointer-events-none" />

          <Link href="/" className="flex items-center gap-2.5 relative z-10">
            <div className="w-9 h-9 rounded-full bg-terra flex items-center justify-center">
              <Leaf className="w-4 h-4 text-cream" />
            </div>
            <span className="font-heading font-bold text-2xl text-cream">Yendzi</span>
          </Link>

          <div className="relative z-10">
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-4">
              {cfg.panel.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-bold text-cream leading-tight mb-4 whitespace-pre-line">
              {cfg.panel.heading}
            </h2>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              {cfg.panel.sub}
            </p>
          </div>

          <div className="flex gap-8 relative z-10">
            {cfg.stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-soft-yellow text-2xl">{s.num}</p>
                <p className="text-cream/50 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Right panel (form) ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 min-h-screen">

        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-8 h-8 rounded-full bg-green-deep flex items-center justify-center">
            <Leaf className="w-4 h-4 text-cream" />
          </div>
          <span className="font-heading font-bold text-xl text-green-deep">Yendzi</span>
        </Link>

        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">

            {/* ── Step 0: Role picker ── */}
            {step === "role" && (
              <motion.div
                key="role"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-2">
                  Welcome to Yendzi
                </h1>
                <p className="text-charcoal-light text-sm mb-8">
                  How would you like to use the platform?
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  {/* Customer */}
                  <motion.button
                    onClick={() => setRole("customer")}
                    whileTap={{ scale: 0.98 }}
                    transition={springTap}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                      role === "customer"
                        ? "border-green-deep bg-green-light/30"
                        : "border-cream-dark bg-white hover:border-green-light"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      role === "customer" ? "bg-green-deep" : "bg-cream-dark"
                    }`}>
                      <ShoppingBag className={`w-5 h-5 ${role === "customer" ? "text-cream" : "text-charcoal-light"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-charcoal text-base">I want to shop</p>
                      <p className="text-charcoal-light text-sm mt-0.5 leading-snug">
                        Order fresh produce, track deliveries, support Ghanaian farmers.
                      </p>
                    </div>
                    {role === "customer" && (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-green-deep flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cream" />
                      </div>
                    )}
                  </motion.button>

                  {/* Vendor */}
                  <motion.button
                    onClick={() => setRole("vendor")}
                    whileTap={{ scale: 0.98 }}
                    transition={springTap}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                      role === "vendor"
                        ? "border-terra bg-terra-light/40"
                        : "border-cream-dark bg-white hover:border-terra/50"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      role === "vendor" ? "bg-terra" : "bg-cream-dark"
                    }`}>
                      <Sprout className={`w-5 h-5 ${role === "vendor" ? "text-cream" : "text-charcoal-light"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-charcoal text-base">I want to sell</p>
                      <p className="text-charcoal-light text-sm mt-0.5 leading-snug">
                        List your harvest, manage orders, and get paid via MoMo every Friday.
                      </p>
                    </div>
                    {role === "vendor" && (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-terra flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cream" />
                      </div>
                    )}
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => setStep("phone")}
                  whileTap={{ scale: 0.97 }}
                  transition={springTap}
                  className={`w-full text-cream rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${cfg.accent}`}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="text-center text-xs text-charcoal-light mt-6">
                  Already have an account?{" "}
                  <button
                    onClick={() => setStep("phone")}
                    className="text-green-deep font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}

            {/* ── Step 1: Phone ── */}
            {step === "phone" && (
              <motion.div
                key="phone"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {/* Role badge — tap to change */}
                <button
                  onClick={() => { setStep("role"); setError(""); }}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 transition-colors ${
                    role === "vendor"
                      ? "bg-terra-light text-terra hover:bg-terra/20"
                      : "bg-green-light text-green-deep hover:bg-green-light/70"
                  }`}
                >
                  {role === "vendor"
                    ? <Sprout className="w-3 h-3" />
                    : <ShoppingBag className="w-3 h-3" />}
                  {role === "vendor" ? "Farmer / Vendor" : "Customer"}
                  <span className="opacity-50 ml-0.5">· Change</span>
                </button>

                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-1">
                  Sign in or create account
                </h1>
                <p className="text-charcoal-light text-sm mb-8">
                  Enter your Ghanaian phone number — we&apos;ll send you a code.
                </p>

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 border border-cream-dark rounded-2xl px-4 py-3.5 bg-white focus-within:border-green-deep focus-within:ring-2 focus-within:ring-green-deep/10 transition-all">
                    <span className="text-sm font-semibold text-charcoal shrink-0">🇬🇭 +233</span>
                    <div className="w-px h-4 bg-cream-dark shrink-0" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      placeholder="20 123 4567"
                      maxLength={10}
                      autoFocus
                      className="flex-1 text-sm text-charcoal outline-none bg-transparent placeholder:text-charcoal-light/40"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-terra text-xs mb-4 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-terra inline-block" />
                    {error}
                  </p>
                )}

                <motion.button
                  onClick={handleSendOtp}
                  disabled={loading}
                  whileTap={loading ? undefined : { scale: 0.97 }}
                  transition={springTap}
                  className={`w-full text-cream rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 ${cfg.accent}`}
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending OTP…</>
                    : <>Continue <ArrowRight className="w-4 h-4" /></>}
                </motion.button>

                <p className="text-center text-xs text-charcoal-light mt-6 leading-relaxed">
                  By continuing you agree to our{" "}
                  <Link href="#" className="text-green-deep underline underline-offset-2">Terms</Link>
                  {" "}and{" "}
                  <Link href="#" className="text-green-deep underline underline-offset-2">Privacy Policy</Link>.
                </p>
              </motion.div>
            )}

            {/* ── Step 2: OTP ── */}
            {step === "otp" && (
              <motion.div
                key="otp"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    role === "vendor" ? "bg-terra-light" : "bg-green-light"
                  }`}>
                    <ShieldCheck className={`w-5 h-5 ${role === "vendor" ? "text-terra" : "text-green-deep"}`} />
                  </div>
                  <div>
                    <h1 className="font-heading text-xl font-bold text-charcoal">Enter your code</h1>
                    <p className="text-charcoal-light text-xs">Sent to +233 {phone}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
                    Your name{" "}
                    <span className="text-charcoal-light/50 font-normal normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === "vendor" ? "Kwame Asante" : "Ama Owusu"}
                    className="w-full border border-cream-dark rounded-2xl px-4 py-3.5 text-sm text-charcoal outline-none bg-white focus:border-green-deep focus:ring-2 focus:ring-green-deep/10 transition-all placeholder:text-charcoal-light/40"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
                    4-digit OTP{" "}
                    <span className="text-terra/70 font-normal normal-case tracking-normal">— use 1234 for demo</span>
                  </label>
                  <input
                    type="tel"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 4)); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                    placeholder="• • • •"
                    maxLength={4}
                    autoFocus
                    className="w-full border border-cream-dark rounded-2xl px-4 py-4 text-3xl text-center font-bold tracking-[0.6em] text-charcoal outline-none bg-white focus:border-green-deep focus:ring-2 focus:ring-green-deep/10 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-terra text-xs mb-4 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-terra inline-block" />
                    {error}
                  </p>
                )}

                <motion.button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  whileTap={loading ? undefined : { scale: 0.97 }}
                  transition={springTap}
                  className={`w-full text-cream rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 ${cfg.verifyAccent}`}
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
                    : <>Verify &amp; Enter <ArrowRight className="w-4 h-4" /></>}
                </motion.button>

                <button
                  onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                  className="w-full text-center text-sm text-charcoal-light hover:text-charcoal mt-4 py-2 transition-colors"
                >
                  ← Change number
                </button>
              </motion.div>
            )}

            {/* ── Step 3: Success ── */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.1 }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${cfg.checkBg}`}
                >
                  <CheckCircle2 className={`w-10 h-10 ${cfg.checkIcon}`} />
                </motion.div>
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
                  Welcome{name ? `, ${name.split(" ")[0]}` : " to Yendzi"}!
                </h2>
                <p className="text-charcoal-light text-sm">{cfg.done}</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
