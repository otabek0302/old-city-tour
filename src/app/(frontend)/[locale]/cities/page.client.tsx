"use client";

import React from "react";
import { City } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";

interface PageClientProps {
  cities: City[];
  locale: string;
}

const PageClient: React.FC<PageClientProps> = ({ cities, locale }) => {
  // Helper function to get city image
  const getCityImage = (city: City) => {
    if (city.image) {
      if (typeof city.image === "string") {
        return city.image;
      }
      if (typeof city.image === "object" && city.image.url) {
        return city.image.url;
      }
    }
    return "/placeholder-city.jpg"; // Fallback image
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Cities</h1>
          <p className="text-gray-600">Discover amazing destinations around the world</p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.length > 0 ? (
            cities.map((city) => (
              <Card key={city.id} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
                <div className="relative">
                  <img
                    src={getCityImage(city)}
                    alt={city.name || "City Image"}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {city.name || "City Name"}
                  </h3>
                  {city.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {city.description}
                    </p>
                  )}
                  {city.link && (
                    <a
                      href={city.link}
                      className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Learn More →
                    </a>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No cities found</h3>
              <p className="text-gray-600">Check back later for new destinations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageClient; 