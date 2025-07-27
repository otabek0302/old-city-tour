import Link from "next/link";
import Image from "next/image";

import { Tour } from "@/payload-types";
import { Card } from "@/components/ui/card";
import { Star, Clock, Users } from "lucide-react";
import { getImageURL } from "../../../utilities/getURL";

interface TourCardProps {
  tour: Tour;
}

const ToursCard: React.FC<TourCardProps> = ({ tour }) => {
  const getMainImage = () => {
    if (tour.images && tour.images.length > 0) {
      const image = tour.images[0];
      if (typeof image.image === "string") {
        return getImageURL(image.image);
      }
      if (typeof image.image === "object" && image.image.url) {
        return getImageURL(image.image.url);
      }
    }
    return "/placeholder-tour.jpg";
  };

  const getTourType = () => {
    if (tour.type) {
      if (typeof tour.type === "string") {
        return tour.type;
      }
      if (typeof tour.type === "object" && tour.type.title) {
        return tour.type.title;
      }
    }
    return "Standard Tour";
  };

  // Helper function to get departure dates
  const getDepartureDates = () => {
    if (tour.booking_pricing && tour.booking_pricing.length > 0) {
      return tour.booking_pricing.slice(0, 2).map((booking) =>
        new Date(booking.dateStart || new Date()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    }
    return ["Jan 5, 2025", "April 24, 2025"];
  };

  // Helper function to get rating
  const getRating = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tourWithReviews = tour as any;
    if (tourWithReviews.reviews && tourWithReviews.reviews.length > 0) {
      const totalRating = tourWithReviews.reviews.reduce((sum: number, review: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (review.review && typeof review.review === "object" && (review.review as any).rating) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return sum + (review.review as any).rating;
        }
        return sum;
      }, 0);
      return (totalRating / tourWithReviews.reviews.length).toFixed(1);
    }
    return "4.6";
  };

  const departureDates = getDepartureDates();
  const rating = getRating();

  return (
    <Card className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-2 flex flex-col lg:flex-row">
        <div className="lg:w-2/5 relative border border-border rounded-xl overflow-hidden">
          <Image src={getMainImage()} alt={tour.title || "Tour Image"} className="w-full h-64 lg:h-full object-cover" width={220} height={220} />
        </div>

        <div className="lg:w-3/5 p-6">
          <div className="mb-4 space-y-2">
            <Link href={`/tours/${tour.slug}`}>
              <h3 className="text-copy hover:text-primary-dark transition-colors duration-300 text-2xl font-semibold">{tour.title || "Tour Title"}</h3>
            </Link>
            <span className="w-fit px-3 py-1 bg-primary-light rounded-[10px] text-primary-foreground text-sm font-medium flex items-center gap-1">
              <Users className="h-4 w-4" />
              {getTourType()}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-copy text-sm font-normal mb-2">Available Departure Dates</p>
            <div className="flex flex-wrap gap-2">
              {departureDates.map((date, index) => (
                <span key={index} className="text-copy-light text-xs">
                  {date}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-primary">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-secondary" />
                  <span className="text-copy-light text-xs">
                    {rating} ({(tour as any).reviews?.length || 0} Reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-copy-light text-xs">{tour.duration || ""}Days</span>
                </div>
              </div>
              <p className="text-primary-dark text-sm font-semibold flex items-center gap-1">
                <span className="text-secondary text-lg">$</span>
                <span className="text-primary-dark text-lg font-semibold">{tour.price?.toLocaleString() || "7,500.00"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ToursCard;
