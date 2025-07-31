"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Hotel {
  id: string;
  name: string;
  images?: Array<{
    id: string;
    image: {
      url: string;
      alt?: string;
    };
  }>;
}

interface SingleHotelImagesProps {
  hotel: Hotel;
}

const SingleHotelImages = ({ hotel }: SingleHotelImagesProps) => {
  const [mainIdx, setMainIdx] = useState(0);
  const [mainImage, setMainImage] = useState(hotel.images?.[0]);

  useEffect(() => {
    setMainImage(hotel.images?.[mainIdx]);
  }, [mainIdx, hotel.images]);

  if (!hotel.images?.length) {
    return (
      <div className="mb-8">
        <div className="w-full h-[300px] sm:h-[400px] md:h-[520px] bg-muted rounded-xl border border-border flex items-center justify-center">
          <p className="text-copy-light text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[520px] mb-4 border border-border rounded-xl overflow-hidden">
        <Image 
          src={mainImage?.image.url || ""} 
          fill 
          priority 
          alt={mainImage?.image.alt || `${hotel.name} - Main image`} 
          className="object-cover object-center" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
          onError={() => setMainImage(hotel.images?.[0])} 
        />
      </div>
      {hotel.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {hotel.images.map((img, idx) => (
            <button 
              key={img.id || idx} 
              onClick={() => setMainIdx(idx)} 
              className={`relative h-20 sm:h-24 md:h-32 w-32 sm:w-40 md:w-52 border-2 rounded-xl overflow-hidden flex items-center justify-center transition-all flex-shrink-0 hover:border-primary/50 ${
                mainIdx === idx ? "border-primary" : "border-border"
              }`} 
              type="button"
            >
              <Image 
                src={img.image.url} 
                fill 
                priority 
                alt={img.image.alt || `${hotel.name} - Image ${idx + 1}`} 
                className="object-cover object-center" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleHotelImages; 