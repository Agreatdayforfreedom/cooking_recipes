import { useState } from "react";

import { Rating } from "@/types";
import { RatingCard } from "./RatingCard";
import { RatingForm } from "./RatingForm";

interface Props {
  ratings: Rating[];
  avg_rating: number;
  total_ratings: number;
}

export const RatingSection = ({
  ratings,
  avg_rating,
  total_ratings,
}: Props) => {
  const [ratingToEdit, setRatingToEdit] = useState<Rating | undefined>(
    undefined
  );

  return (
    <div>
      <RatingForm ratingToEdit={ratingToEdit} />
      Ratings ({total_ratings}) avg: ({avg_rating})
      {ratings?.map((rating) => (
        <RatingCard rating={rating} setRatingToEdit={setRatingToEdit} />
      ))}
    </div>
  );
};
