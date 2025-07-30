import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SpecialOfferSectionProps {
  heading: string;
  subheading?: string;
  action_type: "date" | "buttons";
  button?: { label: string; link: string }[];
}

const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({ heading, subheading, action_type, button = [] }) => {
  return (
    <section className="mb-4 -mt-4">
      <div className="container">
        <div className="bg-primary-light px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row items-center justify-between w-full">
          <div className="flex-1 min-w-0 space-y-3 sm:space-y-4 text-center md:text-left">
            {action_type === "date" ? (
              <h2 className="max-w-2xl text-copy-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-normal">
                {heading}
              </h2>
            ) : (
              <h2 className="max-w-2xl text-copy-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-normal">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="max-w-2xl text-copy-white text-sm sm:text-base font-extralight leading-tight">
                {subheading}
              </p>
            )}
          </div>

          <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-0 md:ml-8 lg:ml-12">
            {action_type === "date" ? (
              <>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-normal">01</span>
                  <span className="text-copy-white text-sm sm:text-lg md:text-xl mt-1 sm:mt-2 font-light">Day</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-normal">09</span>
                  <span className="text-copy-white text-sm sm:text-lg md:text-xl mt-1 sm:mt-2 font-light">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-normal">45</span>
                  <span className="text-copy-white text-sm sm:text-lg md:text-xl mt-1 sm:mt-2 font-light">Minutes</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-normal">30</span>
                  <span className="text-copy-white text-sm sm:text-lg md:text-xl mt-1 sm:mt-2 font-light">Seconds</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-auto">
                {button?.slice(0, 2).map((btn, idx) => (
                  <Button 
                    key={idx} 
                    variant={`${idx === 0 ? "primary" : "secondary"}`} 
                    size="xxl" 
                    className="rounded-xl w-full sm:w-auto" 
                    asChild
                  >
                    <Link href={btn?.link} className="text-primary-foreground text-sm font-normal">
                      {btn?.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferSection;
