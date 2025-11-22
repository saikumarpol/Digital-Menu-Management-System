"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import MenuShare from "~/components/MenuShare";

interface Props {
  id: string;
  name: string;
  location?: string | null;
  slug: string;
}

export default function RestaurantRow({ id, name, location, slug }: Props) {
  const router = useRouter();
  const deleteRestaurant = api.restaurants.delete.useMutation();
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm(`Delete restaurant "${name}"? This will remove all categories and dishes.`)) return;
    try {
      setLoading(true);
      await deleteRestaurant.mutateAsync({ id });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="group flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/95 p-4 shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-xl md:flex-row md:items-center md:p-5">
      <Link
        href={`/admin/restaurants/${slug}`}
        className="flex flex-1 flex-col gap-1"
      >
        <h2 className="text-base font-semibold text-slate-900 md:text-lg">
          {name}
        </h2>
        {location && (
          <p className="text-sm text-slate-500 line-clamp-2">{location}</p>
        )}
        <div className="mt-1 inline-flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
            QR
          </span>
          <span>Tap card to manage menu</span>
        </div>
      </Link>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="hidden text-xs text-slate-500 md:block">
          <p className="font-medium text-slate-700">Public menu link</p>
          <p>Scan or copy to preview</p>
        </div>

        <div className="shrink-0 rounded-2xl bg-slate-50 p-2 shadow-inner shadow-slate-200">
          <MenuShare slug={slug} size={88} />
        </div>

        <button
          onClick={handleDelete}
          disabled={loading || deleteRestaurant.isPending}
          className="h-9 rounded-full border border-rose-100 bg-rose-50 px-3 text-xs font-semibold text-rose-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}
