import { Recipe } from "@/types";
import { useAuth } from "@/stores/auth";
import { RecipeCardAction } from "./RecipeCardAction";
import { RecipeAvgSingleStar } from "./RecipeAvgSingleStar";
import { Link } from "react-router";

interface Props {
  recipe: Recipe;
  editable?: boolean;
}

export const RecipeCard = ({ recipe, editable = false }: Props) => {
  const user = useAuth((state) => state.user);

  return (
    <article className="flex w-full sm:w-96 py-4 relative">
      <img src="bacontest.jpg" className="w-28 rounded" />
      <div className="ml-2 flex-1 overflow-hidden">
        <Link to={`/recipe/${recipe.id}`}>
          <h2 className="capitalize text-xl font-semibold text-dish-dash-900">
            {recipe.title}
          </h2>
        </Link>
        <p className="overflow-hidden whitespace-nowrap text-ellipsis text-gray-800 ">
          {recipe.description}
        </p>
        <div className="space-x-2">
          {recipe.ingredients.map((i) => (
            <span className="text-semibold after:content-[','] after:last:content-[]">
              {i.name}
            </span>
          ))}
        </div>
      </div>
      {recipe.avg_rating ? (
        <RecipeAvgSingleStar avg_rating={recipe.avg_rating} />
      ) : null}

      {editable && user?.id === recipe.userId ? (
        <RecipeCardAction recipeId={recipe.id} />
      ) : null}
    </article>
  );
};
