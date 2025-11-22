// src/server/api/trpc/routers/public-menu.ts
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const publicMenuRouter = router({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const restaurant = await ctx.prisma.restaurant.findUniqueOrThrow({
        where: { slug: input.slug },
        include: {
          categories: {
            orderBy: { position: "asc" },
          },
          dishes: {
            include: {
              DishCategory: true, // dish belongs to many categories
            },
          },
        },
      });

      // ---- TRANSFORM DISHES ----
      // Convert Prisma's DishCategory relation → categoryId[] array
      const dishes = restaurant.dishes.map((d) => ({
        id: d.id,
        name: d.name,
        imageUrl: d.imageUrl,
        description: d.description,
        spiceLevel: d.spiceLevel,
        price: d.price,
        categories: Array.isArray(d.DishCategory)
          ? d.DishCategory.map((dc) => dc.categoryId)
          : [],
      }));

      // ---- FORMAT RESPONSE ----
      return {
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          slug: restaurant.slug,
          location: restaurant.location,
        },

        categories: restaurant.categories,

        dishes,
      };
    }),
});
