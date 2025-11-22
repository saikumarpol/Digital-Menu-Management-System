"use client";

import { useState } from "react";

export default function RestaurantForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <form
      className="space-y-4 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, location });
      }}
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button className="px-4 py-2 bg-indigo-600 text-white rounded">
        Save
      </button>
    </form>
  );
}
