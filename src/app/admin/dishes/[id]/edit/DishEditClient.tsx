"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DishImageUploader from "~/components/forms/DishImageUploader";
import { api } from "~/trpc/react";

interface DishEditClientProps {
  dish: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    spiceLevel?: string | null;
    price?: number | null;
    restaurantSlug: string;
    categoryId?: string | null;
  };
  categories: { id: string; name: string }[];
}

export default function DishEditClient({ dish, categories }: DishEditClientProps) {
  const router = useRouter();
  const updateDish = api.dishes.update.useMutation();

  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description ?? "");
  const [imageUrl, setImageUrl] = useState(dish.imageUrl ?? "");
  const [spiceLevel, setSpiceLevel] = useState(dish.spiceLevel ?? "");
  const [price, setPrice] = useState(
    typeof dish.price === "number" ? dish.price.toString() : "",
  );
  const [categoryId, setCategoryId] = useState<string | undefined>(
    dish.categoryId ?? undefined,
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await updateDish.mutateAsync({
        id: dish.id,
        name,
        description: description || null,
        imageUrl: imageUrl || null,
        spiceLevel: spiceLevel || null,
        price: price ? parseFloat(price) : null,
        categoryId: categoryId ?? null,
      });

      router.push(`/admin/restaurants/${dish.restaurantSlug}`);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to update dish. Please try again.");
      setSaving(false);
    }
  }

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.7)] backdrop-blur-2xl sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5 text-slate-50">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Dish name
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Category
            </label>
            <select
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
              value={categoryId ?? ""}
              onChange={(e) =>
                setCategoryId(e.target.value ? e.target.value : undefined)
              }
            >
              <option value="">Uncategorized</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="text-slate-900">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
            Description
          </label>
          <textarea
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Price
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 199.50"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Spice level
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
              value={spiceLevel}
              onChange={(e) => setSpiceLevel(e.target.value)}
              placeholder="Mild, Medium, High..."
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
            Cover image
          </label>
          <DishImageUploader onUpload={(url) => setImageUrl(url)} initialUrl={imageUrl} />
        </div>

        {error && (
          <p className="rounded-2xl border border-rose-300/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

