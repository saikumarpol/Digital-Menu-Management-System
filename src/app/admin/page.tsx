// src/app/admin/page.tsx
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "~/trpc/react";
import RestaurantRow from "~/components/admin/RestaurantRow";

export default function AdminDashboard() {
  const { data: restaurants, isLoading } = api.restaurants.getAll.useQuery();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="auth-aurora" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              Admin · Overview
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              Your Restaurants
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-200">
              Manage all of your locations, share QR menus, and keep every menu
              in sync from a single dashboard.
            </p>
          </div>

          <div className="flex gap-3 md:items-end">
            <Link
              href="/admin/restaurants/create"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              + Create New Restaurant
            </Link>
          </div>
        </header>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.7)] backdrop-blur-2xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-200">
              Locations
            </h2>
            {restaurants && (
              <p className="text-xs text-slate-300">
                {restaurants.length}{" "}
                {restaurants.length === 1 ? "restaurant" : "restaurants"} online
              </p>
            )}
          </div>

          <div className="mt-5 grid gap-4">
            {isLoading && (
              <p className="text-sm text-slate-300">Loading restaurants…</p>
            )}

            {!isLoading && restaurants?.length === 0 && (
              <p className="text-sm text-slate-300">
                You haven&apos;t added any restaurants yet. Start by creating
                your first location above.
              </p>
            )}

            {restaurants?.map((r: any) => (
              <RestaurantRow
                key={r.id}
                id={r.id}
                name={r.name}
                location={r.location}
                slug={r.slug}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
