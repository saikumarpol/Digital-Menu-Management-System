// src/app/admin/restaurants/[slug]/page.tsx
import Link from "next/link";
import { appRouter } from "~/server/api/trpc/routers/root";
import { createTRPCContext } from "~/server/api/trpc/context";
import CategoryRow from "~/components/admin/CategoryRow";
import DishCardClient from "~/components/admin/DishCardClient";
import MenuShare from "~/components/MenuShare";

type RestaurantWithRelations = Awaited<
  ReturnType<ReturnType<typeof appRouter.createCaller>["restaurants"]["getBySlug"]>
>;

export default async function RestaurantManagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // params is a Promise-like object in this Next.js version — await it before use
  const { slug } = await params;

  const caller = appRouter.createCaller(await createTRPCContext());
  const restaurant: RestaurantWithRelations = await caller.restaurants.getBySlug({ slug });

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="auth-aurora" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        {/* Hero section with QR */}
        <section className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.7)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              Restaurant · Dashboard
            </p>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              {restaurant.name}
            </h1>
            {restaurant.location && (
              <p className="text-sm text-slate-200">{restaurant.location}</p>
            )}
            <p className="text-sm text-slate-200/90">
              Manage categories, dishes, and public QR menus for this location.
              Changes are synced instantly to guests.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/admin/restaurants/${slug}/categories/create`}
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                + Add Category
              </Link>

              <Link
                href={`/admin/restaurants/${slug}/dishes/create`}
                className="inline-flex items-center justify-center rounded-full bg-indigo-400 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-300"
              >
                + Add Dish
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-[26px] border border-white/15 bg-slate-950/40 p-4 shadow-inner shadow-black/40">
            <div className="rounded-2xl bg-white p-2 shadow-lg shadow-slate-900/60">
              <MenuShare slug={slug} size={120} />
            </div>
            <p className="text-xs text-slate-200">
              Scan to preview live digital menu.
            </p>
          </div>
        </section>

        {/* Categories & dishes */}
        <section className="space-y-5 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.65)] backdrop-blur-2xl md:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">
              Categories & Dishes
            </h2>
            <p className="text-xs text-slate-300">
              {restaurant.categories.length}{" "}
              {restaurant.categories.length === 1 ? "category" : "categories"}
            </p>
          </div>

          {restaurant.categories.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              No categories yet. Start by creating your first category to
              organize dishes.
            </p>
          )}

          <div className="space-y-6">
            {restaurant.categories.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-inner shadow-black/30"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <CategoryRow id={c.id} name={c.name} />
                </div>

                {/* list dishes under this category */}
                <ul className="space-y-3">
                  {c.DishCategory && c.DishCategory.length > 0 ? (
                    c.DishCategory.map((dc) => (
                      <li key={dc.id}>
                        <DishCardClient
                          id={dc.dish.id}
                          name={dc.dish.name}
                          imageUrl={dc.dish.imageUrl}
                          description={dc.dish.description}
                          spiceLevel={dc.dish.spiceLevel}
                          categoryName={c.name}
                        />
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-slate-400">
                      No dishes in this category yet.
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Uncategorized dishes */}
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.65)] backdrop-blur-2xl md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">
            Uncategorized dishes
          </h2>
          <p className="mt-2 text-xs text-slate-300">
            Dishes not assigned to any category appear here. Add them into
            categories for a cleaner guest experience.
          </p>

          <ul className="mt-4 space-y-3">
            {restaurant.dishes
              .filter((d) => {
                const inCategory = restaurant.categories.some((c) =>
                  (c.DishCategory ?? []).some((dc) => dc.dishId === d.id),
                );
                return !inCategory;
              })
              .map((d) => (
                <li key={d.id}>
                  <DishCardClient
                    id={d.id}
                    name={d.name}
                    imageUrl={d.imageUrl}
                    description={d.description}
                    spiceLevel={d.spiceLevel}
                  />
                </li>
              ))}

            {restaurant.dishes.filter((d) => {
              const inCategory = restaurant.categories.some((c) =>
                (c.DishCategory ?? []).some((dc) => dc.dishId === d.id),
              );
              return !inCategory;
            }).length === 0 && (
              <li className="text-sm text-slate-400">
                All dishes are assigned to categories.
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
