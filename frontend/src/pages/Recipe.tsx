import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "@/lib/api";
import { ListIngredients } from "../components/ListIngredients";
import { RatingSection } from "../components/RatingSection";
import moment from "moment";
import { Rating as StarRating } from "@smastrom/react-rating";
import { Separator } from "../components/ui/separator";
import { useRecipes } from "../stores/recipes";
import { Loader } from "../components/Loader";

const RecipePage = () => {
  const [loading, setLoading] = useState(false);

  const recipe = useRecipes((state) => state.recipe);
  const setRecipe = useRecipes((state) => state.setRecipe);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const response = await api.get(`/recipe/${id}`);
        setRecipe(response.data.recipe);
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading || !recipe) return <Loader />;
  return (
    <div className="w-[90%] sm:w-[75%]  mx-auto">
      <div className="flex flex-col items-center">
        {recipe.image && (
          <img src={recipe.image} className=" max-h-[400px] w-auto rounded" />
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
              <StarRating
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
          <div className="w-full">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="p-1 break-all">{recipe.description}</p>
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
