"use client";

import HomeHero from "@/components/sections/home/home-hero";
import SpecialOfferSection from "@/components/sections/SpecialOfferSection";
import Statistics from "@/components/sections/Statistics";
import RecommendedTours from "@/components/sections/RecommendedTours";
import RecommendedCities from "@/components/sections/RecommendedCities";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import { useTranslation } from "@/providers/i18n";

import { Home } from "@/payload-types";

const HomePageClient = ({ sections }: { sections: Home["sections"] }) => {
  const { t } = useTranslation();

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
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-copy-light">{t("components.missing")}</p>
        </div>
      )}
    </>
  );
};

export default HomePageClient;
