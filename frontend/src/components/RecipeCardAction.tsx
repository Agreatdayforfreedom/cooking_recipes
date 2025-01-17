import { RecipeDialog } from "./RecipeDialog";
import { RecipeDeleteDialog } from "./RecipeDeleteDialog";

interface Props {
  recipeId: number;
}

export const RecipeCardAction = ({ recipeId }: Props) => {
  return (
    <div className="flex space-x-2 mx-2 justify-end">
      <RecipeDialog recipeId={recipeId} />
      <RecipeDeleteDialog recipeId={recipeId} />
    </div>
  );
};
