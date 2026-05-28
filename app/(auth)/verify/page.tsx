"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Leaf, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../../../lib/store/auth";
import { Button } from "../../../components/ui/Button";

export default function VerifyPage() {
  const router = useRouter();
  const { pendingPhone, login } = useAuthStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!pendingPhone) router.replace("/signup");
    inputRefs.current[0]?.focus();
  }, [pendingPhone, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = text.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(next);
    inputRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login(pendingPhone);
    router.push("/checkout");
    setLoading(false);
  };

  const maskedPhone = pendingPhone
    ? pendingPhone.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2")
    : "";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-green-deep rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-cream" />
          </div>
          <span className="font-heading font-bold text-2xl text-green-deep">Yendzi</span>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-cream-dark">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-charcoal-light text-sm hover:text-charcoal mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <h1 className="font-heading text-2xl font-bold text-charcoal mb-2">
            Check your phone
          </h1>
          <p className="text-charcoal-light text-sm mb-7">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-charcoal">{maskedPhone}</span>.
            <br />
            <span className="text-xs mt-1 block">For this prototype, any 6 digits will work.</span>
          </p>

          {/* OTP inputs */}
          <div className="flex gap-2 justify-center mb-5" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-11 h-13 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all bg-cream
                  focus:border-green-deep focus:bg-white
                  border-cream-dark"
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {error && <p className="text-xs text-red-500 text-center mb-4">{error}</p>}

          <Button
            fullWidth
            size="lg"
            onClick={handleVerify}
            disabled={loading || otp.join("").length < 6}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </Button>

          <button className="w-full text-center text-sm text-charcoal-light mt-4 hover:text-charcoal transition-colors">
            Didn&apos;t receive it? <span className="text-green-deep font-medium">Resend code</span>
          </button>
        </div>
      </div>
    </div>
  );
}
