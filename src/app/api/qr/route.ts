// src/app/api/qr/route.ts
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const qr = await QRCode.toDataURL(url);

    return NextResponse.json({ qr });
  } catch (error) {
    return NextResponse.json(
      { message: "QR generation failed" },
      { status: 500 }
    );
  }
}
