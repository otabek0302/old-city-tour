"use client";

import { SingleHotelImages, SingleHotelInfo, SingleHotelContact, SingleHotelPolicies, SingleHotelFeatures } from "@/components/sections/hotels";

interface Hotel {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: string;
  city?: {
    id: string;
    name: string;
  };
  images?: Array<{
    id: string;
    image: {
      url: string;
      alt?: string;
    };
  }>;
  features?: Array<{
    id: string;
    name: string;
  }>;
  policies?: {
    checkIn?: string;
    checkOut?: string;
    cancellation?: string;
    pet?: string;
    children?: string;
    payment?: string;
  };
}

interface SingleHotelPageClientProps {
  hotel: Hotel;
}

const SingleHotelPageClient = ({ hotel }: SingleHotelPageClientProps) => {
  return (
    <section className="min-h-screen py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container max-w-6xl">
        <SingleHotelImages hotel={hotel} />
        <SingleHotelInfo hotel={hotel} />
        <SingleHotelContact hotel={hotel} />
        <SingleHotelPolicies hotel={hotel} />
        <SingleHotelFeatures hotel={hotel} />
      </div>
    </section>
  );
};

export default SingleHotelPageClient;
