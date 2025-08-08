import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/providers/i18n";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tour: number | any;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
}

interface SingleTourReviewsProps {
  tour: {
    id?: number;
    slug?: string | null;
  };
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const truncateText = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const SingleTourReviews = ({ tour }: SingleTourReviewsProps) => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!tour.id) {
        console.log("No tour ID available");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/reviews?where[tour][equals]=${tour.id}&limit=4&sort=-createdAt`);

        if (response.ok) {
          const data = await response.json();
          setReviews(data.docs || []);
        } else {
          console.error("Failed to fetch reviews, status:", response.status);
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tour.id]);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6 capitalize">{t("pages.tours.reviews")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-background border border-primary rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">{t("pages.tours.reviews")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={review.id || index} className="bg-background border border-primary rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <h4 className="text-primary font-bold text-base">{review.name}</h4>
                <p className="text-primary/70 text-sm">{formatDate(review.createdAt)}</p>
              </div>
            </div>
            <p className="text-copy-light text-sm leading-relaxed">{truncateText(review.comment)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleTourReviews;
