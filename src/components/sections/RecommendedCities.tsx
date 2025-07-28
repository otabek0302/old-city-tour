import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getImageURL } from "../../utilities/getURL";

interface City {
  slug: string;
  name: string;
  description?: string;
  image: {
    url: string;
    alt: string;
  };
  link: string;
}

interface RecommendedCitiesProps {
  heading: string;
  subheading?: string;
  cities: City[];
  button: {
    label: string;
    link: string;
  };
}

const RecommendedCities: React.FC<RecommendedCitiesProps> = ({ heading, subheading, cities, button }) => {
  return (
    <section className="py-8">
      <div className="container">
        <div className={`${!heading && !subheading ? "mb-0" : "mb-8"} max-w-2xl`}>
          {heading && <h2 className="text-copy text-2xl md:text-4xl font-bold leading-normal">{heading}</h2>}
          {subheading && <p className="text-copy-light text-sm font-normal leading-tight mt-2">{subheading}</p>}
        </div>
        {cities.length === 2 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
            {cities.map((city, idx) => (
              <div key={idx} className="col-span-2 relative rounded-2xl overflow-hidden min-h-[600px] flex items-end" style={{ backgroundImage: `url(${city.image.url})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 group-hover:from-black/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 group-hover:from-black/20 via-black/10 to-transparent z-10" />
                <div className="relative z-20 py-8 px-32 w-full flex flex-col items-center justify-end text-center">
                  <h3 className="text-copy-white text-2xl md:text-4xl font-extrabold text-center mb-2 drop-shadow-lg">{city.name}</h3>
                  <p className="text-copy-lighter text-base font-normal leading-tight">{city.description?.slice(0, 35)}...</p>
                  {city.link && (
                    <Button variant="primary" size="md" className="mt-4 rounded-xl" asChild>
                      <Link href={`/cities/${city.slug}`} className="text-primary-foreground text-sm font-normal">
                        {city.link || "View More"}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 w-full">
            {/* Column 1: col 1, spans 2 rows */}
            <div className="group relative rounded-2xl overflow-hidden min-h-[640px] row-span-2 flex items-end" style={{ backgroundImage: `url(${getImageURL(cities[0].image.url)})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 group-hover:from-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 group-hover:from-black/20 via-black/10 to-transparent z-20"></div>
              <div className="relative z-10 p-8 w-full flex flex-col items-start justify-end">
                <h3 className="text-copy-white text-xl md:text-2xl font-extrabold mb-2 drop-shadow-lg">{cities[0].name}</h3>
              </div>
            </div>
            {/* Column 2: col 2, row 1 */}
            <div className="group relative rounded-2xl overflow-hidden min-h-[150px] flex items-end" style={{ backgroundImage: `url(${getImageURL(cities[1].image.url)})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 group-hover:from-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 group-hover:from-black/20 via-black/10 to-transparent z-20"></div>
              <div className="relative z-10 p-8 w-full flex flex-col items-start justify-end">
                <h3 className="text-copy-white text-xl md:text-2xl font-extrabold mb-2 drop-shadow-lg">{cities[1].name}</h3>
              </div>
            </div>
            {/* Column 3: col 3, spans 2 rows */}
            <div className="group relative rounded-2xl overflow-hidden min-h-[640px] row-span-2 flex items-end" style={{ backgroundImage: `url(${getImageURL(cities[3].image.url)})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 group-hover:from-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 group-hover:from-black/20 via-black/10 to-transparent z-20"></div>
              <div className="relative z-10 p-8 w-full flex flex-col items-start justify-end">
                <h3 className="text-copy-white text-xl md:text-2xl font-extrabold mb-2 drop-shadow-lg">{cities[3].name}</h3>
              </div>
            </div>
            {/* Column 4: col 2, row 2 */}
            <div className="group relative rounded-2xl overflow-hidden min-h-[150px] flex items-end" style={{ backgroundImage: `url(${getImageURL(cities[2].image.url)})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 group-hover:from-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 group-hover:from-black/20 via-black/10 to-transparent z-20"></div>
              <div className="relative z-10 p-8 w-full flex flex-col items-start justify-end">
                <h3 className="text-copy-white text-xl md:text-2xl font-extrabold mb-2 drop-shadow-lg">{cities[2].name}</h3>
              </div>
            </div>
          </div>
        )}
        {button && (
          <div className="mt-8 flex justify-end">
            <Button variant="primary" size="xl" className="rounded-xl w-fit" asChild>
              <Link href={button.link} className="text-primary-foreground text-sm font-normal" target="_blank" rel="noopener noreferrer">
                <span className="text-inherit">{button.label}</span>
                <ArrowRight className="w-4 h-4 animate-arrow-right" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedCities;
