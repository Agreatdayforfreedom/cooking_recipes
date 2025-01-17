import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "@/lib/api";
import { Recipe } from "@/types";
import { string2ingredients } from "../lib/utils";
import { ListIngredients } from "../components/ListIngredients";
import { RatingSection } from "../components/RatingSection";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({} as Recipe);
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get(`/recipe/${id}`);
        console.log(response.data.recipe);
        setRecipe(response.data.recipe);
      } catch (error) {
        //todo
      }
    };
    fetch();
  }, []);

  if (!recipe) return null;
  return (
    <div className="w-[90%] sm:w-[75%]  mx-auto">
      <div className="flex flex-col items-center">
        <img src="/bacontest.jpg" className=" rounded" />

        <section className="flex flex-col w-full items-start mt-5">
          <h1 className="capitalize text-dish-dash-900 text-3xl font-bold">
            {recipe.title}
          </h1>
          <p>{recipe.description}</p>
          <ListIngredients ingredients={recipe.ingredients} />
        </section>
        <RatingSection
          ratings={recipe.ratings}
          avg_rating={recipe.avg_rating || 0}
          total_ratings={recipe._count?.ratings || 0}
        />
      </div>
    </div>
  );
};

export default RecipePage;
