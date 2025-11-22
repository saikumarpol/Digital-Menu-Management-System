"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function CreateCategoryPage({ params }: any) {
  const router = useRouter();
  const createCategory = api.categories.create.useMutation();

  const [name, setName] = useState("");

  // unwrap params promise (Next.js 15+ requires using React.use to read params)
  const { slug } = (React.use(params ?? {}) as { slug: string });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createCategory.mutateAsync({
      restaurantSlug: slug,
      name,
    });

    router.push(`/admin/restaurants/${slug}`);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="w-full p-2 border rounded"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
          Add Category
        </button>
      </form>
    </main>
  );
}
