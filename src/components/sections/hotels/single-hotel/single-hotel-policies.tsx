import { Clock, CreditCard, PawPrint, Baby } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/providers/i18n";

interface Hotel {
  id: string;
  name: string;
  policies?: {
    checkIn?: string;
    checkOut?: string;
    cancellation?: string;
    pet?: string;
    children?: string;
    payment?: string;
  };
}

interface SingleHotelPoliciesProps {
  hotel: Hotel;
}

const SingleHotelPolicies = ({ hotel }: SingleHotelPoliciesProps) => {
  const { t } = useTranslation();

  if (!hotel.policies) return null;

  return (
    <div className="mb-8">
      <Card className="border border-border rounded-xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-copy text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {t("pages.hotels.policies")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotel.policies.checkIn && (
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.checkIn")}</p>
                  <p className="text-copy-light text-sm">{hotel.policies.checkIn}</p>
                </div>
              </div>
            )}
            {hotel.policies.checkOut && (
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.checkOut")}</p>
                  <p className="text-copy-light text-sm">{hotel.policies.checkOut}</p>
                </div>
              </div>
            )}
            {hotel.policies.cancellation && (
              <div className="flex items-start gap-4">
                <CreditCard className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.cancellation")}</p>
                  <p className="text-copy-light text-sm leading-relaxed">{hotel.policies.cancellation}</p>
                </div>
              </div>
            )}
            {hotel.policies.pet && (
              <div className="flex items-start gap-4">
                <PawPrint className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.petPolicy")}</p>
                  <p className="text-copy-light text-sm leading-relaxed">{hotel.policies.pet}</p>
                </div>
              </div>
            )}
            {hotel.policies.children && (
              <div className="flex items-start gap-4">
                <Baby className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.childrenPolicy")}</p>
                  <p className="text-copy-light text-sm leading-relaxed">{hotel.policies.children}</p>
                </div>
              </div>
            )}
            {hotel.policies.payment && (
              <div className="flex items-start gap-4">
                <CreditCard className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-copy font-medium text-sm mb-1">{t("pages.hotels.paymentPolicy")}</p>
                  <p className="text-copy-light text-sm leading-relaxed">{hotel.policies.payment}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleHotelPolicies; 