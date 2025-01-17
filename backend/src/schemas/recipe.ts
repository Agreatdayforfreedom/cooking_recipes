import { z } from "zod";

const ingredientsObjSchema = z.object({
  name: z.string(),
  quantity: z.number(),
});

const ingredientsSchema = z
  .string() // Start by expecting a string
  .transform((str) => JSON.parse(str)) // Parse the string into a JSON array
  .pipe(z.array(ingredientsObjSchema));

export const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: ingredientsSchema,
});

export const updateRecipeSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ingredients: z.optional(ingredientsSchema),
});
