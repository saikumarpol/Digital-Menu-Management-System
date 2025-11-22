"use client";

import { useState } from "react";

export default function CategoryForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name });
      }}
      className="space-y-4 max-w-md"
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="px-4 py-2 bg-indigo-600 text-white rounded">
        Save
      </button>
    </form>
  );
}
