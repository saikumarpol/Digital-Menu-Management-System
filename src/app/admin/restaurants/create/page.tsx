// src/app/admin/restaurants/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function CreateRestaurantPage() {
  const router = useRouter();
  const createRestaurant = api.restaurants.create.useMutation();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createRestaurant.mutateAsync({ name, location });
    router.push("/admin");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="auth-aurora" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
            New Location
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            Create a restaurant
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-200">
            Add a name and location. You can manage categories, dishes, and QR
            menus after this step.
          </p>
        </header>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.7)] backdrop-blur-2xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-200">
                Restaurant name
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
                placeholder="Hima Bindu Fast Food Center"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-200">
                Location
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
                placeholder="Chandanagar, Hyderabad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <button className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:scale-[1.01] hover:shadow-2xl focus:outline-none">
              Create restaurant
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
