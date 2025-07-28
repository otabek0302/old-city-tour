"use client";

import HomeHero from "@/components/sections/home/home-hero";
import SpecialOfferSection from "@/components/sections/SpecialOfferSection";
import Statistics from "@/components/sections/Statistics";
import RecommendedTours from "@/components/sections/RecommendedTours";
import RecommendedCities from "@/components/sections/RecommendedCities";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";

import { Home } from "@/payload-types";

const HomePageClient = ({ sections }: { sections: Home["sections"] }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks: Record<string, React.FC<any>> = {
    hero: HomeHero,
    "special-offer-section": SpecialOfferSection,
    "recommended-tours": RecommendedTours,
    "recommended-cities": RecommendedCities,
    testimonials: Testimonials,
    faq: Faq,
    statistics: Statistics,
  };

  return (
    <>
      {sections && sections.length > 0 ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sections.map((section: any, idx: number) => {
          const BlockComponent = blocks[section.blockType];
          if (!BlockComponent) return null;
          return <BlockComponent key={section.id || idx} {...section} />;
        })
      ) : (
        <p>No content sections found. Please add content through the admin panel.</p>
      )}
    </>
  );
};

export default HomePageClient;
