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
    <section className="h-screen">
      <div className="container mx-auto py-8">
        <div className="mb-6 border-b border-copy-light pb-6">
          {city.name && <h2 className="text-copy text-3xl font-bold leading-tight mb-4">{city.name}</h2>}
          {city.description && <p className="text-copy-light text-sm font-normal leading-tight">{city.description}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.length > 0 ? (
            tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
          ) : (
            <p className="text-copy-light">{t('pages.cities.noToursAvailable')}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CityPage;
