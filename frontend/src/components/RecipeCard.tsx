import { Recipe } from "@/types";
import { useAuth } from "@/stores/auth";
import { RecipeCardAction } from "./RecipeCardAction";
import { Link } from "react-router";
import { Rating } from "@smastrom/react-rating";

interface Props {
  recipe: Recipe;
  editable?: boolean;
}

export const RecipeCard = ({ recipe, editable = false }: Props) => {
  const user = useAuth((state) => state.user);
  return (
    <article className="w-full flex flex-col justify-between  py-4 relative bg-white shadow-md rounded-md overflow-hidden">
      <div className="">
        {recipe.image && (
          <img
            src={recipe.image}
            className="w-full h-32 sm:h-48 object-cover"
          />
        )}
        <div className="p-4">
          <Link to={`/recipe/${recipe.id}`}>
            <h2 className="capitalize text-xl font-semibold text-dish-dash-900 truncate">
              {recipe.title}
            </h2>
          </Link>
          <div className="flex space-x-2 mt-2">
            <Rating
              value={recipe.avg_rating || 0}
              style={{ maxWidth: "90px" }}
              readOnly
            />
            <span className="mb-0.5  font-semibold text-gray-700">
              {recipe.avg_rating}
            </span>
          </div>
          <p className="text-gray-800 mt-2 line-clamp-2">
            {recipe.description}
          </p>
          <div className="mt-2 space-x-2 text-sm text-gray-600 truncate">
            {recipe.ingredients.map((ingredient, i) => (
              <span
                key={i}
                className="font-semibold after:content-[','] after:last:content-[]"
              >
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {editable && user?.id === recipe.userId ? (
        <RecipeCardAction recipeId={recipe.id} />
      ) : null}
    </article>
  );
};
