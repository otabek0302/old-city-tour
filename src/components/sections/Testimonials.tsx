import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  tour: {
    id: string;
    title: string;
  };
  createdAt: string;
}

interface TestimonialsProps {
  reviews: Testimonial[];
  heading: string;
  subheading?: string;
}

const Testimonials = ({ reviews, heading, subheading }: TestimonialsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;

    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoplay();
    return cleanup;
  }, [autoplay]);

  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-copy text-2xl md:text-4xl font-bold leading-normal">{heading}</h2>
          {subheading && <p className="text-copy-light text-sm font-normal leading-tight mt-2">{subheading}</p>}
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative overflow-hidden py-10">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {reviews.map((review, index) => (
                <div key={`${review.id}-${index}`} className="embla__slide flex-shrink-0 w-80 mr-6">
                  <div className="bg-background rounded-xl border border-primary p-6 h-full">
                    <p className="text-copy-light text-sm leading-relaxed mb-4 line-clamp-4">"{review.comment}"</p>
                    <p className="text-copy-light text-xs font-normal leading-tight mb-1">{review.tour.title}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-secondary fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 mt-auto">
                      <h4 className="text-copy font-semibold text-sm mb-1">{review.name}</h4>
                      <p className="text-copy-light text-xs font-normal leading-tight mb-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-2.5 left-0 w-52 h-80 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute top-2.5 right-0 w-52 h-80 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
