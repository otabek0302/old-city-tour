"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/providers/i18n";
import { Star } from "lucide-react";

interface Hotel {
  id: number;
  name: string;
  description?: string;
  address?: string;
  rating?: string;
  images?: Array<{ image: { url: string } }>;
  slug?: string;
}

interface HotelsPageClientProps {
  hotels: Hotel[];
}

const HotelsPageClient = ({ hotels }: HotelsPageClientProps) => {
  const { t } = useTranslation();

  return (
    <section className="py-6">
      <div className="container">
        <div className="mb-6 border-b border-copy-light pb-6">
          <h2 className="text-copy text-3xl font-bold leading-tight mb-4">{t("pages.hotels.title")}</h2>
          <p className="text-copy-light text-sm font-normal leading-tight">{t("pages.hotels.subtitle")}</p>
        </div>

        {hotels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-copy-light text-lg">{t("pages.hotels.noHotels")}</p>
            <p className="text-copy-light text-sm mt-2">{t("pages.hotels.contactForAssistance")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="bg-background border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                {hotel.images?.[0]?.image && (
                  <div className="relative h-48">
                    <img src={hotel.images[0].image.url} alt={hotel.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardContent className="p-6">
                  <h2 className="text-copy text-lg font-semibold mb-3">{hotel.name}</h2>
                  {hotel.description && <p className="text-copy-light text-sm font-normal leading-tight mb-4 line-clamp-3">{hotel.description}</p>}
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    {hotel.address && <span className="text-copy-light text-xs font-normal">{hotel.address}</span>}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < parseInt(hotel.rating || "0") ? "text-secondary fill-current" : "text-border"}`} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelsPageClient;
