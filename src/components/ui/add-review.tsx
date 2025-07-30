"use client";

import { useEffect, useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { cleanLocalizedData } from '@/utilities/cleanLocalizedData'

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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
        
        // Clean the localized data for each tour
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
      return;
    }

    // Check character limit
    if (formData.comment.length > 500) {
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
        setSubmitStatus("success");
        // Reset form on success
        setFormData({
          name: "",
          rating: 0,
          comment: "",
          tour: "",
        });
        setTimeout(() => {
          setOpen(false);
          setSubmitStatus("idle");
        }, 1500);
        console.log("Review submitted successfully!");
      } else {
        setSubmitStatus("error");
        const errorText = await response.text();
        console.error("Failed to submit review:", response.statusText);
        console.error("Error details:", errorText);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitStatus("error");
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
      // Reset form when dialog closes
      setFormData({
        name: "",
        rating: 0,
        comment: "",
        tour: "",
      });
      setHoveredRating(0);
      setSubmitStatus("idle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-copy">Add Review</DialogTitle>
          <DialogDescription className="text-copy-light text-sm font-normal leading-tight">
            Share your experience with us and help others find the best tours.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm font-medium">Thank you! Your review has been submitted successfully.</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium">Sorry, there was an error submitting your review. Please try again.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-copy font-medium">
              Your Name *
            </Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="Enter your name" className="border-primary focus:border-secondary" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tour" className="text-copy font-medium">
              Select Tour *
            </Label>
            <Select value={formData.tour} onValueChange={(value) => setFormData((prev) => ({ ...prev, tour: value }))} required>
              <SelectTrigger className="border-primary focus:border-secondary">
                <SelectValue placeholder="Choose a tour you experienced" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingTours ? (
                  <SelectItem value="loading" disabled>
                    Loading tours...
                  </SelectItem>
                ) : Array.isArray(tours) && tours.length > 0 ? (
                  tours.map((tour) => (
                    <SelectItem key={tour.id} value={String(tour.id)}>
                      {tour.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-tours" disabled>
                    No tours available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-copy font-medium">Rating *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => handleRatingClick(star)} onMouseEnter={() => handleRatingHover(star)} onMouseLeave={handleRatingLeave} className="transition-colors duration-200 hover:scale-110">
                  <Star className={`w-8 h-8 ${star <= (hoveredRating || formData.rating) ? "text-secondary fill-current" : "text-gray-300"}`} />
                </button>
              ))}
              <span className="ml-3 text-sm text-copy-light">{formData.rating > 0 && `${formData.rating} out of 5`}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-copy font-medium">
              Your Review *
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
              placeholder="Share your experience, what you liked, what could be improved..."
              className={`min-h-[120px] border-primary focus:border-secondary resize-none ${formData.comment.length >= 500 ? "border-red-500" : ""}`}
              required
            />
            <p className={`text-xs ${formData.comment.length >= 500 ? "text-red-500" : "text-copy-light"}`}>{formData.comment.length}/500 characters</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || !formData.name || !formData.rating || !formData.comment || !formData.tour || formData.comment.length > 500} className="rounded-xl">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
