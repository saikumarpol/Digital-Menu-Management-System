"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import DishImageUploader from "~/components/forms/DishImageUploader";

export default function CreateDishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = React.use(params);

  const createDish = api.dishes.create.useMutation();
  const { data: restaurantData } = api.restaurants.getBySlug.useQuery({ slug });

  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [spiceLevel, setSpiceLevel] = useState("");
  const [price, setPrice] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createDish.mutateAsync({
      restaurantSlug: slug,
      name,
      description,
      imageUrl,
      spiceLevel,
      price: price ? parseFloat(price) : undefined,
      categoryId,
    });

    router.push(`/admin/restaurants/${slug}`);
  }

  return (
    <main
      className="min-h-screen w-full 
      bg-gradient-to-br from-[#0b1e2d] via-[#0a1b26] to-[#111b48]
      flex justify-center py-16 px-4"
    >
      <div
        className="
        w-full max-w-4xl 
        backdrop-blur-xl bg-white/5 
        border border-white/10 
        rounded-3xl p-10 shadow-xl"
      >
        <h1 className="text-3xl font-semibold mb-10 text-white tracking-wide">
          Add Dish
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Dish Name + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-300 text-sm tracking-wide">Dish Name</label>
              <input
                className="w-full mt-2 p-3 rounded-xl 
                bg-white/10 border border-white/20 text-white 
                placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter dish name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm tracking-wide">Category</label>

              <select
                className="w-full mt-2 p-3 rounded-xl 
                bg-[#1b2735]/80 border border-white/20 text-white 
                placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(e.target.value || undefined)}
              >
                <option value="">-- Select category --</option>
                {restaurantData?.categories?.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm tracking-wide">Description</label>
            <textarea
              className="w-full mt-2 p-4 rounded-xl h-32 resize-none
              bg-white/10 border border-white/20 text-white 
              placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Price + Spice Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-300 text-sm tracking-wide">Price</label>
              <input
                className="w-full mt-2 p-3 rounded-xl 
                bg-white/10 border border-white/20 text-white 
                placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 199.50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm tracking-wide">Spice Level</label>
              <input
                className="w-full mt-2 p-3 rounded-xl 
                bg-white/10 border border-white/20 text-white 
                placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. High"
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(e.target.value)}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="text-gray-300 text-sm tracking-wide">Cover Image</label>

            <div className="p-4 mt-2 rounded-xl bg-white/10 border border-white/20">
              <DishImageUploader
                onUpload={(url) => setImageUrl(url)}
                initialUrl={imageUrl}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              className="px-6 py-3 bg-green-500 hover:bg-green-600 
              text-white font-semibold rounded-xl"
            >
              Add Dish
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 
              text-white rounded-xl border border-white/20"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
