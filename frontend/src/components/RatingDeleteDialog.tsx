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
  ratingId: number;
}

export const RatingDeleteDialog = ({ ratingId }: Props) => {
  async function removeRecipe() {
    try {
      await api.delete(`/rating/delete/${ratingId}`);
      // deleteRecipe(recipe!.id); //todo delete rating
    } catch (error) {
      console.log(error); //todo
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2
          className="stroke-red-600 hover:stroke-red-700 transition-colors"
          size={18}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            <div>Are you sure you want to delete your review?</div>
          </DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-orange-500">Warning: </span>
            You will not be able to recover this review once it is deleted.
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
