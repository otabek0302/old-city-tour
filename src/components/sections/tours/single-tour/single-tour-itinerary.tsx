interface Activity {
  activity?: string | null;
  id?: string | null;
}

interface ItineraryItem {
  day: string;
  activities?: Activity[] | null;
  id?: string | null;
}

interface SingleTourItineraryProps {
  tour: {
    itinerary?: ItineraryItem[] | null;
  };
}

const SingleTourItinerary = ({ tour }: SingleTourItineraryProps) => {
  if (!tour.itinerary || tour.itinerary.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">Itinerary</h2>

      <div className="relative">
        <div className="absolute left-6 top-6 bottom-6 w-px border-l-2 border-dotted border-primary"></div>

        <div className="space-y-8">
          {tour.itinerary.map((item, index) => (
            <div key={item.id || index} className="relative flex items-start gap-6">
              <div className="relative z-10 flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
              </div>

              <div className="flex-1 pt-1">
                <h3 className="text-copy font-bold text-lg mb-3">{item.day}</h3>

                {item.activities && item.activities.length > 0 && (
                  <ul className="space-y-2">
                    {item.activities.map((activity, activityIndex) => (
                      <li key={activity.id || activityIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-copy rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-copy text-sm leading-relaxed">{activity.activity}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleTourItinerary;
