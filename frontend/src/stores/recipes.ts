import { Rating, Recipe } from "@/types";

interface RecipeProps {
  recipes: Recipe[];
  recipe: Recipe | undefined;
}

export interface RecipeStore extends RecipeProps {
  setRecipes: (recipes: Recipe[]) => void;
  addRecipe: (recipe: Recipe) => void;
  setRecipe: (recipe: Recipe) => void;
  editRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: number) => void;
  addRatingToRecipe: (rating: Rating) => void;
  editRecipeRating: (rating: Rating) => void;
  deleteRatingFromRecipe: (ratingId: number) => void;
}

import { create } from "zustand";

export const useRecipes = create<RecipeStore>()((set) => ({
  recipes: [],
  recipe: undefined,
  setRecipes: (recipes: Recipe[]) => set(() => ({ recipes })),
  addRecipe: (recipe: Recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  setRecipe: (recipe: Recipe) => set(() => ({ recipe })),
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
  addRatingToRecipe: (rating: Rating) =>
    set((state) => {
      if (!state.recipe) {
        return { recipe: undefined };
      }
      const updatedRatings = [...state.recipe.ratings, rating];
      const avg_rating = updatedRatings.reduce((acc: number, curr) => {
        return acc + curr.rating;
      }, 0);
      return {
        recipe: {
          ...state.recipe,
          avg_rating,
          _count: {
            ratings: (state.recipe._count?.ratings ?? 0) + 1,
          },
          ratings: updatedRatings,
        },
      };
    }),
  editRecipeRating: (rating: Rating) =>
    set((state) => {
      if (!state.recipe) {
        return { recipe: undefined };
      }
      const updatedRatings = [...state.recipe.ratings].map((r) => {
        if (r.id === rating.id) {
          return {
            ...r,
            ...rating,
          };
        }
        return r;
      });
      const avg_rating = updatedRatings.reduce((acc: number, curr) => {
        return acc + curr.rating;
      }, 0);
      return {
        recipe: {
          ...state.recipe,
          avg_rating,
          ratings: updatedRatings,
        },
      };
    }),
  deleteRatingFromRecipe: (ratingId: number) =>
    set((state) => {
      if (!state.recipe) {
        return { recipe: undefined };
      }
      const updatedRatings = [...state.recipe.ratings].filter(
        (r) => r.id !== ratingId
      );

      const avg_rating = updatedRatings.reduce((acc: number, curr) => {
        return acc + curr.rating;
      }, 0);

      return {
        recipe: {
          ...state.recipe,
          avg_rating,
          _count: {
            ratings: (state.recipe._count?.ratings ?? 0) - 1,
          },

          ratings: updatedRatings,
        },
      };
    }),
}));

//used to avoid fetch the recipe when editing it
export const useInMemoryRecipe = (recipeId: number | undefined) => {
  if (!recipeId) return null;

  const recipes = useRecipes((state) => state.recipes);

  return recipes.find((r) => r.id === recipeId);
};
