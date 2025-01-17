import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { Recipe } from "@/types";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    const fetch = async () => {
      const recipes = await api.get("/recipe");

      setRecipes(recipes.data.recipes);
    };
    fetch();
  }, []);

  return (
    <section className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
};

export default HomePage;
