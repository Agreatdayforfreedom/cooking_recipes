import { useEffect } from "react";
import { api } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipes } from "@/stores/recipes";
import { RecipeDialog } from "../components/RecipeDialog";

const YourRecipes = () => {
  const recipes = useRecipes((state) => state.recipes);
  const setRecipes = useRecipes((state) => state.setRecipes);

  useEffect(() => {
    const fetchYourRecipes = async () => {
      //todo add trycatch and loader?
      const response = await api.get("/recipe/own");
      setRecipes(response.data.recipes);
    };

    fetchYourRecipes();
  }, []);

  return (
    <div>
      <div className="flex justify-end my-5">
        <RecipeDialog />
      </div>
      <section className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} editable />
        ))}
      </section>
    </div>
  );
};

export default YourRecipes;
