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
import { useState } from "react";

interface Props {
  recipeId?: number;
}

export const RecipeDialog = ({ recipeId }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const recipe = useInMemoryRecipe(recipeId);
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        {recipe ? (
          <Button
            className="h-6 rounded-full text-xs font-bold bg-orange-600 hover:bg-orange-700
            transition-colors"
          >
            Edit
          </Button>
        ) : (
          <Button className=" mx-4 w-full sm:w-auto bg-dish-dash-950 hover:bg-dish-dash-900 transition-colors">
            Create recipe
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-fit">
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
        <RecipeForm recipe={recipe!} setOpenModal={setOpenModal} />
      </DialogContent>
    </Dialog>
  );
};
