import Link from "next/link";
import Image from "next/image";

import { Tour } from "@/payload-types";
import { Card } from "@/components/ui/card";
import { Star, Clock, Users } from "lucide-react";
import { useTranslation } from "@/providers/i18n";

interface TourCardProps {
  tour: Tour;
}

const ToursCard: React.FC<TourCardProps> = ({ tour }) => {
  const { t } = useTranslation();

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

  const getRating = (): string => {
    const reviews = (tour as { reviews?: { review?: { rating?: number } }[] }).reviews;
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum: number, review) => {
        if (review.review && typeof review.review === "object" && typeof review.review.rating === "number") {
          return sum + review.review.rating;
        }
        return sum;
      }, 0);
      return (totalRating / reviews.length).toFixed(1);
    }
    return "4.6";
  };

  const departureDates = getDepartureDates();
  const rating = getRating();

  return (
    <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
      <div className="p-2 flex flex-col lg:flex-row">
        <div className="lg:w-2/5 h-72 relative border border-border rounded-xl overflow-hidden">
          {tour.images?.[0]?.image && typeof tour.images[0].image === "object" && "url" in tour.images[0].image && tour.images[0].image.url ? (
            <Image src={tour.images[0].image.url} alt={tour.title || t("pages.tours.tourImage")} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image available</span>
            </div>
          )}
        </div>

        <div className="lg:w-3/5 p-6">
          <div className="mb-4 space-y-2">
            <Link href={`/tours/${tour.slug}`}>
              <h3 className="text-copy hover:text-primary-dark transition-colors duration-300 text-2xl font-semibold">{tour.title || t("pages.tours.tourTitle")}</h3>
            </Link>
            <span className="w-fit px-3 py-1 bg-primary-light rounded-[10px] text-primary-foreground text-sm font-medium flex items-center gap-1">
              <Users className="h-4 w-4" />
              {typeof tour.type === "object" && tour.type?.title ? tour.type.title : t("pages.tours.standardTour")}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-copy text-sm font-normal mb-2">{t("pages.tours.availableDepartureDates")}</p>
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
                    {rating} ({(tour as any).reviews?.length || 0} {t("pages.tours.reviewsCount")})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-copy-light text-xs">
                    {tour.duration_days || ""} {t("pages.tours.days")} / {tour.duration_nights || ""} {t("pages.tours.nights")}
                  </span>
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
