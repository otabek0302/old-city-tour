import { Star, Wifi, Car, Utensils, Coffee, Bed, Droplets, Tv, AirVent, Shield, Users, MapPin } from "lucide-react";
import { useTranslation } from "@/providers/i18n";

interface Hotel {
  id: string;
  name: string;
  features?: Array<{
    id: string;
    name: string;
  }>;
}

interface SingleHotelFeaturesProps {
  hotel: Hotel;
}

const SingleHotelFeatures = ({ hotel }: SingleHotelFeaturesProps) => {
  const { t } = useTranslation();

  if (!hotel.features || hotel.features.length === 0) return null;

  const getFeatureIcon = (featureName: string) => {
    const name = featureName.toLowerCase();

    // WiFi & Internet
    if (name.includes("wifi") || name.includes("wi-fi") || name.includes("internet")) {
      return <Wifi className="w-4 h-4" />;
    }

    // Parking & Transportation
    if (name.includes("parking") || name.includes("car") || name.includes("transport")) {
      return <Car className="w-4 h-4" />;
    }

    // Food & Dining
    if (name.includes("restaurant") || name.includes("breakfast") || name.includes("bar") || name.includes("dining")) {
      return <Utensils className="w-4 h-4" />;
    }

    // Coffee & Beverages
    if (name.includes("coffee") || name.includes("tea") || name.includes("beverage")) {
      return <Coffee className="w-4 h-4" />;
    }

    // Room Amenities
    if (name.includes("bed") || name.includes("room") || name.includes("accommodation")) {
      return <Bed className="w-4 h-4" />;
    }

    // Bathroom
    if (name.includes("shower") || name.includes("bathroom") || name.includes("toilet")) {
      return <Droplets className="w-4 h-4" />;
    }

    // Entertainment
    if (name.includes("tv") || name.includes("television") || name.includes("entertainment")) {
      return <Tv className="w-4 h-4" />;
    }

    // Air Conditioning
    if (name.includes("air") || name.includes("ac") || name.includes("conditioning")) {
      return <AirVent className="w-4 h-4" />;
    }

    // Security
    if (name.includes("security") || name.includes("safe") || name.includes("lock")) {
      return <Shield className="w-4 h-4" />;
    }

    // Staff & Service
    if (name.includes("staff") || name.includes("service") || name.includes("concierge")) {
      return <Users className="w-4 h-4" />;
    }

    // Location
    if (name.includes("location") || name.includes("center") || name.includes("downtown")) {
      return <MapPin className="w-4 h-4" />;
    }

    // Default
    return <Star className="w-4 h-4" />;
  };

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">{t("pages.hotels.features")}</h2>

      <div className="bg-background border border-primary rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotel.features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-primary">{getFeatureIcon(feature.name)}</span>
                <span className="text-copy text-sm leading-relaxed">{feature.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleHotelFeatures;
