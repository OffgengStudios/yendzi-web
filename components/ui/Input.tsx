import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-charcoal">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "rounded-xl border px-4 py-3 text-charcoal placeholder:text-charcoal-light/60 bg-white outline-none transition-all",
          "focus:border-green-deep focus:ring-2 focus:ring-green-deep/10",
          error ? "border-red-400" : "border-cream-dark",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-charcoal-light">{hint}</p>}
    </div>
  );
}
