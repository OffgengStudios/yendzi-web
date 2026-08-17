import type { IconName } from "../components/ui/Icon";

export type Badge = "organic" | "locally-grown" | "eco-packaged" | "seasonal" | "bulk-available";

export type ProductUnit =
  | "kg"
  | "bunch"
  | "piece"
  | "litre"
  | "pack"
  | "bottle"
  | "tuber"
  | "finger"
  | "tray"
  | "paint rubber"
  | "small basket"
  | "cup"
  | "box";

/**
 * What was actually done to this lot on its harvest date.
 *
 * A single verb cannot cover the catalogue: tilapia is landed, a guinea fowl
 * is dressed, sugarcane is pressed, yam is lifted out of the ground. Storing
 * the verb per product keeps the date stamp truthful — and the distinction is
 * one any market trader would make.
 */
export type HarvestAction =
  | "picked"
  | "cut"
  | "lifted"
  | "landed"
  | "dressed"
  | "smoked"
  | "gathered"
  | "harvested"
  | "pressed"
  | "blended"
  | "brewed"
  | "roasted"
  | "milled"
  | "made"
  | "packed";

/** Categories whose stamp should age visibly. Shea butter at 7 days is fine. */
export const PERISHABLE_CATEGORIES = ["fresh-produce", "butchery", "juices"] as const;

export type ProductCategory =
  | "fresh-produce"
  | "butchery"
  | "juices"
  | "nuts-pantry"
  | "eco-products"
  | "subscription-boxes";

export interface Farmer {
  id: string;
  name: string;
  slug: string;
  location: string;
  region: string;
  photo: string;
  story: string;
  certifications: string[];
  memberSince: string;
  productsCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  unit: ProductUnit;
  minQty: number;
  inventoryQty: number;
  harvestDate: string;
  harvestAction: HarvestAction;
  badges: Badge[];
  category: ProductCategory;
  farmer: Farmer;
  images: string[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  /** Key into the icon registry in components/ui/Icon.tsx. */
  icon: IconName;
  color: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
