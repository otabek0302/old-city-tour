import { useState } from "react";
import { ChevronDown, Plane, Train, Bus } from "lucide-react";

interface City {
  name: string;
}

interface Location {
  from: number | City;
  to: number | City;
  transport?: string | null;
  date?: string | null;
  fromTime?: string | null;
  toTime?: string | null;
  duration?: string | null;
  id?: string | null;
}

interface SingleTourPathProps {
  tour: {
    locations?: Location[] | null;
  };
}

const getCityName = (city: number | City): string => {
  if (typeof city === "object" && city.name) {
    return city.name.toUpperCase();
  }
  return "UNKNOWN";
};

const getTransportIcon = (transport?: string | null) => {
  if (!transport) return <Plane className="w-6 h-6 text-primary" />;
  
  const transportLower = transport.toLowerCase();
  
  if (transportLower.includes('train') || transportLower.includes('rail')) {
    return <Train className="w-6 h-6 text-primary" />;
  }
  
  if (transportLower.includes('bus') || transportLower.includes('coach')) {
    return <Bus className="w-6 h-6 text-primary" />;
  }
  
  // Default to plane for flights, air, etc.
  return <Plane className="w-6 h-6 text-primary" />;
};

const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const SingleTourPath = ({ tour }: SingleTourPathProps) => {
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  if (!tour.locations || tour.locations.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">Travel Path</h2>
      <div className="space-y-4">
        {tour.locations.map((location, index) => {
          const fromCity = getCityName(location.from);
          const toCity = getCityName(location.to);
          const isExpanded = expandedLocation === location.id;

          return (
            <div key={location.id || index} className="border-2 border-primary rounded-xl p-6 bg-background">
              <div className="flex justify-between items-start mb-4">
                <div className="text-left">
                  <h3 className="text-primary font-bold text-lg">{fromCity}</h3>
                  <p className="text-copy-light text-sm">{location.fromTime}</p>
                  <p className="text-copy-light text-sm">{formatDate(location.date)}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-primary font-bold text-lg">{toCity}</h3>
                  <p className="text-copy-light text-sm">{location.toTime}</p>
                  <p className="text-copy-light text-sm">{formatDate(location.date)}</p>
                </div>
              </div>

              <div className="relative mb-4">
                <div className="border-t-2 border-dashed border-primary relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                    {getTransportIcon(location.transport)}
                  </div>
                </div>
              </div>

              {location.duration && (
                <div className="text-center mb-4">
                  <p className="text-primary font-medium">{location.duration}</p>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <button onClick={() => setExpandedLocation(isExpanded ? null : location.id || index.toString())} className="flex justify-between items-center w-full text-left">
                  <span className="text-copy font-medium">More detail</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="mt-4 bg-background rounded-lg">
                    <div className="space-y-2 text-sm">
                      {location.transport && (
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-medium">Transport:</span>
                          <span className="text-copy-light">{location.transport}</span>
                        </p>
                      )}
                      {location.date && (
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-medium">Date:</span>
                          <span className="text-copy-light">{formatDate(location.date)}</span>
                        </p>
                      )}
                      {location.fromTime && (
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-medium">Departure Time:</span>
                          <span className="text-copy-light">{location.fromTime}</span>
                        </p>
                      )}
                      {location.toTime && (
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-medium">Arrival Time:</span>
                          <span className="text-copy-light">{location.toTime}</span>
                        </p>
                      )}
                      {location.duration && (
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-medium">Duration:</span>
                          <span className="text-copy-light">{location.duration}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleTourPath;
