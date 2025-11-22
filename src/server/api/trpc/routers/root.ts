// src/server/api/trpc/routers/root.ts
import { router } from "../trpc";

import { authRouter } from "./auth";
import { restaurantsRouter } from "./restaurants";
import { categoriesRouter } from "./categories";
import { dishesRouter } from "./dishes";
import { publicMenuRouter } from "./public-menu";

export const appRouter = router({
  auth: authRouter,
  restaurants: restaurantsRouter,
  categories: categoriesRouter,
  dishes: dishesRouter,
  publicMenu: publicMenuRouter,
});

// Export type for frontend usage
export type AppRouter = typeof appRouter;
