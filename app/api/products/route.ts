import { NextRequest, NextResponse } from "next/server";
import { products } from "../../../lib/mock-data/products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  let result = [...products];
  if (category && category !== "all") result = result.filter((p) => p.category === category);
  if (q) result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q));

  return NextResponse.json({ products: result, total: result.length });
}
