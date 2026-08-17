"use client";

import { clsx } from "clsx";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      disabled={disabled}
      className={clsx(
        // Square. Pills next to hard-edged crates read as two design systems.
        "inline-flex items-center justify-center gap-2 font-semibold tracking-[-0.005em] transition-colors duration-150 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed",
        {
          "bg-green-deep text-cream hover:bg-green-mid": variant === "primary",
          "bg-terra text-cream hover:opacity-90": variant === "secondary",
          "border border-green-deep text-green-deep hover:bg-green-light": variant === "outline",
          "text-green-deep hover:bg-green-light": variant === "ghost",
        },
        {
          "px-3.5 py-2 text-sm": size === "sm",
          "px-5 py-2.5 text-[15px]": size === "md",
          "px-7 py-3.5 text-base": size === "lg",
        },
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
