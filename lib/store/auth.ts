"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "customer" | "vendor";
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  pendingPhone: string;
  setPendingPhone: (phone: string) => void;
  login: (phone: string, name?: string, role?: "customer" | "vendor") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      pendingPhone: "",

      setPendingPhone: (phone) => set({ pendingPhone: phone }),

      login: (phone, name?: string, role: "customer" | "vendor" = "customer") =>
        set({
          user: {
            id: "u_" + phone.replace(/\D/g, "").slice(-9),
            name: name?.trim() || "Ama",
            phone,
            email: undefined,
            role,
          },
          isAuthenticated: true,
          pendingPhone: "",
        }),

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "yendzi-auth",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
