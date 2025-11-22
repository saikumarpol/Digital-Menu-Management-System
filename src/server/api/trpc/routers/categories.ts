// src/server/api/trpc/routers/categories.ts
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const categoriesRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        restaurantSlug: z.string(),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const restaurant = await ctx.prisma.restaurant.findUniqueOrThrow({
        where: { slug: input.restaurantSlug },
      });

      return ctx.prisma.category.create({
        data: {
          name: input.name,
          restaurantId: restaurant.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.delete({ where: { id: input.id } });
    }),
});
