import { z } from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ingredientsSchema } from "../schemas/recipe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ingredients2string(
  ingredients: z.infer<typeof ingredientsSchema>
) {
  let string = "";

  for (const ingredient of ingredients) {
    if (ingredient.quantity > 0) {
      string += ingredient.quantity.toString();
      string += " ";
    }
    string += ingredient.name;
    string += ", ";
  }

  return string;
}
export function string2ingredients(ingredients: string) {
  let arr: z.infer<typeof ingredientsSchema> = [];

  ingredients.split(", ").forEach((ingredient) => {
    if (ingredient === "") return;
    let get_qty = ingredient.trim().split(" ")[0];
    let string = !isNaN(get_qty as any)
      ? ingredient.slice(get_qty.length + 1)
      : ingredient; // remove the qty total characters plus 1 space;
    let qty = !isNaN(get_qty as any) ? parseInt(get_qty, 10) : 0;

    arr.push({
      name: string,
      quantity: qty,
    });
  });

  return arr;
}
