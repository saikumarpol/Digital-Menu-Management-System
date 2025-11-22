import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function uploadImageFromFile(file: Blob | File, options?: { folder?: string }) {
  if (!file) throw new Error("No file provided");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const mime = file.type ?? "application/octet-stream";
  const dataUri = `data:${mime};base64,${base64}`;

  const res = await cloudinary.uploader.upload(dataUri, {
    folder: options?.folder ?? "digital-menu/dishes",
    resource_type: "image",
  });

  return res.secure_url;
}
