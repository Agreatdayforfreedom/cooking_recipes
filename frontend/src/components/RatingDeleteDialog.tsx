import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { api } from "../lib/api";
import { AxiosError } from "axios";
import { useState } from "react";

interface Props {
  ratingId: number;
}

export const RatingDeleteDialog = ({ ratingId }: Props) => {
  const [error, setError] = useState("");
  const [isPending, setPending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function removeRecipe() {
    try {
      setError("");
      setPending(true);
      await api.delete(`/rating/delete/${ratingId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError("Something went wrong! Try again.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog onOpenChange={setModalOpen} open={modalOpen}>
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
        <div className="flex items-center justify-between">
          <span className="text-red-800">{error && error}</span>

          <div className="flex justify-end">
            <Button
              onClick={() => setModalOpen(false)}
              variant={"link"}
              className="hover:no-underline"
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={removeRecipe}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
