"use client";

import React, { useMemo, useState } from "react";

type Dish = {
  id: string;
  name: string;
  imageUrl?: string | null;
  description?: string | null;
  spiceLevel?: string | null;
  price?: number | null;
  categories: string[];
};

type Category = { id: string; name: string };

export default function PublicMenuClient({
  menu,
}: {
  menu: {
    restaurant: { id: string; name: string; slug: string; location: string | null };
    categories: Category[];
    dishes: Dish[];
  };
}) {
  const { restaurant, categories, dishes } = menu;

  const [activeCategory, setActiveCategory] = useState<string>(
    "recommended"
  );
  const [showModal, setShowModal] = useState(false);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of categories) map[c.id] = 0;
    for (const d of dishes) {
      if (Array.isArray(d.categories) && d.categories.length > 0) {
        d.categories.forEach((cid) => (map[cid] = (map[cid] ?? 0) + 1));
      }
    }
    return map;
  }, [categories, dishes]);

  const filtered = useMemo(() => {
    if (activeCategory === "recommended") return dishes;
    return dishes.filter((d) => d.categories.includes(activeCategory));
  }, [dishes, activeCategory]);

  return (
    <div className="min-h-screen">
      <header className="py-4 px-4 border-b sticky top-0 bg-white z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          {restaurant.location && (
            <p className="text-sm text-gray-500">{restaurant.location}</p>
          )}
        </div>
      </header>

      <nav className="overflow-x-auto py-3 border-b bg-white">
        <div className="max-w-3xl mx-auto flex gap-3 px-4">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === "recommended"
                ? "bg-pink-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setActiveCategory("recommended")}
          >
            Recommended
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === c.id ? "bg-pink-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        {filtered.map((dish) => (
          <article
            key={dish.id}
            className="bg-white rounded shadow p-4 flex gap-4 items-start"
          >
            <div className="flex-1">
              <h3 className="font-semibold flex items-center gap-2">
                {dish.name}
                {dish.price != null && (
                  <span className="text-sm text-gray-600">₹ {dish.price}</span>
                )}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {dish.description}
              </p>
              {dish.spiceLevel && (
                <p className="text-sm mt-2">🌶 {dish.spiceLevel}</p>
              )}
            </div>

            {dish.imageUrl && (
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="w-24 h-24 rounded object-cover"
              />
            )}
          </article>
        ))}
      </main>

      <div className="fixed inset-x-0 bottom-6 flex justify-center pointer-events-none">
        <button
          className="pointer-events-auto px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg"
          onClick={() => setShowModal(true)}
        >
          ☰ Menu
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center">
          <div className="bg-white rounded-lg w-80 max-h-[80vh] overflow-auto p-6">
            <h2 className="text-center font-semibold text-pink-600 mb-4">Categories</h2>
            <ul className="space-y-3">
              <li>
                <button
                  className="w-full text-left flex justify-between"
                  onClick={() => {
                    setActiveCategory("recommended");
                    setShowModal(false);
                  }}
                >
                  <span>Recommended</span>
                  <span>{dishes.length}</span>
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    className="w-full text-left flex justify-between"
                    onClick={() => {
                      setActiveCategory(c.id);
                      setShowModal(false);
                    }}
                  >
                    <span>{c.name}</span>
                    <span>{counts[c.id] ?? 0}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-center">
              <button
                className="px-4 py-2 bg-gray-100 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
