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
  icon: string;
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
