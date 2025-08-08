import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Tour } from "@/payload-types";
import { useTranslation } from "@/providers/i18n";

interface SingleTourAccommodationProps {
  tour: Tour;
}

const getCityName = (city: number | any): string => {
  if (typeof city === "object" && city.name) {
    return city.name.toUpperCase();
  }
  return "UNKNOWN";
};

const SingleTourAccommodation = ({ tour }: SingleTourAccommodationProps) => {
  const { t } = useTranslation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!tour.accommodation || tour.accommodation.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">{t("pages.tours.accommodation")}</h2>

      <div className="space-y-2">
        {tour.accommodation.map((item, index) => {
          const cityName = getCityName(item.city);
          const isExpanded = expandedItem === item.id;

          return (
            <div key={item.id || index} className="relative bg-background border border-primary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-copy font-bold text-base">{cityName}</span>
                  <span className="text-copy-light">•</span>
                  <span className="text-primary font-medium">{item.nights} {t("pages.tours.nights")}</span>
                </div>

                <button onClick={() => setExpandedItem(isExpanded ? null : item.id || index.toString())} className="text-primary hover:text-primary-dark transition-colors">
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
              </div>

              {isExpanded && item.hotel && item.hotel.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="space-y-3">
                    {item.hotel.map((hotel, index) => {
                      if (typeof hotel === "number") return null; // Skip if hotel is just an ID
                      return (
                        <div key={index} className="bg-background rounded-lg p-3">
                          <h4 className="font-semibold text-copy mb-2">{hotel.name}</h4>
                          {hotel.description && <p className="text-copy-light text-sm mb-2">{hotel.description}</p>}
                          <div className="space-y-1 text-sm">
                            {hotel.address && (
                              <p className="text-copy-light">
                                <span className="font-medium">{t("pages.tours.address")}:</span> {hotel.address}
                              </p>
                            )}
                            {hotel.phone && (
                              <p className="text-copy-light">
                                <span className="font-medium">{t("pages.tours.phone")}:</span> {hotel.phone}
                              </p>
                            )}
                            {hotel.website && (
                              <p className="text-copy-light">
                                <span className="font-medium">{t("pages.tours.website")}:</span> {hotel.website}
                              </p>
                            )}
                            {hotel.rating && (
                              <p className="text-copy-light">
                                <span className="font-medium">{t("pages.tours.rating")}:</span> {hotel.rating} {t("pages.tours.stars")}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleTourAccommodation;
