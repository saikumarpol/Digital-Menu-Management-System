// src/app/api/qr/route.ts
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { url: string };
    const { url } = body;

    const qr = await QRCode.toDataURL(url);

    return NextResponse.json({ qr });
  } catch {
    return NextResponse.json(
      { message: "QR generation failed" },
      { status: 500 }
    );
  }
}
