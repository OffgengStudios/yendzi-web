import { clsx } from "clsx";
import type { Badge as BadgeType } from "../../lib/types";

const badgeConfig: Record<BadgeType, { label: string; className: string }> = {
  organic: {
    label: "Organic",
    className: "bg-green-light text-green-deep border border-green-mid/30",
  },
  "locally-grown": {
    label: "Local",
    className: "bg-soft-yellow-light text-charcoal border border-soft-yellow/40",
  },
  "eco-packaged": {
    label: "Eco Pack",
    className: "bg-green-light text-green-mid border border-green-mid/30",
  },
  seasonal: {
    label: "Seasonal",
    className: "bg-terra-light text-terra border border-terra/30",
  },
  "bulk-available": {
    label: "Bulk",
    className: "bg-cream-dark text-charcoal border border-charcoal/20",
  },
};

interface BadgeProps {
  badge: BadgeType;
  size?: "sm" | "md";
}

export function ProductBadge({ badge, size = "sm" }: BadgeProps) {
  const config = badgeConfig[badge];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium",
        config.className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {config.label}
    </span>
  );
}
