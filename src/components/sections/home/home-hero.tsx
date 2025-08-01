"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

interface HomeHeroButton {
  label?: string;
  link?: string;
  icon?: {
    url: string;
    alt?: string;
  };
}

interface HomeHeroProps {
  heading: string;
  subheading?: string;
  image?: {
    url: string;
    alt?: string;
  };
  button?: HomeHeroButton[];
  static_content?: {
    title: string;
    text?: string;
  }[];
}

const HomeHero = ({ heading, subheading, image, button = [], static_content = [] }: HomeHeroProps) => {
  return (
    <section className="relative -top-8">
      <div className="px-4">
        <div className="relative md:min-h-[calc(100vh-2vh)] h-[calc(100vh-2vh)] max-h-[780px] rounded-[28px] overflow-hidden">
          {image && (
            <div className="absolute inset-0 z-0">
              <Image src={image.url || "website-template.png"} alt={image?.alt || "Hero background"} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="max-w-4xl text-center">
                  {heading && <h1 className="text-copy-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-6">{heading}</h1>}
                  {subheading && <p className="text-copy-lighter text-base sm:text-lg font-normal leading-tight mb-6 md:mb-8 px-4">{subheading}</p>}
                  {button?.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      {button.map((item, idx) => (
                        <Button key={idx} variant="primary" size="hero" className="w-fit rounded-xl" asChild>
                          <Link href={item.link || "#"} className="text-primary-foreground text-sm font-normal">
                            {item.label}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {static_content.length > 0 && (
                <div className="hidden md:block absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 px-4 w-full max-w-6xl">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {static_content.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <h3 className="text-copy-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{stat.title}</h3>
                        {stat.text && <p className="text-copy-lighter text-xs sm:text-sm font-light leading-tight mt-1">{stat.text}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
