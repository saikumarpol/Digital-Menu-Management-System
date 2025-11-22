import DishEditClient from "./DishEditClient";
import { appRouter } from "~/server/api/trpc/routers/root";
import { createTRPCContext } from "~/server/api/trpc/context";

export default async function DishEditPage({ params }: any) {
  const { id } = (await params) as { id: string };

  const caller = appRouter.createCaller(await createTRPCContext());
  const dish = await caller.dishes.getById({ id });

  const restaurant = await caller.restaurants.getBySlug({
    slug: dish.restaurant.slug,
  });

  const categories =
    restaurant.categories?.map((category) => ({
      id: category.id,
      name: category.name,
    })) ?? [];

  const currentCategoryId =
    dish.DishCategory && dish.DishCategory.length > 0
      ? dish.DishCategory[0]?.categoryId ?? null
      : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="auth-aurora" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
            Dish · Edit
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            Update “{dish.name}”
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-200">
            Adjust information, imagery, prices, and spice level. Changes sync
            instantly to every menu surface.
          </p>
        </header>

        <DishEditClient
          dish={{
            id: dish.id,
            name: dish.name,
            description: dish.description,
            imageUrl: dish.imageUrl,
            spiceLevel: dish.spiceLevel,
            price: dish.price,
            restaurantSlug: dish.restaurant.slug,
            categoryId: currentCategoryId,
          }}
          categories={categories}
        />
      </div>
    </main>
  );
}

