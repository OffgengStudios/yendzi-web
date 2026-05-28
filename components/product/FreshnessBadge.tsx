import { clsx } from "clsx";

interface FreshnessBadgeProps {
  harvestDate: string;
  size?: "sm" | "md";
}

function getDaysSinceHarvest(harvestDate: string): number {
  const harvest = new Date(harvestDate).getTime();
  const now = Date.now();
  return Math.floor((now - harvest) / (1000 * 60 * 60 * 24));
}

export function FreshnessBadge({ harvestDate, size = "md" }: FreshnessBadgeProps) {
  const days = getDaysSinceHarvest(harvestDate);

  let label: string;
  let className: string;

  if (days < 1) {
    label = "Today";
    className = "bg-green-deep text-cream";
  } else if (days === 1) {
    label = "Yesterday";
    className = "bg-green-mid text-cream";
  } else if (days <= 3) {
    label = `${days}d ago`;
    className = "bg-soft-yellow text-charcoal";
  } else {
    label = `${days}d ago`;
    className = "bg-terra text-cream";
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-semibold",
        className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      🌱 {label}
    </span>
  );
}
