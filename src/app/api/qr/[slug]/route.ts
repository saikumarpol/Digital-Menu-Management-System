import { NextResponse } from 'next/server';
import { generateRestaurantQR } from '~/server/qr/generate';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // params may be a Promise-like in this Next.js version — await it
    const { slug } = await params;
    const result = await generateRestaurantQR(slug);
    return NextResponse.json({ qr: result.qr, url: result.url });
  } catch {
    return NextResponse.json({ error: "QR generation failed" }, { status: 500 });
  }
}
