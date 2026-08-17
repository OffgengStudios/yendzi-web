import { clsx } from "clsx";
import { PERISHABLE_CATEGORIES } from "../../lib/types";
import type { HarvestAction, ProductCategory } from "../../lib/types";

interface FreshnessBadgeProps {
  harvestDate: string;
  action: HarvestAction;
  category: ProductCategory;
  size?: "sm" | "md";
}

function getDaysSinceHarvest(harvestDate: string): number {
  const harvest = new Date(harvestDate).getTime();
  return Math.floor((Date.now() - harvest) / (1000 * 60 * 60 * 24));
}

const VERB: Record<HarvestAction, string> = {
  picked: "Picked",
  cut: "Cut",
  lifted: "Lifted",
  landed: "Landed",
  dressed: "Dressed",
  smoked: "Smoked",
  gathered: "Gathered",
  harvested: "Harvested",
  pressed: "Pressed",
  blended: "Blended",
  brewed: "Brewed",
  roasted: "Roasted",
  milled: "Milled",
  made: "Made",
  packed: "Packed",
};

/**
 * A dated stamp: what was done to this lot, and when.
 *
 * The verb comes from the product rather than being a single word for the
 * whole catalogue — tilapia is landed, a fowl is dressed, cane is pressed.
 *
 * The colour only escalates for perishables. Shea butter made a week ago is
 * not a warning, so ageing its stamp toward the alarm colour would be lying
 * about shelf life.
 */
export function FreshnessBadge({
  harvestDate,
  action,
  category,
  size = "md",
}: FreshnessBadgeProps) {
  const days = getDaysSinceHarvest(harvestDate);
  const perishable = (PERISHABLE_CATEGORIES as readonly string[]).includes(category);

  const when = days < 1 ? "today" : days === 1 ? "yesterday" : `${days}d ago`;

  let tone: string;
  if (!perishable) {
    tone = "bg-charcoal/75 text-cream";
  } else if (days < 1) {
    tone = "bg-green-deep text-cream";
  } else if (days === 1) {
    tone = "bg-green-mid text-cream";
  } else if (days <= 3) {
    tone = "bg-soft-yellow text-charcoal";
  } else {
    tone = "bg-terra text-cream";
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center font-semibold tnum",
        tone,
        size === "sm" ? "px-2 py-1 text-[11px]" : "px-2.5 py-1.5 text-xs"
      )}
    >
      {VERB[action]} {when}
    </span>
  );
}
