import type { Category } from "../types";

export const categories: Category[] = [
  {
    id: "fresh-produce",
    name: "Fresh Produce",
    description: "Fruits, vegetables, herbs — harvested within 24 hours",
    icon: "Sprout",
    color: "bg-green-light text-green-deep",
  },
  {
    id: "butchery",
    name: "Butchery",
    description: "Ghanaian poultry, lake fish, goat, beef, mutton, and rabbit",
    icon: "Beef",
    color: "bg-terra-light text-terra",
  },
  {
    id: "juices",
    name: "Juices & Smoothies",
    description: "Cold-pressed, no additives, made from our farms",
    icon: "GlassWater",
    color: "bg-soft-yellow-light text-charcoal",
  },
  {
    id: "nuts-pantry",
    name: "Nuts, Seeds & Pantry",
    description: "Staples, grains, groundnuts, spices from Ghanaian farms",
    icon: "Nut",
    color: "bg-cream-dark text-charcoal",
  },
  {
    id: "eco-products",
    name: "Eco Products",
    description: "Sustainable goods — coconut oil, shea, reusables",
    icon: "Leaf",
    color: "bg-green-light text-green-mid",
  },
  {
    id: "subscription-boxes",
    name: "Subscription Boxes",
    description: "Curated weekly boxes delivered to your door",
    icon: "PackageOpen",
    color: "bg-terra-light text-terra",
  },
];
