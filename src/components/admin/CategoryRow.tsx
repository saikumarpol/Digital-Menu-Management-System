"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface Props {
  id: string;
  name: string;
}

export default function CategoryRow({ id, name }: Props) {
  const router = useRouter();
  const updateCategory = api.categories.update.useMutation();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  async function handleSave() {
    if (!newName.trim() || newName.trim() === name) {
      setEditing(false);
      setNewName(name);
      return;
    }

    try {
      setLoading(true);
      await updateCategory.mutateAsync({ id, name: newName.trim() });
      setEditing(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-2.5 text-slate-900 shadow-sm shadow-slate-200">
      {editing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setNewName(name);
            }}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex w-full items-center justify-between rounded-full bg-transparent px-0 py-0 text-left"
        >
          <span className="text-sm font-semibold tracking-tight md:text-base">
            {name}
          </span>
          <span className="rounded-full border border-indigo-200 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-200 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-500/20 hover:text-white">
            Edit
          </span>
        </button>
      )}
    </div>
  );
}
