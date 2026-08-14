import { NextRequest, NextResponse } from "next/server";

interface Order {
  id: string;
  items: unknown[];
  total: number;
  address: unknown;
  slot: unknown;
  paymentReference: string | null;
  status: string;
  estimatedDelivery: string;
  createdAt: string;
}

const orders: Order[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Read named fields rather than spreading the body — a spread let the
    // client supply its own `id`, `status` or `createdAt` and overwrite the
    // server-generated ones.
    const order: Order = {
      id: "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      items: Array.isArray(body?.items) ? body.items : [],
      total: Number(body?.total) || 0,
      address: body?.address ?? null,
      slot: body?.slot ?? null,
      paymentReference:
        typeof body?.paymentReference === "string" ? body.paymentReference : null,
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

// Look up a single order by its reference. The previous handler returned every
// order ever placed to any unauthenticated caller.
export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "An order id is required" }, { status: 400 });
  }

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
