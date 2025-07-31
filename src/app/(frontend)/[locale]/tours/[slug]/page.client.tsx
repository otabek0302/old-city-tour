"use client";

import SingleTourImages from "@/components/sections/tours/single-tour/single-tour-images";
import SingleTourInfo from "@/components/sections/tours/single-tour/single-tour-info";
import SingleTourItinerary from "@/components/sections/tours/single-tour/single-tour-itinerary";
import SingleTourPath from "@/components/sections/tours/single-tour/single-tour-path";
import SingleTourServices from "@/components/sections/tours/single-tour/single-tour-services";
import SingleTourAccommodation from "@/components/sections/tours/single-tour/single-tour-accommodation";
import SingleTourReviews from "@/components/sections/tours/single-tour/single-tour-reviews";
import SingleTourRelatedTours from "@/components/sections/tours/single-tour/single-tour-related-tours";
import SingleTourPrices from "@/components/sections/tours/single-tour/single-tour-prices";

import { Tour } from "@/payload-types";

interface SingleTourPageClientProps {
  tour: Tour;
}

const SingleTourPageClient = ({ tour }: SingleTourPageClientProps) => {
  console.log(tour);
  return (
    <section className="min-h-screen py-6 sm:py-8 md:py-10">
      <div className="container">
        <SingleTourImages tour={tour} />
        <SingleTourInfo tour={tour} />
        <SingleTourPath tour={tour} />
        <SingleTourAccommodation tour={tour} />
        <SingleTourServices tour={tour} />
        <SingleTourItinerary tour={tour} />
        <SingleTourPrices tour={tour} />
        <SingleTourReviews tour={tour} />
        <SingleTourRelatedTours tour={tour} />
      </div>
    </section>
  );
};

export default SingleTourPageClient;
