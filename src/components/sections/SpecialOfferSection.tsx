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
        <div className="bg-primary-light px-8 py-12 rounded-3xl flex flex-col md:flex-row items-center justify-between w-full">
          <div className="flex-1 min-w-0 space-y-4">
            {action_type === "date" ? <h2 className="max-w-2xl text-copy-white text-2xl md:text-5xl font-bold leading-normal">{heading}</h2> : <h2 className="max-w-2xl text-copy-white text-2xl md:text-4xl font-bold leading-normal">{heading}</h2>}
            {subheading && <p className="max-w-2xl text-copy-white text-base font-extralight leading-tight">{subheading}</p>}
          </div>

          <div className="flex flex-row gap-8 mt-10 md:mt-0 md:ml-12">
            {action_type === "date" ? (
              <>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-3xl md:text-5xl font-bold leading-normal">01</span>
                  <span className="text-copy-white text-lg md:text-xl mt-2 font-light">Day</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-3xl md:text-5xl font-bold leading-normal">09</span>
                  <span className="text-copy-white text-lg md:text-xl mt-2 font-light">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-3xl md:text-5xl font-bold leading-normal">45</span>
                  <span className="text-copy-white text-lg md:text-xl mt-2 font-light">Minutes</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-secondary text-3xl md:text-5xl font-bold leading-normal">30</span>
                  <span className="text-copy-white text-lg md:text-xl mt-2 font-light">Seconds</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                {button.slice(0, 2).map((btn, idx) => (
                  <Button key={idx} variant={`${idx === 0 ? "primary" : "secondary"}`} size="xxl" className="rounded-xl" asChild>
                    <Link href={btn.link} className="text-primary-foreground text-sm font-normal">
                      {btn.label}
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
