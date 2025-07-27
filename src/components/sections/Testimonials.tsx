import useEmblaCarousel from "embla-carousel-react";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddReview } from "@/components/ui/add-review";

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
  reviews?: Testimonial[];
  heading: string;
  subheading?: string;
  _button?: {
    label: string;
    link: string;
  };
  locale: string;
}

const Testimonials = ({ heading, subheading, _button, locale }: TestimonialsProps) => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/reviews?populate[tour]=true&sort=-createdAt&limit=50`);
        const data = await res.json();
        const reviewsData = data.docs || data || [];
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

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

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <section className="py-8">
      <div className="container">
        <div className={`${!heading && !subheading ? "mb-0" : "mb-8"} max-w-2xl`}>
          {heading && <h2 className="text-copy text-2xl md:text-4xl font-bold leading-normal">{heading}</h2>}
          {subheading && <p className="text-copy-light text-sm font-normal leading-tight mt-2">{subheading}</p>}
        </div>

        {reviews.length > 0 && (
          <div className="relative overflow-hidden py-8">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container flex">
                {reviews.map((review, index) => (
                  <div key={`${review.id}-${index}`} className="embla__slide flex-shrink-0 w-80 mr-6">
                    <div className="bg-background rounded-xl border border-primary p-6 h-full">
                      <p className="text-copy-light text-sm leading-relaxed mb-4 line-clamp-4">&quot;{review.comment}&quot;</p>
                      {review.tour && <p className="text-copy-light text-xs font-normal leading-tight mb-1">{review.tour.title}</p>}
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
        )}

        <div className="mt-8 flex justify-end">
          <Button variant="primary" size="xl" className="rounded-xl w-fit" onClick={handleOpen} type="button">
            <span className="text-inherit">Add Review</span>
            <ArrowRight className="w-4 h-4 animate-arrow-right" />
          </Button>
        </div>
        <AddReview open={open} setOpen={setOpen} locale={locale} />
      </div>
    </section>
  );
};

export default Testimonials;
