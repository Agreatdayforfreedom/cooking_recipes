import { z } from "zod";

export const ingredientsSchema = z
  .object({
    name: z.string(),
    quantity: z.number(),
  })
  .array();
export const recipeFormSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().min(1),
  ingredients: z.string(), // map later to ingredientsSchema
});
