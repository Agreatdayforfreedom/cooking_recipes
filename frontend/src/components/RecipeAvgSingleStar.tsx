import { Star } from "lucide-react";

interface Props {
  avg_rating: number;
}

export const RecipeAvgSingleStar = ({ avg_rating }: Props) => {
  return (
    <div className="absolute bottom-0 left-7 px-3 space-x-1 bg-white flex items-center justify-center border border-dish-dash-100 rounded-full">
      <span className="font-semibold  text-gray-500 mb-0.5">{avg_rating}</span>
      <Star size={14} className="fill-yellow-500 stroke-yellow-500" />
    </div>
  );
};
