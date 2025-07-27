"use client";

import Image from "next/image";
import Link from "next/link";

import { City } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PageClientProps {
  cities: City[];
  _locale: string;
}

const PageClient = ({ cities, _locale }: PageClientProps) => {
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
    <section className="py-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.length > 0 ? (
            cities.map((city) => (
              <Card key={city.id} className="overflow-hidden bg-background rounded-2xl">
                <div className="relative">
                  <Image src={getCityImage(city)} alt={city.name || "City Image"} className="w-full h-48 object-cover" width={220} height={220} />
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
              <h3 className="text-xl font-semibold text-copy mb-2">No cities found</h3>
              <p className="text-copy-light">Check back later for new destinations.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageClient;
