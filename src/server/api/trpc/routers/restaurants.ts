// src/server/api/trpc/routers/restaurants.ts
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const restaurantsRouter = router({
  // Public list of restaurants for display on the homepage
  getPublicList: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.restaurant.findMany({
      select: { id: true, name: true, slug: true, location: true },
      orderBy: { createdAt: "desc" },
    });
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.restaurant.findMany({
      where: { ownerId: ctx.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.restaurant.findUniqueOrThrow({
        where: { slug: input.slug },
        include: {
          // include categories and each category's DishCategory entries (with dish)
          categories: {
            include: {
              DishCategory: {
                include: {
                  dish: true,
                },
              },
            },
          },
          // still include standalone dishes if needed for uncategorized items
          dishes: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        location: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slugBase = input.name.toLowerCase().replace(/\s+/g, "-");
      let slug = slugBase;
      let count = 1;

      while (await ctx.prisma.restaurant.findUnique({ where: { slug } })) {
        slug = `${slugBase}-${count++}`;
      }

      return ctx.prisma.restaurant.create({
        data: {
          name: input.name,
          location: input.location,
          slug,
          ownerId: ctx.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({ id: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.restaurant.delete({ where: { id: input.id } });
    }),
});
