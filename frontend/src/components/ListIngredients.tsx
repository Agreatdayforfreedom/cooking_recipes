import { Ingredient } from "@/types";

interface Props {
  ingredients: Ingredient[];
}

export const ListIngredients = ({ ingredients }: Props) => {
  if (!ingredients) return null;
  return ingredients.map((ingredient) => {
    return (
      <span>
        {ingredient.quantity > 0 ? ingredient.quantity : null} {ingredient.name}
      </span>
    );
  });
};
