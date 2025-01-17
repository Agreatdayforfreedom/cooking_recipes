import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { RecipeForm } from "./RecipeForm";
import { useInMemoryRecipe } from "@/stores/recipes";
import { Button } from "./ui/button";

interface Props {
  recipeId?: number;
}

export const RecipeDialog = ({ recipeId }: Props) => {
  const recipe = useInMemoryRecipe(recipeId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {recipe ? (
          <Pen
            className="stroke-orange-600 hover:stroke-orange-700 transition-colors"
            size={18}
          />
        ) : (
          <Button className=" mx-4 w-full sm:w-auto bg-dish-dash-950 hover:bg-dish-dash-900 transition-colors">
            Create recipe
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {recipe ? (
              <div>
                Edit{" "}
                <span className="text-dish-dash-950 font-bold capitalize">
                  {recipe?.title}
                </span>{" "}
                recipe
              </div>
            ) : (
              <div>Create a new recipe</div>
            )}
          </DialogTitle>
        </DialogHeader>
        {/* todo close modal if there is no recipe */}
        <RecipeForm recipe={recipe!} />
      </DialogContent>
    </Dialog>
  );
};
