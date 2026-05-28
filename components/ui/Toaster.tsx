"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToastStore } from "../../lib/store/toast";

const icons = {
  success: <CheckCircle2 className="w-4 h-4 text-green-deep shrink-0" />,
  error:   <AlertCircle  className="w-4 h-4 text-terra shrink-0" />,
  info:    <Info         className="w-4 h-4 text-charcoal-light shrink-0" />,
};

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-24 right-4 md:bottom-5 md:right-5 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-white border border-cream-dark rounded-2xl px-4 py-3 shadow-lg pointer-events-auto min-w-[260px] max-w-xs animate-in"
          style={{ animation: "slideUp 0.2s ease" }}
        >
          {icons[t.type]}
          <p className="text-sm text-charcoal flex-1 font-medium">{t.message}</p>
          <button
            onClick={() => dismiss(t.id)}
            className="p-0.5 text-charcoal-light hover:text-charcoal transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
