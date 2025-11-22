// src/server/qr/generate.ts
import QRCode from "qrcode";
import { env } from "~/env";

/**
 * Generates a QR code for the restaurant's public menu URL.
 * 
 * @param slug The restaurant slug (e.g., "pista-restaurant")
 * @param baseUrl Optional base URL. If not provided, tries to use env variable or defaults to relative path
 * @returns base64 PNG QR Code
 */

export async function generateRestaurantQR(slug: string, baseUrl?: string) {
  try {
    // Determine the base URL:
    // 1. Use provided baseUrl (from request headers)
    // 2. Fall back to NEXT_PUBLIC_API_BASE_URL env variable
    // 3. Fall back to VERCEL_URL (automatically set by Vercel)
    // 4. Fall back to relative path (works for client-side)
    let base = baseUrl;
    
    base ??= env.NEXT_PUBLIC_API_BASE_URL ?? 
             (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
    
    // Ensure base URL doesn't end with a slash
    const cleanBase = base?.replace(/\/$/, "");
    const menuUrl = cleanBase ? `${cleanBase}/menu/${slug}` : `/menu/${slug}`;

    // Generate QR code as base64 PNG
    const qrBase64 = await QRCode.toDataURL(menuUrl, {
      width: 500,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    return {
      url: menuUrl,
      qr: qrBase64,
    };
  } catch (error) {
    console.error("QR generation failed:", error);
    throw new Error("Failed to generate QR code");
  }
}
