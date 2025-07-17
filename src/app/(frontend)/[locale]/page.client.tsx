"use client";

import Hero from "@/components/sections/home/Hero";
import Statistics from "@/components/sections/Statistics";

import { Page } from "@/payload-types";

const PageClient = ({ sections }: { sections: Page[] }) => {
  const blocks: Record<string, React.FC<any>> = {
    hero: Hero,
    statistics: Statistics
  };

  return (
    <>
      {sections && sections.length > 0 ? (
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

export default PageClient;
