import { Rating } from "@/types";
import { Button } from "./ui/button";
import { RatingDeleteDialog } from "./RatingDeleteDialog";
import { useAuth } from "../stores/auth";

interface Props {
  rating: Rating;
  setRatingToEdit: (rating: Rating) => void;
}

export const RatingCard = ({ rating, setRatingToEdit }: Props) => {
  const user = useAuth((state) => state.user);
  return (
    <div>
      stars: {rating.rating}
      review: {rating.review}
      {user?.id === rating.userId ? (
        <>
          <Button onClick={() => setRatingToEdit(rating)}>Edit</Button>
          <RatingDeleteDialog ratingId={rating.id} />
        </>
      ) : null}
    </div>
  );
};
