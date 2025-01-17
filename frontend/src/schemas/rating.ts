import { z } from "zod";

export const ratingFormSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  review: z.string().optional(),
});
