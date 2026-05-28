import { NextResponse } from "next/server";
import { products } from "../../../../lib/mock-data/products";

export async function GET() {
  return NextResponse.json({
    earnings: {
      today: 840,
      thisWeek: 3250,
      thisMonth: 12400,
    },
    orders: {
      pending: 4,
      fulfilled: 28,
      total: 32,
    },
    topProducts: products.slice(0, 3).map((p) => ({
      id: p.id,
      name: p.name,
      unitsSold: Math.floor(Math.random() * 40 + 10),
      revenue: p.price * Math.floor(Math.random() * 20 + 5),
    })),
    recentOrders: [
      { id: "ORD-A1B2C3", customer: "Ama K.", items: 3, total: 145, status: "pending",   time: "10 min ago" },
      { id: "ORD-D4E5F6", customer: "Kofi M.", items: 1, total: 85,  status: "fulfilled", time: "1 hr ago"   },
      { id: "ORD-G7H8I9", customer: "Abena T.", items: 5, total: 320, status: "fulfilled", time: "3 hr ago"   },
      { id: "ORD-J0K1L2", customer: "Yaw S.",  items: 2, total: 210, status: "pending",   time: "5 hr ago"   },
    ],
  });
}
