"use client";

import Hero from "@/components/sections/home/Hero";
import Statistics from "@/components/sections/Statistics";

import { Page } from "@/payload-types";

const AboutUsPageClient = ({ sections }: { sections: Page[] }) => {
  const blocks: Record<string, React.FC<any>> = {
    hero: Hero,
    statistics: Statistics,
  };

  return (
    <>
      {sections?.map((section: any, idx: number) => {
        const BlockComponent = blocks[section.blockType];
        if (!BlockComponent) return null;
        return <BlockComponent key={section.id || idx} {...section} />;
      })}
    </>
  );
};

export default AboutUsPageClient;
