"use client";

import ToursCard from "@/components/sections/tours/tours-card";
import ToursFilter from "@/components/sections/tours/tours-filter";

import { Tour, Type } from "@/payload-types";
import { useState, useMemo } from "react";
import { useTranslation } from "@/providers/i18n";

interface PageClientProps {
  tours: Tour[];
  tourTypes: Type[];
  _locale: string;
}

const PageClient = ({ tours, tourTypes, _locale }: PageClientProps) => {
  console.log("tours", tours);
  const { t } = useTranslation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]); // Increased max price
  const [durationRange, setDurationRange] = useState<[number, number]>([1, 30]); // Increased duration range

  const filteredTours = useMemo(() => {
    console.log("🔍 Filtering tours:", {
      totalTours: tours.length,
      selectedTypes,
      priceRange,
      durationRange
    });

    const filtered = tours.filter((tour) => {
      console.log("🔍 Checking tour:", tour.id, tour.title);
      
      // Type filter
      if (selectedTypes.length > 0 && tour.type) {
        const tourType = typeof tour.type === "string" ? tour.type : (tour.type as any).id?.toString() || tour.type;
        console.log("🔍 Tour type:", tourType, "Selected types:", selectedTypes);
        if (!selectedTypes.includes(tourType)) {
          console.log("❌ Tour filtered out by type");
          return false;
        }
      }

      // Price filter
      if (tour.price && (tour.price < priceRange[0] || tour.price > priceRange[1])) {
        console.log("❌ Tour filtered out by price:", tour.price, "Range:", priceRange);
        return false;
      }

      // Duration filter
      if (tour.duration) {
        const durationMatch = tour.duration.match(/(\d+)/);
        if (durationMatch) {
          const duration = parseInt(durationMatch[1]);
          if (duration < durationRange[0] || duration > durationRange[1]) {
            console.log("❌ Tour filtered out by duration:", duration, "Range:", durationRange);
            return false;
          }
        }
      }

      console.log("✅ Tour passed all filters");
      return true;
    });

    console.log("🔍 Filtered tours result:", filtered.length);
    
    // Temporary: Show all tours if filtered result is empty
    if (filtered.length === 0 && tours.length > 0) {
      console.log("⚠️ No tours passed filters, showing all tours temporarily");
      return tours;
    }
    
    return filtered;
  }, [tours, selectedTypes, priceRange, durationRange]);

  return (
    <section className="min-h-screen py-6 sm:py-8 md:py-10">
      <div className="container">
        <div className="mb-6 sm:mb-8 border-b border-copy-light pb-4 sm:pb-6">
          <h2 className="text-copy text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4">{t("pages.tours.title")}</h2>
          <p className="text-copy-light text-sm sm:text-base font-normal leading-tight">{t("pages.tours.subtitle")}</p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-6 sm:gap-8">
          <div className="lg:w-1/4 order-2 lg:order-1">
            <ToursFilter tourTypes={tourTypes} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} priceRange={priceRange} setPriceRange={setPriceRange} durationRange={durationRange} setDurationRange={setDurationRange} />
          </div>

          <div className="lg:w-3/4 order-1 lg:order-2">
            {filteredTours.length > 0 ? (
              <div className="grid gap-4 sm:gap-6">
                {filteredTours.map((tour) => (
                  <ToursCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-lg sm:text-xl font-semibold text-copy mb-2 sm:mb-3">{t("pages.tours.noTours")}</h3>
                <p className="text-copy-light text-sm sm:text-base">{t("pages.tours.tryAdjustingFilters")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageClient;
