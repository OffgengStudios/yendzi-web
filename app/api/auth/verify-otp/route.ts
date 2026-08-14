import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp, name } = await req.json();
    if (!phone || otp === undefined || otp === null) {
      return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });
    }

    // Clients may send the code as a JSON number; `.length` on a number is
    // undefined, which silently skipped this check entirely.
    const code = String(otp).trim();

    // Mock: accept any 4-digit code (use 1234 in demo)
    if (!/^\d{4,6}$/.test(code)) {
      return NextResponse.json({ error: "OTP must be 4–6 digits" }, { status: 401 });
    }

    const user = {
      id: "u_" + String(phone).replace(/\D/g, "").slice(-9),
      name: typeof name === "string" && name.trim() ? name.trim() : "Yendzi Customer",
      phone,
    };

    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
