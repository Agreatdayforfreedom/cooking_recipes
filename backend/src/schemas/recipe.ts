import { z } from "zod";

const ingredientsSchema = z.object({
  name: z.string(),
  quantity: z.number(),
});

export const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: ingredientsSchema,
  image: z.string().optional(),
});

export const updateRecipeSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ingredients: z.optional(ingredientsSchema),
  image: z.string().optional(),
});
