import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Tour {
  id: number;
  title: string;
  duration: string;
  description: string;
  type: {
    title: string;
  };
  price: number;
  images: Array<{
    id: string;
    image: {
      id: number;
      alt: string;
      url: string;
      thumbnailURL: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      sizes: {
        thumbnail: {
          url: string;
          width: number;
          height: number;
          mimeType: string;
          filesize: number;
          filename: string;
        };
        card: {
          url: string;
          width: number;
          height: number;
          mimeType: string;
          filesize: number;
          filename: string;
        };
        tablet: {
          url: string | null;
          width: number | null;
          height: number | null;
          mimeType: string | null;
          filesize: number | null;
          filename: string | null;
        };
        desktop: {
          url: string;
          width: number;
          height: number;
          mimeType: string;
          filesize: number;
          filename: string;
        };
      };
    };
  }>;
  slug: string;
  cities: Array<{
    name: string;
  }>;
}

interface RecommendedToursProps {
  heading: string;
  subheading?: string;
  tours: Tour[];
  button: {
    text: string;
    link: {
      slug: string;
    };
  };
}

const RecommendedTours: React.FC<RecommendedToursProps> = ({ heading, subheading, tours, button }) => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-copy text-2xl md:text-4xl font-bold leading-normal">{heading}</h2>
          {subheading && <p className="text-copy-light text-sm font-normal leading-tight mt-2">{subheading}</p>}
        </div>
        {
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tours.map((tour, idx) => (
              <Link key={idx} href={`/tours/${tour.slug}`} className="block">
                <div className="group relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end cursor-pointer transition-transform duration-300 hover:scale-105" style={{ backgroundImage: `url(${tour.images[0].image.url})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 group-hover:from-black/30 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 group-hover:from-black/20 via-black/10 to-transparent z-10" />
                  {/* Bottom content */}
                  <div className="relative z-20 p-4">
                    <div className="bg-background rounded-xl p-4 shadow-lg h-34 flex flex-col justify-between">
                      <h3 className="text-copy text-lg font-normal line-clamp-2 leading-normal">{tour.title}</h3>
                      <p className="my-1 text-copy-light text-sm font-normal leading-tight">{tour.cities.map((city) => city.name).join(", ")}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="flex items-center gap-1">
                            <span className="text-copy-light text-sm font-normal">{tour.duration}</span>
                            <span className="text-copy-light text-sm font-normal">days</span>
                            <span className="text-copy-light text-sm font-normal">•</span>
                            <span className="text-copy-light text-sm font-normal">{tour.type.title}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-copy-light text-sm font-normal">Price</span>
                          <span className="text-copy-light text-sm font-normal">${tour.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />
                </div>
              </Link>
            ))}
          </div>
        }
        {button && (
          <div className="mt-8 flex justify-end">
            <Button variant="primary" size="xl" className="rounded-xl w-fit" asChild>
              <Link href={button.link.slug} className="text-primary-foreground text-sm font-normal" target="_blank" rel="noopener noreferrer">
                <span className="text-inherit">{button.text}</span>
                <ArrowRight className="w-4 h-4 animate-arrow-right" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedTours;
