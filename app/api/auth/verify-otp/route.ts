import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp, name } = await req.json();
    if (!phone || !otp) return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });

    // Mock: accept any 4-digit code (use 1234 in demo)
    if (otp.length < 4) return NextResponse.json({ error: "OTP must be at least 4 digits" }, { status: 401 });

    const user = {
      id: "u_" + phone.replace(/\D/g, "").slice(-9),
      name: name?.trim() || "Yendzi Customer",
      phone,
    };

    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
