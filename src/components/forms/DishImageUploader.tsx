"use client";
import { useState } from "react";

type Props = {
  onUpload: (url: string) => void;
  initialUrl?: string;
};

export default function DishImageUploader({ onUpload, initialUrl }: Props) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = (await res.json()) as { url: string };
      onUpload(data.url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="block mb-2">Dish Image</label>
      <div className="flex items-center gap-4">
        <input type="file" accept="image/*" onChange={handleFile} />
        {loading && <span>Uploading...</span>}
      </div>
      {preview && (
        <div className="mt-3">
          <img src={preview} alt="preview" className="w-48 h-32 object-cover rounded" />
        </div>
      )}
    </div>
  );
}
