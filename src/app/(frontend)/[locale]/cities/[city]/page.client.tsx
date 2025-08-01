"use client";

import TourCard from "@/components/sections/tours/tours-card";
import { useTranslation } from "@/providers/i18n";

interface CityPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  city: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tours: any[];
}

const CityPage = ({ city, tours }: CityPageProps) => {
  const { t } = useTranslation();
  return (
    <section className="min-h-screen py-6 sm:py-8 md:py-10">
      <div className="container">
        <div className="mb-6 sm:mb-8 border-b border-copy-light pb-4 sm:pb-6">
          {city.name && <h2 className="text-copy text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4">{city.name}</h2>}
          {city.description && <p className="text-copy-light text-sm sm:text-base font-normal leading-tight">{city.description}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {tours.length > 0 ? (
            tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <p className="text-copy-light text-sm sm:text-base">{t("pages.cities.noToursAvailable")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CityPage;
