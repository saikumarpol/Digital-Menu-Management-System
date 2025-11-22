"use client";

import { useState } from "react";

export default function DishForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [spiceLevel, setSpiceLevel] = useState("");
  const [price, setPrice] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, imageUrl, description, spiceLevel, price: price ? parseFloat(price) : undefined });
      }}
      className="space-y-4 max-w-md"
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Dish Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Spice Level (optional)"
        value={spiceLevel}
        onChange={(e) => setSpiceLevel(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Price (e.g. 99.99)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Save Dish
      </button>
    </form>
  );
}
