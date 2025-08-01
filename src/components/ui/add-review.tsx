"use client";

import { useEffect, useState } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { cleanLocalizedData } from "@/utilities/cleanLocalizedData";
import { toast } from "sonner";
import { useTranslation } from "@/providers/i18n";

interface Tour {
  id: string | number;
  title: string;
}

interface AddReviewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  locale?: string;
}

export const AddReview = ({ open, setOpen, locale = "en" }: AddReviewProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
    tour: "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoadingTours, setIsLoadingTours] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      if (!open) return;

      setIsLoadingTours(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tours`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const toursArray = Array.isArray(data) ? data : data.docs || data.data || [];

        const cleanedTours = toursArray.map((tour: any) => cleanLocalizedData(tour, locale));
        setTours(cleanedTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setTours([]);
      } finally {
        setIsLoadingTours(false);
      }
    };
    fetchTours();
  }, [open, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.rating || !formData.comment.trim() || !formData.tour) {
      toast.error(t("pages.review.validation.fillRequiredFields"));
      return;
    }

    if (formData.comment.length > 500) {
      toast.error(t("pages.review.validation.charLimitExceeded"));
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        name: formData.name.trim(),
        rating: Number(formData.rating),
        comment: formData.comment.trim(),
        tour: parseInt(formData.tour) || formData.tour,
      };

      console.log("Submitting review data:", requestData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/reviews?locale=${locale}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success(t("pages.review.success"));
        setFormData({
          name: "",
          rating: 0,
          comment: "",
          tour: "",
        });
        setTimeout(() => {
          setOpen(false);
        }, 1500);
        console.log("Review submitted successfully!");
      } else {
        const errorText = await response.text();
        console.error("Failed to submit review:", response.statusText);
        console.error("Error details:", errorText);
        toast.error(t("pages.review.error"));
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(t("pages.review.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleDialogChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setFormData({
        name: "",
        rating: 0,
        comment: "",
        tour: "",
      });
      setHoveredRating(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="w-[96%] sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-background border border-border rounded-[16px!important] mx-auto my-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-copy">{t("pages.review.title")}</DialogTitle>
          <DialogDescription className="text-copy-light text-sm font-normal leading-tight">{t("pages.review.subtitle")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              {t("pages.review.form.name")} *
            </Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder={t("pages.review.form.namePlaceholder")} className="border-border rounded-[10px]" required disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tour" className="text-sm font-medium text-gray-700">
              {t("pages.review.form.tour")} *
            </Label>
            <Select value={formData.tour} onValueChange={(value) => setFormData((prev) => ({ ...prev, tour: value }))} required>
              <SelectTrigger className="border-border rounded-[10px]" disabled={isSubmitting}>
                <SelectValue placeholder={t("pages.review.form.tourPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {isLoadingTours ? (
                  <SelectItem value="loading" disabled>
                    {t("pages.review.form.loadingTours")}
                  </SelectItem>
                ) : Array.isArray(tours) && tours.length > 0 ? (
                  tours.map((tour) => (
                    <SelectItem key={tour.id} value={String(tour.id)}>
                      {tour.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-tours" disabled>
                    {t("pages.review.form.noTours")}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">{t("pages.review.form.rating")} *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => handleRatingClick(star)} onMouseEnter={() => handleRatingHover(star)} onMouseLeave={handleRatingLeave} className="transition-colors duration-200 hover:scale-110 disabled:opacity-50" disabled={isSubmitting}>
                  <Star className={`w-8 h-8 ${star <= (hoveredRating || formData.rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600">{formData.rating > 0 && `${formData.rating} ${t("pages.review.form.outOf5")}`}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium text-gray-700">
              {t("pages.review.form.comment")} *
            </Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 500) {
                  setFormData((prev) => ({ ...prev, comment: value }));
                }
              }}
              placeholder={t("pages.review.form.commentPlaceholder")}
              className={`min-h-[100px] sm:min-h-[120px] border-border rounded-[10px] resize-none ${formData.comment.length >= 500 ? "border-red-500" : ""}`}
              required
              disabled={isSubmitting}
            />
            <p className={`text-xs ${formData.comment.length >= 500 ? "text-red-500" : "text-gray-600"}`}>
              {formData.comment.length}/500 {t("pages.review.form.characters")}
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting} className="rounded-[10px]">
              {t("pages.review.form.cancel")}
            </Button>
            <Button type="submit" variant="primary" size="xxl" disabled={isSubmitting || !formData.name || !formData.rating || !formData.comment || !formData.tour || formData.comment.length > 500} className="py-2.5 rounded-[10px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span className="inline text-primary-foreground text-sm font-medium">{t("pages.review.form.submitting")}</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  <span className="inline text-primary-foreground text-sm font-medium">{t("pages.review.form.submit")}</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
