"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VendorProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  description: string;
  harvestDate: string;
  image: string;
  status: "live" | "draft";
  createdAt: string;
}

export interface VendorOrder {
  id: string;
  customer: string;
  product: string;
  qty: number;
  total: number;
  status: "pending" | "packed" | "delivered";
  date: string;
}

interface VendorStore {
  isVendor: boolean;
  isApproved: boolean;
  businessName: string;
  products: VendorProduct[];
  orders: VendorOrder[];
  totalEarnings: number;
  applyAsVendor: (businessName: string) => void;
  addProduct: (p: Omit<VendorProduct, "id" | "createdAt">) => void;
  removeProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: VendorOrder["status"]) => void;
}

const MOCK_ORDERS: VendorOrder[] = [
  { id: "ord-001", customer: "Ama Owusu", product: "Organic Tomatoes", qty: 3, total: 36, status: "pending", date: "2026-05-27" },
  { id: "ord-002", customer: "Kofi Boateng", product: "Garden Eggs", qty: 2, total: 16, status: "packed", date: "2026-05-26" },
  { id: "ord-003", customer: "Akosua Mensah", product: "Organic Tomatoes", qty: 5, total: 60, status: "delivered", date: "2026-05-25" },
  { id: "ord-004", customer: "Yaw Asante", product: "Kontomire Leaves", qty: 4, total: 32, status: "pending", date: "2026-05-27" },
];

const MOCK_PRODUCTS: VendorProduct[] = [
  {
    id: "vp-001",
    name: "Organic Tomatoes",
    category: "fresh-produce",
    price: 12,
    unit: "kg",
    stock: 45,
    description: "Vine-ripened tomatoes grown without pesticides on rich Aburi soil.",
    harvestDate: "2026-05-27",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500",
    status: "live",
    createdAt: "2026-05-01",
  },
  {
    id: "vp-002",
    name: "Kontomire Leaves",
    category: "fresh-produce",
    price: 8,
    unit: "bunch",
    stock: 30,
    description: "Fresh, dark green kontomire (cocoyam leaves). Harvested daily.",
    harvestDate: "2026-05-27",
    image: "https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=500",
    status: "live",
    createdAt: "2026-05-01",
  },
  {
    id: "vp-003",
    name: "Garden Eggs",
    category: "fresh-produce",
    price: 8,
    unit: "kg",
    stock: 20,
    description: "Firm, fresh garden eggs perfect for palava sauce and garden egg stew.",
    harvestDate: "2026-05-26",
    image: "https://images.pexels.com/photos/6576755/pexels-photo-6576755.jpeg?auto=compress&cs=tinysrgb&w=500",
    status: "draft",
    createdAt: "2026-05-10",
  },
];

export const useVendorStore = create<VendorStore>()(
  persist(
    (set, get) => ({
      isVendor: false,
      isApproved: false,
      businessName: "",
      products: MOCK_PRODUCTS,
      orders: MOCK_ORDERS,
      totalEarnings: 2840,

      applyAsVendor: (businessName) =>
        set({ isVendor: true, isApproved: true, businessName }),

      addProduct: (p) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...p,
              id: "vp-" + Math.random().toString(36).slice(2),
              createdAt: new Date().toISOString().split("T")[0],
            },
          ],
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
    }),
    {
      name: "yendzi-vendor",
      partialize: (state) => ({
        isVendor: state.isVendor,
        isApproved: state.isApproved,
        businessName: state.businessName,
        products: state.products,
        orders: state.orders,
        totalEarnings: state.totalEarnings,
      }),
    }
  )
);
