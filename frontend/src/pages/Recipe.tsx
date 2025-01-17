import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "@/lib/api";
import { Recipe } from "@/types";
import { ListIngredients } from "../components/ListIngredients";
import { RatingSection } from "../components/RatingSection";
import moment from "moment";
import { Rating } from "@smastrom/react-rating";
import { Separator } from "../components/ui/separator";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({} as Recipe);
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get(`/recipe/${id}`);
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
        {recipe.image ? (
          <img src={recipe.image} className=" max-h-[400px] w-auto rounded" />
        ) : (
          <div>FALLBACK</div>
        )}

        <section className="flex flex-col w-full items-start mt-5 space-y-6">
          <div className="space-y-2 sm:space-y-0 sm:flex w-full items-center justify-between">
            <h1 className="capitalize text-dish-dash-900 text-3xl font-bold">
              {recipe.title}
            </h1>

            {recipe.user ? (
              <div className="text-gray-700 text-sm mb-1">
                Submitted by
                <span className="font-semibold">
                  {" "}
                  {recipe.user.name} {recipe.user.lastname}{" "}
                </span>
                | {moment(new Date(recipe.created_at), "YYYYMMDD").fromNow()}
              </div>
            ) : (
              "..."
            )}
          </div>
          <div className="flex space-x-6 ">
            <div className="flex space-x-2">
              <Rating
                value={recipe.avg_rating || 0}
                style={{ maxWidth: "90px" }}
              />
              <span className="mb-0.5  font-semibold text-gray-700">
                {recipe.avg_rating}
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="bg-dish-dash-400 h-auto"
            />
            <span className="italic flex items-center text-gray-700 font-semibold text-sm">
              {recipe._count ? (
                <>{recipe._count.ratings} reviews</>
              ) : (
                "No reviews yet"
              )}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Ingredients</h3>
            <ListIngredients ingredients={recipe.ingredients} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="p-1">{recipe.description}</p>
          </div>
        </section>
        <RatingSection
          ratings={recipe.ratings}
          total_ratings={recipe._count?.ratings || 0}
        />
      </div>
    </div>
  );
};

export default RecipePage;
