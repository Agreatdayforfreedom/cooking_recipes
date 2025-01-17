import { useEffect, useState } from "react";
import { z } from "zod";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { ratingFormSchema } from "@/schemas/rating";
import { api } from "@/lib/api";
import { Rating } from "@/types";
import { Rating as RatingStars } from "@smastrom/react-rating";
import { Textarea } from "./ui/textarea";
import { AxiosError } from "axios";
import { useRecipes } from "../stores/recipes";
import { useAuth } from "../stores/auth";
import { ErrorMessage } from "./ErrorMessage";

interface Props {
  ratingToEdit?: Rating;
  clearRatingToEdit: () => void;
}

export const RatingForm = ({ ratingToEdit, clearRatingToEdit }: Props) => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  const addRatingToRecipe = useRecipes((state) => state.addRatingToRecipe);
  const editRecipeRating = useRecipes((state) => state.editRecipeRating);
  const user = useAuth((state) => state.user);

  const form = useForm<z.infer<typeof ratingFormSchema>>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      rating: 1,
      review: "",
    },
  });

  useEffect(() => {
    if (ratingToEdit) {
      form.setValue("rating", ratingToEdit.rating);
      form.setValue("review", ratingToEdit.review);
    }
  }, [ratingToEdit]);

  const onSubmit = async (values: z.infer<typeof ratingFormSchema>) => {
    setPending(true);
    setError("");
    try {
      const url = ratingToEdit
        ? `/rating/update/${ratingToEdit.id}`
        : `/rating/add`;
      const method = ratingToEdit ? "patch" : "post";
      const response = await api[method](url, {
        ...values,
        recipeId: ratingToEdit ? null : parseInt(id!, 10),
      });

      if (user) {
        if (!ratingToEdit) {
          addRatingToRecipe({ ...response.data.rating, user: { ...user } });
        } else {
          editRecipeRating(response.data.rating);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      } else {
        setError("Something went wrong! Try again.");
      }
    } finally {
      setPending(false);
      form.reset();
    }
  };

  const onCancel = () => {
    form.reset();
    clearRatingToEdit();
    setError("");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold">
                Your Rating
              </FormLabel>
              <FormControl>
                <RatingStars {...field} style={{ maxWidth: 180 }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Review <span className="italic">(Optional)</span>
              </FormLabel>
              <FormControl className="mt-4">
                <Textarea
                  placeholder="Enchanted spaghetti."
                  rows={4}
                  className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <ErrorMessage error={error} />

          <div className=" flex justify-end p-2 space-x-2">
            {ratingToEdit ? (
              <Button
                onClick={onCancel}
                className="hover:no-underline"
                variant={"link"}
              >
                Cancel
              </Button>
            ) : null}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto bg-dish-dash-950 hover:bg-dish-dash-900 font-bold"
            >
              Submit review
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
