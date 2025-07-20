import React from 'react';
import { Tour } from '@/payload-types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Building, Users } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  locale: string;
}

const TourCard: React.FC<TourCardProps> = ({ tour, locale }) => {
  // Helper function to get main image
  const getMainImage = () => {
    if (tour.images && tour.images.length > 0) {
      const image = tour.images[0];
      if (typeof image.image === 'string') {
        return image.image;
      }
      if (typeof image.image === 'object' && image.image.url) {
        return image.image.url;
      }
    }
    return '/placeholder-tour.jpg'; // Fallback image
  };

  // Helper function to get tour type
  const getTourType = () => {
    if (tour.type) {
      if (typeof tour.type === 'string') {
        return tour.type;
      }
      if (typeof tour.type === 'object' && tour.type.title) {
        return tour.type.title;
      }
    }
    return 'Standard Tour';
  };



  // Helper function to get departure dates
  const getDepartureDates = () => {
    if (tour.booking_pricing && tour.booking_pricing.length > 0) {
      return tour.booking_pricing.slice(0, 2).map(booking => 
        new Date(booking.dateStart || new Date()).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      );
    }
    return ['Jan 5, 2025', 'April 24, 2025']; // Default dates
  };

  // Helper function to get rating
  const getRating = () => {
    if (tour.reviews && tour.reviews.length > 0) {
      // Calculate average rating from reviews
      const totalRating = tour.reviews.reduce((sum, review) => {
        if (review.review && typeof review.review === 'object' && (review.review as any).rating) {
          return sum + (review.review as any).rating;
        }
        return sum;
      }, 0);
      return (totalRating / tour.reviews.length).toFixed(1);
    }
    return '4.6'; // Default rating
  };

  const departureDates = getDepartureDates();
  const rating = getRating();

  return (
    <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-2/5 relative">
          <img
            src={getMainImage()}
            alt={tour.title || 'Tour Image'}
            className="w-full h-64 lg:h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-3/5 p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {tour.title || 'Tour Title'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {getTourType()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                From €{tour.price?.toLocaleString() || '7,500.00'}
              </div>
            </div>
          </div>

          {/* Departure Dates */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Available Departure Dates</h4>
            <div className="flex flex-wrap gap-2">
              {departureDates.map((date, index) => (
                <span key={index} className="text-sm text-gray-600">
                  {date}
                </span>
              ))}
              <span className="text-sm text-gray-500">+3 more</span>
            </div>
          </div>



          {/* Footer Information */}
          <div className="border-t pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{rating} ({tour.reviews?.length || 45} Reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>5 Star Hotel</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Artemide</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{tour.duration || '20 Nights and 21 Days'}</span>
              </div>
              <div className="text-blue-600 font-semibold">
                From €{tour.price?.toLocaleString() || '7,500.00'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TourCard;