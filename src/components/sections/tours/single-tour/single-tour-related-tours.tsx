import Link from "next/link";
import Image from "next/image";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/providers/i18n";

interface City {
  id: number;
  name: string;
  slug?: string | null;
}

interface Tour {
  id: number;
  title: string;
  slug?: string | null;
  price: number;
  duration: string;
  cities: (number | City)[];
  images?:
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: number | any;
        id?: string | null;
      }[]
    | null;
  reviews?:
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        review?: (number | null) | any;
        id?: string | null;
      }[]
    | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: string | any;
}

interface SingleTourRelatedToursProps {
  tour: {
    id?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type?: string | any;
  };
}

const getMainImage = (tour: Tour) => {
  if (tour.images && tour.images.length > 0) {
    const image = tour.images[0];
    if (typeof image.image === "string") {
      return image.image;
    }
    if (typeof image.image === "object" && image.image.url) {
      return image.image.url;
    }
  }
  return "/placeholder-tour.jpg";
};

const getRating = (tour: Tour) => {
  if (tour.reviews && tour.reviews.length > 0) {
    const totalRating = tour.reviews.reduce((sum, review) => {
      if (review.review && typeof review.review === "object" && review.review.rating) {
        return sum + review.review.rating;
      }
      return sum;
    }, 0);
    return (totalRating / tour.reviews.length).toFixed(1);
  }
  return "4.6";
};

const getCityName = (city: number | City): string => {
  if (typeof city === "object" && city.name) {
    return city.name.toUpperCase();
  }
  return "UNKNOWN";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTourType = (tour: any): string => {
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

const SingleTourRelatedTours = ({ tour }: SingleTourRelatedToursProps) => {
  const { t } = useTranslation();
  const [relatedTours, setRelatedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedTours = async () => {
      if (!tour.type) {
        console.log("No tour type found");
        setLoading(false);
        return;
      }

      try {
        const tourType = getTourType(tour);
        console.log("Current tour type:", tourType);

        // Fetch all tours
        console.log("Fetching all tours...");
        const response = await fetch(`/api/tours?type=${tourType}&limit=20&sort=-createdAt`);

        if (response.ok) {
          const data = await response.json();
          const allTours = data.docs || [];
          console.log("Total tours fetched:", allTours.length);
          console.log(
            "All tours:",
            allTours.map((t: Tour) => ({ id: t.id, title: t.title, type: t.type }))
          );

          // Filter tours by the same type as current tour
          const relatedTours = allTours.filter((t: Tour) => {
            if (t.id === tour.id) return false; // Exclude current tour
            const tType = getTourType(t);

            // Show tours with the exact same type
            return tType === tourType;
          });

          console.log("Tours found with same type", tourType, ":", relatedTours.length);
          setRelatedTours(relatedTours.slice(0, 6)); // Show up to 6 related tours
        } else {
          console.error("Failed to fetch tours");
        }
      } catch (error) {
        console.error("Error fetching related tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedTours();
  }, [tour.type, tour.id]);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">{t("pages.tours.relatedTours")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div key={card} className="bg-background border border-border rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-muted"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedTours.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">{t("pages.tours.relatedTours")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTours.map((tour) => (
          <Link key={tour.id} href={`/tours/${tour.slug}`}>
            <div className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={getMainImage(tour)} alt={tour.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>

              <div className="p-4">
                <h4 className="text-copy font-semibold text-sm mb-2 line-clamp-2">{tour.title}</h4>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-medium text-xs">{tour.cities.map(getCityName).join(" → ")}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-secondary fill-current" />
                    <span className="text-copy-light text-xs">{getRating(tour)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">${tour.price?.toLocaleString()}</span>
                  <span className="text-copy-light text-xs">{t("pages.tours.perAdult")}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleTourRelatedTours;
