import { Recipe } from "@/types";

interface RecipeProps {
  recipes: Recipe[];
}

export interface RecipeStore extends RecipeProps {
  setRecipes: (recipes: Recipe[]) => void;
  setRecipe: (recipe: Recipe) => void;
  editRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: number) => void;
}

import { create } from "zustand";

export const useRecipes = create<RecipeStore>()((set) => ({
  recipes: [],
  setRecipes: (recipes: Recipe[]) => set(() => ({ recipes })),
  setRecipe: (recipe: Recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  editRecipe: (recipe: Recipe) =>
    set((state) => {
      let recipes = [...state.recipes].map((r) => {
        if (r.id === recipe.id) {
          return {
            ...r,
            ...recipe,
          };
        }
        return r;
      });
      return {
        recipes,
      };
    }),
  deleteRecipe: (recipeId: number) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== recipeId),
    })),
}));

//used to avoid fetch the recipe when editing it
export const useInMemoryRecipe = (recipeId: number | undefined) => {
  if (!recipeId) return null;

  const recipes = useRecipes((state) => state.recipes);

  return recipes.find((r) => r.id === recipeId);
};
