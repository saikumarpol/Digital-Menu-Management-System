import { NextResponse } from 'next/server';
import { generateRestaurantQR } from '~/server/qr/generate';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // params may be a Promise-like in this Next.js version — await it
    const { slug } = await params;
    
    // Get the base URL from request headers (works in Vercel and other deployments)
    // Vercel sets these headers automatically
    const protocol = req.headers.get('x-forwarded-proto') ?? 
                     (process.env.NODE_ENV === 'production' ? 'https' : 'http');
    const host = req.headers.get('host') ?? 
                 req.headers.get('x-forwarded-host') ??
                 req.headers.get('x-vercel-deployment-url');
    
    const baseUrl = host ? `${protocol}://${host}` : undefined;
    
    const result = await generateRestaurantQR(slug, baseUrl);
    
    // Ensure we return an absolute URL (QR codes need absolute URLs)
    const absoluteUrl = result.url.startsWith('http') 
      ? result.url 
      : baseUrl 
        ? `${baseUrl}${result.url}` 
        : result.url;
    
    return NextResponse.json({ 
      qr: result.qr, 
      url: absoluteUrl 
    });
  } catch (error) {
    console.error("QR API error:", error);
    return NextResponse.json({ 
      error: "QR generation failed",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
