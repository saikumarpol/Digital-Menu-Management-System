// src/server/api/trpc/routers/dishes.ts
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const dishesRouter = router({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.dish.findUniqueOrThrow({
        where: { id: input.id },
        include: {
          DishCategory: true,
          restaurant: true,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        restaurantSlug: z.string(),
        name: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        spiceLevel: z.string().optional(),
        price: z.number().optional(),
        categoryId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const restaurant = await ctx.prisma.restaurant.findUniqueOrThrow({
        where: { slug: input.restaurantSlug },
      });

      const dish = await ctx.prisma.dish.create({
        data: {
          name: input.name,
          description: input.description,
          imageUrl: input.imageUrl,
          spiceLevel: input.spiceLevel,
          price: input.price ?? null,
          restaurantId: restaurant.id,
        },
      });

      if (input.categoryId) {
        await ctx.prisma.dishCategory.create({
          data: {
            dishId: dish.id,
            categoryId: input.categoryId,
          },
        });
      }

      return dish;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string().optional().nullable(),
        imageUrl: z.string().optional().nullable(),
        spiceLevel: z.string().optional().nullable(),
        price: z.number().optional().nullable(),
        categoryId: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, categoryId, ...dishData } = input;

      const updatedDish = await ctx.prisma.dish.update({
        where: { id },
        data: {
          name: dishData.name,
          description: dishData.description ?? null,
          imageUrl: dishData.imageUrl ?? null,
          spiceLevel: dishData.spiceLevel ?? null,
          price:
            typeof dishData.price === "number"
              ? dishData.price
              : dishData.price ?? null,
        },
      });

      if (categoryId !== undefined) {
        await ctx.prisma.dishCategory.deleteMany({
          where: { dishId: id },
        });

        if (categoryId) {
          await ctx.prisma.dishCategory.create({
            data: {
              dishId: id,
              categoryId,
            },
          });
        }
      }

      return updatedDish;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // First, find any categories this dish is linked to
      const dishCategories = await ctx.prisma.dishCategory.findMany({
        where: { dishId: input.id },
        select: { categoryId: true },
      });

      const categoryIds = Array.from(
        new Set(dishCategories.map((dc) => dc.categoryId)),
      );

      // Use a transaction so dish deletion and potential category clean-up stay in sync
      return ctx.prisma.$transaction(async (tx) => {
        const deletedDish = await tx.dish.delete({ where: { id: input.id } });

        // For each affected category, if it no longer has any dishes, delete the category
        for (const categoryId of categoryIds) {
          const remainingLinks = await tx.dishCategory.count({
            where: { categoryId },
          });

          if (remainingLinks === 0) {
            await tx.category.delete({ where: { id: categoryId } });
          }
        }

        return deletedDish;
      });
    }),
});
