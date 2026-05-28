import { NextRequest, NextResponse } from "next/server";

const orders: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = {
      id: "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      ...body,
      status: "confirmed",
      estimatedDelivery: "Today before 6pm",
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ orders, total: orders.length });
}
