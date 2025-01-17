import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { Recipe } from "@/types";
import { Loader } from "../components/Loader";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const recipes = await api.get("/recipe");

        setRecipes(recipes.data.recipes);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader />;
  return (
    <section className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
};

export default HomePage;
