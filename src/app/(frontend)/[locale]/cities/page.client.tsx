"use client";

import CitiesCard from "@/components/sections/cities/cities-card";

import { City } from "@/payload-types";
import { useTranslation } from "@/providers/i18n";

interface PageClientProps {
  cities: City[];
  _locale: string;
}

const PageClient = ({ cities, _locale }: PageClientProps) => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen py-6 sm:py-8 md:py-10">
      <div className="container">
        <div className="mb-6 sm:mb-8 border-b border-copy-light pb-4 sm:pb-6">
          <h2 className="text-copy text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4">{t("pages.cities.title")}</h2>
          <p className="text-copy-light text-sm sm:text-base font-normal leading-tight">{t("pages.cities.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cities.length > 0 ? (
            cities.map((city) => (
              <CitiesCard key={city.id} city={city} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <h3 className="text-lg sm:text-xl font-semibold text-copy mb-2 sm:mb-3">{t("pages.cities.noCities")}</h3>
              <p className="text-copy-light text-sm sm:text-base">{t("pages.cities.checkBackLater")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageClient;
