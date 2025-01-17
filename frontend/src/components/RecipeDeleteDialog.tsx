import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useInMemoryRecipe, useRecipes } from "@/stores/recipes";
import { Button } from "./ui/button";
import { api } from "../lib/api";

interface Props {
  recipeId: number;
}

export const RecipeDeleteDialog = ({ recipeId }: Props) => {
  const recipe = useInMemoryRecipe(recipeId);
  const deleteRecipe = useRecipes((state) => state.deleteRecipe);
  if (!recipe) {
    return null; // todo close modal
  }

  async function removeRecipe() {
    try {
      await api.delete(`/recipe/delete/${recipe!.id}`);
      deleteRecipe(recipe!.id);
    } catch (error) {
      console.log(error); //todo
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-6 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700
            transition-colors"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            <div>
              Are you sure you want to delete{" "}
              <span className="text-dish-dash-950 font-bold capitalize">
                {recipe?.title}
              </span>{" "}
              recipe?
            </div>
          </DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-orange-500">Warning: </span>
            You will not be able to recover this recipe once it is deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          {/*  IMPLEMENT cancel button*/}
          <Button variant={"link"} className="hover:no-underline">
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={removeRecipe}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
