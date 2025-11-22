import { z } from "zod";

export const createDishSchema = z.object({
  name: z.string().min(1, "Dish name is required"),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  spiceLevel: z.string().optional(),
  restaurantSlug: z.string().min(1),
  categoryIds: z.array(z.string()).optional(), // For multi-category support
});
