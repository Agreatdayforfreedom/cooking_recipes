import { z } from "zod";

export const ingredientsSchema = z
  .object({
    name: z.string(),
    quantity: z.number(),
  })
  .array();
export const recipeFormSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().min(1).max(1024),
  ingredients: z.string(), // map later to ingredientsSchema
  image: z.string().optional(),
});

export const updateRecipeSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ingredients: z.optional(ingredientsSchema),
  image: z.string().optional(),
});
