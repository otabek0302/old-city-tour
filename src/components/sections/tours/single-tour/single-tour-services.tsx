import { Check, X } from "lucide-react";

interface ServiceItem {
  title: string;
  id?: string | null;
}

interface Services {
  included?: ServiceItem[] | null;
  notIncluded?: ServiceItem[] | null;
}

interface SingleTourServicesProps {
  tour: {
    services?: Services | null;
  };
}

const SingleTourServices = ({ tour }: SingleTourServicesProps) => {
  if (!tour.services) {
    return null;
  }

  const { included, notIncluded } = tour.services;

  return (
    <div className="mb-8">
      <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">Services</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-background border border-primary rounded-xl p-6">
          <h3 className="text-green-600 font-bold text-lg mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Price includes:
          </h3>

          {included && included.length > 0 ? (
            <ul className="space-y-3">
              {included.map((item, index) => (
                <li key={item.id || index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-copy text-sm leading-relaxed">{item.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-copy-light text-sm">No included services listed.</p>
          )}
        </div>

        <div className="bg-background border border-primary rounded-xl p-6">
          <h3 className="text-red-600 font-bold text-lg mb-4 flex items-center gap-2">
            <X className="w-5 h-5" />
            Price doesn&apos;t include:
          </h3>

          {notIncluded && notIncluded.length > 0 ? (
            <ul className="space-y-3">
              {notIncluded.map((item, index) => (
                <li key={item.id || index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-copy text-sm leading-relaxed">{item.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-copy-light text-sm">No excluded services listed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleTourServices;
