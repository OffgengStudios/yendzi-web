import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "Phone number required" }, { status: 400 });

    // In production: send via Africa's Talking / Hubtel
    // Mock: fixed OTP for demo
    console.log(`[MOCK SMS] OTP for ${phone}: 1234`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
