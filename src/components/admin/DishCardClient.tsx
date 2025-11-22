"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  description?: string | null;
  spiceLevel?: string | null;
  categoryName?: string | null;
}

export default function DishCardClient({ id, name, imageUrl, description, spiceLevel, categoryName }: Props) {
  const router = useRouter();
  const deleteDish = api.dishes.delete.useMutation();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete dish "${name}"?`)) return;
    try {
      setLoading(true);
      await deleteDish.mutateAsync({ id });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  function handleEdit() {
    // Navigate to a dedicated edit page for this dish
    router.push(`/admin/dishes/${id}/edit`);
  }

  return (
    <article className="group flex gap-4 rounded-[24px] border border-slate-200/80 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-3 text-white shadow-sm shadow-slate-900/40 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-xl">
      {imageUrl ? (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110"
          />
        </div>
      ) : (
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-dashed border-slate-500/50 bg-slate-900/60 text-xs text-slate-400">
          No image
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1.5">
        {categoryName && (
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {categoryName}
          </div>
        )}

        <h3 className="text-sm font-semibold tracking-tight md:text-base">
          {name}
        </h3>

        {description && (
          <p className="text-xs text-slate-300 md:text-sm">{description}</p>
        )}

        {spiceLevel && (
          <div className="mt-1 inline-flex items-center gap-2 text-[11px] font-medium text-slate-200">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] text-rose-100">
              <span>🌶</span>
              <span className="uppercase tracking-[0.16em]">{spiceLevel}</span>
            </span>
            <span className="h-1 w-10 rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center justify-center rounded-full border border-emerald-300/70 bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold text-emerald-100 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-500/30 hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-200/70 bg-rose-500/10 text-xs text-rose-200 shadow-sm transition hover:border-rose-300 hover:bg-rose-500/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={loading ? "Deleting dish…" : "Delete dish"}
        >
          {loading ? "…" : "🗑"}
        </button>
      </div>
    </article>
  );
}
