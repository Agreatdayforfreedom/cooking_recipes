import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipes } from "@/stores/recipes";
import { RecipeDialog } from "../components/RecipeDialog";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router";

const YourRecipes = () => {
  const [loading, setLoading] = useState(false);

  const recipes = useRecipes((state) => state.recipes);
  const setRecipes = useRecipes((state) => state.setRecipes);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchYourRecipes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/recipe/own");
        setRecipes(response.data.recipes);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchYourRecipes();
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <div className="flex justify-end my-5">
        <RecipeDialog />
      </div>
      <section className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} editable />
        ))}
      </section>
    </div>
  );
};

export default YourRecipes;
