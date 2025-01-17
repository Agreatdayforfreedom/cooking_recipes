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
    <div className="mt-42">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} />
      ))}
    </div>
  );
};

export default HomePage;
