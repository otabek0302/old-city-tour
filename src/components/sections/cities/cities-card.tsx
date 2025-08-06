import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { City } from "@/payload-types";
import { useTranslation } from "@/providers/i18n";

import Link from "next/link";
import Image from "next/image";

const CitiesCard = ({ city }: { city: City }) => {
  const { t } = useTranslation();

  if (!city.name) {
    return null;
  }

  return (
    <Card key={city.id} className="overflow-hidden bg-background rounded-2xl hover:shadow-md transition-all">
      <div className="relative h-60 sm:h-72 md:h-80">
        {city.image && typeof city.image === "object" && "url" in city.image && city.image.url ? (
          <Image src={city.image.url} alt={city.name || "City Image"} fill className="object-cover" priority sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image available</span>
          </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-copy text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{city.name || "City Name"}</h3>
        <p className="text-copy-lighter text-sm font-normal leading-tight mb-4">{city.description?.slice(0, 35)}...</p>
        {city.link ? (
          <Button variant="primary" size="md" className="rounded-xl w-full sm:w-auto" asChild>
            <Link href={`/cities/${city.slug}`} className="text-primary-foreground text-sm font-normal">
              {city.link}
            </Link>
          </Button>
        ) : (
          <Button variant="primary" size="md" className="rounded-xl w-full sm:w-auto" asChild>
            <Link href={`/cities/${city.slug}`} className="text-primary-foreground text-sm font-normal">
              {t("pages.cities.viewMore")}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CitiesCard;
