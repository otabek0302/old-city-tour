"use client";

import Link from "next/link";

import { Calendar, DollarSign, Users, Clock } from "lucide-react";
import { Tour } from "@/payload-types";
import { useTranslation } from "@/providers/i18n";
import { Button } from "@/components/ui/button";
import { ApplyTour } from "@/components/ui/apply-tour";
import { useState } from "react";

interface SingleTourPricesProps {
  tour: Tour;
}

const SingleTourPrices = ({ tour }: SingleTourPricesProps) => {
  const { t } = useTranslation();
  const [applyTourOpen, setApplyTourOpen] = useState(false);

  if (!tour.booking_pricing || tour.booking_pricing.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">{t("pages.tours.prices")}</h2>
        <div className="bg-background border border-border rounded-2xl p-6 text-center">
          <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-copy-light text-sm font-normal">{t("pages.tours.noPricingAvailable")}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "0";
    return price.toLocaleString();
  };

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">{t("pages.tours.prices")}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Information */}
        <div className="bg-background border border-primary rounded-2xl p-6">
          <h3 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            {t("pages.tours.departureDates")}
          </h3>

          <div className="space-y-4">
            {tour.booking_pricing.map((pricing, index) => (
              <div key={pricing.id || index} className="border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="text-copy font-semibold text-sm">
                    {formatDate(pricing.dateStart || null)} - {formatDate(pricing.dateEnd || null)}
                  </span>
                </div>

                <div className="space-y-2">
                  {pricing.pricePerAdult && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="text-copy-light text-sm">{t("pages.tours.adult")}</span>
                      </div>
                      <span className="text-primary font-bold">${formatPrice(pricing.pricePerAdult)}</span>
                    </div>
                  )}

                  {pricing.pricePerChild && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="text-copy-light text-sm">{t("pages.tours.child")}</span>
                      </div>
                      <span className="text-primary font-bold">${formatPrice(pricing.pricePerChild)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Actions */}
        <div className="bg-background border border-primary rounded-2xl p-6">
          <h3 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t("pages.tours.bookNow")}
          </h3>

          <div className="space-y-4">
            <div className="bg-primary-light rounded-xl p-4">
              <h4 className="text-primary-foreground font-semibold mb-2">{t("pages.tours.pricePerAdult")}</h4>
              <div className="flex items-center justify-between">
                <span className="text-primary-foreground text-sm">
                  {tour.duration_days} {t("pages.tours.days")}
                </span>
                <span className="text-primary-foreground text-2xl font-bold">${tour.price?.toLocaleString() || "0"}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="primary" size="lg" className="w-full rounded-xl" onClick={() => setApplyTourOpen(true)}>
                {t("pages.tours.bookNow")}
              </Button>

              <Button variant="outline" size="lg" className="w-full rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                <Link href="/contact-us">{t("pages.tours.contactUs")}</Link>
              </Button>
            </div>

            <div className="bg-background border border-border rounded-xl p-4">
              <h4 className="text-copy font-semibold mb-2">{t("pages.tours.importantNotes")}:</h4>
              <ul className="text-copy-light text-sm space-y-1">
                <li>{t("pages.tours.pricesPerPerson")}</li>
                <li>{t("pages.tours.childPricesAges")}</li>
                <li>{t("pages.tours.infantsFree")}</li>
                <li>{t("pages.tours.pricesMayVary")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ApplyTour open={applyTourOpen} setOpen={setApplyTourOpen} tour={tour} />
    </div>
  );
};

export default SingleTourPrices;
