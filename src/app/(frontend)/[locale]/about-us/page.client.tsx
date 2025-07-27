"use client";

import AboutHero from "@/components/sections/about-us/about-hero";
import RecommendedTours from "@/components/sections/RecommendedTours";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import SpecialOfferSection from "@/components/sections/SpecialOfferSection";

import { AboutUs as AboutUsType } from "@/payload-types";

const AboutUsClient = ({ sections }: { sections: AboutUsType[] }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks: Record<string, React.FC<any>> = {
    "about-us-hero": AboutHero,
    "statistics": Statistics,
    "recommended-tours": RecommendedTours,
    testimonials: Testimonials,
    "special-offer-section": SpecialOfferSection,
  };

  return (
    <>
      {sections && sections.length > 0 ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sections.map((section: any, idx: number) => {
          const BlockComponent = blocks[section.blockType];
          if (!BlockComponent) return <p key={idx}>Unknown block type</p>;
          return <BlockComponent key={section.id || idx} {...section} />;
        })
      ) : (
        <p>Translation or content missing for this locale.</p>
      )}
    </>
  );
};

export default AboutUsClient;