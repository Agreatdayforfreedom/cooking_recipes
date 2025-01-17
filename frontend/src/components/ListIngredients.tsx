import { Ingredient } from "@/types";
import { Dot } from "lucide-react";

interface Props {
  ingredients: Ingredient[];
}

export const ListIngredients = ({ ingredients }: Props) => {
  if (!ingredients) return null;
  return ingredients.map((ingredient) => {
    return (
      <div className="flex">
        <span>
          <Dot className="stroke-dish-dash-700" />
        </span>
        <span>
          {ingredient.quantity > 0 ? ingredient.quantity : null}{" "}
          {ingredient.name}
        </span>
      </div>
    );
  });
};
