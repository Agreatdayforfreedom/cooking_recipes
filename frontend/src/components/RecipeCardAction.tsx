import { Pen, Trash2 } from "lucide-react";
import { RecipeDialog } from "./RecipeDialog";
import { RecipeDeleteDialog } from "./RecipeDeleteDialog";

interface Props {
  recipeId: number;
}

export const RecipeCardAction = ({ recipeId }: Props) => {
  return (
    <div className="flex space-x-2">
      <RecipeDialog recipeId={recipeId} />
      <RecipeDeleteDialog recipeId={recipeId} />
    </div>
  );
};
