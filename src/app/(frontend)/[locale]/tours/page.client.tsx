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
  const { t } = useTranslation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [durationRange, setDurationRange] = useState<[number, number]>([3, 21]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (selectedTypes.length > 0 && tour.type) {
        const tourType = typeof tour.type === "string" ? tour.type : (tour.type as any).id?.toString() || tour.type;
        if (!selectedTypes.includes(tourType)) return false;
      }

      if (tour.price && (tour.price < priceRange[0] || tour.price > priceRange[1])) {
        return false;
      }

      if (tour.duration) {
        const durationMatch = tour.duration.match(/(\d+)/);
        if (durationMatch) {
          const duration = parseInt(durationMatch[1]);
          if (duration < durationRange[0] || duration > durationRange[1]) {
            return false;
          }
        }
      }

      return true;
    });
  }, [tours, selectedTypes, priceRange, durationRange]);

  return (
    <section className="min-h-screen py-6">
      <div className="container">
        <div className="mb-6 border-b border-copy-light pb-6">
          <h2 className="text-copy text-3xl font-bold leading-tight mb-4">{t("pages.tours.title")}</h2>
          <p className="text-copy-light text-sm font-normal leading-tight">{t("pages.tours.subtitle")}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ToursFilter tourTypes={tourTypes} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} priceRange={priceRange} setPriceRange={setPriceRange} durationRange={durationRange} setDurationRange={setDurationRange} />
          </div>

          <div className="lg:w-3/4">
            {filteredTours.length > 0 ? (
              <div className="grid gap-6">
                {filteredTours.map((tour) => (
                  <ToursCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-copy mb-2">{t("pages.tours.noTours")}</h3>
                <p className="text-copy-light">{t("pages.tours.tryAdjustingFilters")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageClient;
