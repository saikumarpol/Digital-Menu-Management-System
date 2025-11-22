"use client";

export default function StickyCategoryHeader({ category }: { category: string }) {
  return (
    <div className="sticky top-0 bg-white p-3 shadow z-20">
      <h2 className="text-xl font-semibold">{category}</h2>
    </div>
  );
}
