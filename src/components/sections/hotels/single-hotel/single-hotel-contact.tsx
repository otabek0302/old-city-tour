import { MapPin, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/providers/i18n";

interface Hotel {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
}

interface SingleHotelContactProps {
  hotel: Hotel;
}

const SingleHotelContact = ({ hotel }: SingleHotelContactProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <Card className="border border-border rounded-xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-copy text-xl font-semibold flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            {t("pages.hotels.contactInfo")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {hotel.address && (
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.address")}</p>
                <p className="text-copy-light text-sm leading-relaxed">{hotel.address}</p>
              </div>
            </div>
          )}
          {hotel.phone && (
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.phone")}</p>
                <a 
                  href={`tel:${hotel.phone}`} 
                  className="text-copy-light text-sm hover:text-primary transition-colors duration-200"
                >
                  {hotel.phone}
                </a>
              </div>
            </div>
          )}
          {hotel.website && (
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.website")}</p>
                <a 
                  href={hotel.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-copy-light text-sm hover:text-primary transition-colors duration-200 underline"
                >
                  {t("pages.hotels.visitWebsite")}
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleHotelContact; 