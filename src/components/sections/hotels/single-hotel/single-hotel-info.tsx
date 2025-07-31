import { Star, MapPin } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  description?: string;
  rating?: string;
  city?: {
    id: string;
    name: string;
  };
}

interface SingleHotelInfoProps {
  hotel: Hotel;
}

const SingleHotelInfo = ({ hotel }: SingleHotelInfoProps) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3">
          {hotel.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-copy-light text-sm font-medium mb-3">
          {hotel.city?.name && (
            <>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {hotel.city.name}
              </span>
              <span className="text-copy-light text-sm font-medium">•</span>
            </>
          )}
          {hotel.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-secondary fill-current" />
              {hotel.rating}/5
            </span>
          )}
        </div>
        {hotel.description && (
          <p className="text-copy-light text-sm sm:text-base font-normal leading-relaxed max-w-4xl">
            {hotel.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleHotelInfo; 