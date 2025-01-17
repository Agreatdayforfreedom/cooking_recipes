import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Recipe } from "@/types";
import { ingredientsSchema, recipeFormSchema } from "@/schemas/recipe";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "../lib/api";
import { useRecipes } from "../stores/recipes";
import { ingredients2string, string2ingredients } from "../lib/utils";
import { AxiosError } from "axios";
import { Textarea } from "./ui/textarea";

interface Props {
  recipe?: Recipe;
  setOpenModal: (state: boolean) => void;
}

export const RecipeForm = ({ recipe, setOpenModal }: Props) => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState("");

  const editRecipe = useRecipes((state) => state.editRecipe);
  const setRecipe = useRecipes((state) => state.setRecipe);

  //todo check if validations are correct and impl cloudinary for images
  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: recipe ? recipe.title : "",
      image: "",
      description: recipe ? recipe.description : "",
      ingredients: recipe ? ingredients2string(recipe.ingredients) : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof recipeFormSchema>) => {
    setPending(true);
    setError("");

    const ingredients = ingredientsSchema.safeParse(
      string2ingredients(values.ingredients)
    );

    if (!ingredients.success) {
      setError("The ingredients seem to be wrong!");
    }
    try {
      const url = recipe ? `/recipe/update/${recipe.id}` : `/recipe/create`;
      const method = recipe ? "patch" : "post";
      const response = await api[method](url, {
        ...values,
        ingredients: ingredients.data,
      });
      if (!recipe) {
        setRecipe(response.data.recipe);
      } else {
        editRecipe(response.data.recipe);
      }
      setOpenModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      } else {
        setError("Something went wrong! Try again.");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1 sm:min-w-[75vw]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enchanted spaghetti."
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
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Input
                  placeholder="3 bacon, 2 eggs"
                  type="text"
                  className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add all your ingredients separated by a comma! Example 2 eggs, 1
                tomato, lettuce, salt, and creativity!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="Spaghetti tossed in a spicy marinara sauce (phoenix fire sauce) with sautéed garlic (dragon's breath garlic) and topped with freshly grated Parmesan (griffin cheese) and chopped herbs... 🐉🍝✨"
                  className="no-scrollbar border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center pt-6 justify-between">
          <span className="text-red-800 font-semibold text-sm">
            {error ? error : null}
          </span>
          <div className="space-x-2">
            <Button
              onClick={() => setOpenModal(false)}
              className="hover:no-underline"
              variant={"link"}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full sm:w-auto bg-dish-dash-950 hover:bg-dish-dash-900 font-bold"
            >
              {recipe ? "Edit" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
