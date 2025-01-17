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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ratingFormSchema } from "@/schemas/rating";
import { api } from "@/lib/api";
import { Rating } from "@/types";

interface Props {
  ratingToEdit?: Rating;
}

export const RatingForm = ({ ratingToEdit }: Props) => {
  const { id } = useParams();
  const [isPending, setPending] = useState(false);

  const form = useForm<z.infer<typeof ratingFormSchema>>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });
  useEffect(() => {
    if (ratingToEdit) {
      //TODO ADD A CANCEL BUTTON AND WHEN PRESSED REMOVE ratingToEdit STATE AND RESET FORM
      form.setValue("rating", ratingToEdit.rating);
      form.setValue("review", ratingToEdit.review);
    }
  }, [ratingToEdit]);
  const onSubmit = async (values: z.infer<typeof ratingFormSchema>) => {
    setPending(true);

    try {
      // const url = recipe ? `/recipe/update/${recipe.id}` : `/recipe/create`;
      const url = ratingToEdit
        ? `/rating/update/${ratingToEdit.id}`
        : `/rating/add`;
      const method = ratingToEdit ? "patch" : "post";
      const response = await api[method](url, {
        ...values,
        recipeId: ratingToEdit ? null : parseInt(id!, 10),
      });
      console.log(response);
      // if (!recipe) { //todo same
      //   setRecipe(response.data.recipe);
      // } else {
      //   editRecipe(response.data.recipe);
      // }
    } catch (error) {
      setPending(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        {JSON.stringify(ratingToEdit)}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enchanted spaghetti."
                  type="number"
                  className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                  {...field}
                />
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
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enchanted spaghetti."
                  type="text"
                  className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Review</Button>
      </form>
    </Form>
  );
};
