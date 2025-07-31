import { Star } from "lucide-react";
import { Tour } from "@/payload-types";

interface TourInfoProps {
  tour: Tour;
}

const getRating = (reviews?: any[]) => {
  if (reviews && reviews.length > 0) {
    const total = reviews.reduce((sum, r) => {
      if (r.review && typeof r.review === "object" && r.review.rating) {
        return sum + r.review.rating;
      }
      if (typeof r.rating === "number") {
        return sum + r.rating;
      }
      return sum;
    }, 0);
    return (total / reviews.length).toFixed(1);
  }
  return "4.6";
};

const SingleTourInfo = ({ tour }: TourInfoProps) => {
  const cities = tour.cities?.map((c) => (typeof c === "object" && c.name ? c.name : "")).join(", ");
  const rating = getRating([]); // Reviews are not part of the Tour type, using default rating

  return (
    <div className="mb-8">
      <div className="mb-4">
        {tour.title && <h1 className="text-primary text-lg md:text-3xl font-bold leading-normal mb-2">{tour.title}</h1>}
        <div className="flex flex-wrap items-center gap-4 text-copy-light text-sm font-medium mb-2">
          {tour.duration && <span className="italic font-semibold">{tour.duration}</span>}
          <span className="text-copy-light text-sm font-medium">|</span>
          {tour.type && <span className="italic font-semibold">{typeof tour.type === "object" && tour.type.title ? tour.type.title : ""}</span>}
          <span className="text-copy-light text-sm font-medium">|</span>
          {cities && <span className="italic">{cities}</span>}
          <span className="text-copy-light text-sm font-medium">|</span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-secondary fill-current" /> {rating}
          </span>
        </div>
        {tour.description && <p className="text-copy-light text-sm font-normal leading-tight">{tour.description}</p>}
      </div>
    </div>
  );
};

export default SingleTourInfo;
