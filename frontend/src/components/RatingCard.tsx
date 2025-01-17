import { Rating as RatingStars } from "@smastrom/react-rating";
import moment from "moment";
import { Rating } from "@/types";
import { Button } from "./ui/button";
import { RatingDeleteDialog } from "./RatingDeleteDialog";
import { useAuth } from "@/stores/auth";
import { Pen } from "lucide-react";

interface Props {
  rating: Rating;
  setRatingToEdit: (rating: Rating) => void;
}

export const RatingCard = ({ rating, setRatingToEdit }: Props) => {
  const user = useAuth((state) => state.user);
  return (
    <div className="flex justify-between border-b last:border-none my-1">
      <div>
        <div className="text-gray-700 text-sm mb-1">
          Reviewed by
          <span className="font-semibold">
            {" "}
            {rating.user.name} {rating.user.lastname}{" "}
          </span>
          - {moment(new Date(rating.created_at), "YYYYMMDD").fromNow()}
        </div>
        <RatingStars value={rating.rating} style={{ maxWidth: 120 }} readOnly />
        <p className="p-2">{rating.review}</p>
      </div>
      {user?.id === rating.userId ? (
        <div className="flex flex-col sm:space-x-2 sm:flex-row items-center sm:items-start ">
          <Button
            className="p-0"
            variant={"link"}
            onClick={() => setRatingToEdit(rating)}
          >
            <Pen
              className="stroke-orange-600 hover:stroke-orange-700 transition-colors"
              size={18}
            />
          </Button>
          <RatingDeleteDialog ratingId={rating.id} />
        </div>
      ) : null}
    </div>
  );
};
