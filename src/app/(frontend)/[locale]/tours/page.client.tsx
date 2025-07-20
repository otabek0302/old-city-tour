"use client";

import React, { useState, useMemo } from "react";
import TourCard from "@/components/sections/tours/TourCard";
import TourFilter from "@/components/sections/tours/TourFilter";
import { Tour, Type } from "@/payload-types";

interface PageClientProps {
  tours: Tour[];
  tourTypes: Type[];
  locale: string;
}

const PageClient: React.FC<PageClientProps> = ({ tours, tourTypes, locale }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [durationRange, setDurationRange] = useState<[number, number]>([3, 21]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Filter by type
      if (selectedTypes.length > 0 && tour.type) {
        const tourType = typeof tour.type === "string" ? tour.type : (tour.type as any).id.toString();
        if (!selectedTypes.includes(tourType)) return false;
      }

      // Filter by price
      if (tour.price && (tour.price < priceRange[0] || tour.price > priceRange[1])) {
        return false;
      }

      // Filter by duration (extract number from duration string)
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <TourFilter tourTypes={tourTypes} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} priceRange={priceRange} setPriceRange={setPriceRange} durationRange={durationRange} setDurationRange={setDurationRange} />
          </div>

          {/* Tours Grid */}
          <div className="lg:w-3/4">
            {filteredTours.length > 0 ? (
              <div className="grid gap-6">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageClient;
