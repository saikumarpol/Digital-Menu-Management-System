// src/server/qr/generate.ts
import QRCode from "qrcode";
import { env } from "~/env";

/**
 * Generates a QR code for the restaurant's public menu URL.
 * 
 * @param slug The restaurant slug (e.g., "pista-restaurant")
 * @returns base64 PNG QR Code
 */

export async function generateRestaurantQR(slug: string) {
  try {
    // Public menu link (the page at /menu/[slug])
    const menuUrl = `${env.NEXT_PUBLIC_API_BASE_URL}/menu/${slug}`;

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
