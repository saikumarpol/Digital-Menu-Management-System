import { NextResponse } from "next/server";
import { uploadImageFromFile } from "~/server/cloudinary";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const url = await uploadImageFromFile(file, { folder: "digital-menu/dishes" });

    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
