import { useState } from "react";

import { Rating } from "@/types";
import { RatingCard } from "./RatingCard";
import { RatingForm } from "./RatingForm";

interface Props {
  ratings: Rating[];
  total_ratings: number;
}

export const RatingSection = ({ ratings, total_ratings }: Props) => {
  const [ratingToEdit, setRatingToEdit] = useState<Rating | undefined>(
    undefined
  );

  function clearRatingToEdit() {
    setRatingToEdit(undefined);
  }

  return (
    <div className="w-full border-t mt-4 pt-3">
      <h2 className="text-3xl font-semibold text-gray-700 my-5">
        {total_ratings > 0 ? (
          <>Ratings ({total_ratings})</>
        ) : (
          "Nobody has written a review yet."
        )}
      </h2>
      <RatingForm
        ratingToEdit={ratingToEdit}
        clearRatingToEdit={clearRatingToEdit}
      />
      <h2 className="text-xl font-semibold text-gray-700 my-5 italic">
        Community reviews
      </h2>
      <div>
        {ratings?.map((rating) => (
          <RatingCard
            key={rating.id}
            rating={rating}
            setRatingToEdit={setRatingToEdit}
          />
        ))}
      </div>
    </div>
  );
};
