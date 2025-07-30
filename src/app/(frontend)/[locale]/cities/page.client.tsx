"use client";

import Image from "next/image";
import Link from "next/link";

import { City } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/i18n";

interface PageClientProps {
  cities: City[];
  _locale: string;
}

const PageClient = ({ cities, _locale }: PageClientProps) => {
  const { t } = useTranslation();
  const getCityImage = (city: City) => {
    if (city.image) {
      if (typeof city.image === "string") {
        return city.image;
      }
      if (typeof city.image === "object" && city.image.url) {
        return city.image.url;
      }
    }
    return "/placeholder-city.jpg";
  };

  return (
    <section className="min-h-screen py-6">
      <div className="container">
        <div className="mb-6 border-b border-copy-light pb-6">
          <h2 className="text-copy text-3xl font-bold leading-tight mb-4">{t('pages.cities.title')}</h2>
          <p className="text-copy-light text-sm font-normal leading-tight">{t('pages.cities.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.length > 0 ? (
            cities.map((city) => (
              <Card key={city.id} className="overflow-hidden bg-background rounded-2xl hover:shadow-md transition-all">
                <div className="relative h-80">
                  <Image src={getCityImage(city)} alt={city.name || "City Image"} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-copy text-xl font-semibold mb-2">{city.name || "City Name"}</h3>
                  <p className="text-copy-lighter text-sm font-normal leading-tight">{city.description?.slice(0, 35)}...</p>
                  {city.link && (
                    <Button variant="primary" size="md" className="mt-4 rounded-xl" asChild>
                      <Link href={`/cities/${city.slug}`} className="text-primary-foreground text-sm font-normal">
                        {city.link}
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-copy mb-2">{t("pages.cities.noCities")}</h3>
              <p className="text-copy-light">{t("pages.cities.checkBackLater")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageClient;
