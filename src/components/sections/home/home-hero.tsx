"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "../../ui/button";
import { getImageURL } from "../../../utilities/getURL";

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
  const imageUrl = image?.url ? getImageURL(image.url) : "";

  console.log(image);

  return (
    <section className="relative -top-8">
      <div className="w-full px-4">
        <div className="relative min-h-[calc(100vh-2vh)] h-[100vh] max-h-[780px] rounded-[28px] overflow-hidden">
          {imageUrl && (
            <div className="absolute inset-0 z-0">
              <Image src={imageUrl} alt={image?.alt || "Hero background"} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container flex items-center justify-center">
                <div className="max-w-2xl text-center">
                  <h1 className="text-copy-white text-4xl md:text-5xl font-bold leading-tight">{heading}</h1>
                  <p className="my-4 text-copy-lighter text-lg font-normal leading-tight">{subheading}</p>
                  {button?.length > 0 &&
                    button.map((item, idx) => (
                      <Button key={idx} variant="primary" size="hero" className="rounded-xl" asChild>
                        <Link href={item.link || "#"} className="text-primary-foreground text-sm font-normal">
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                </div>
              </div>
              {static_content.length > 0 && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 container grid grid-cols-2 md:grid-cols-4 gap-8">
                  {static_content.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <h3 className="text-copy-white text-4xl font-bold leading-tight">{stat.title}</h3>
                      {stat.text && <p className="text-copy-lighter text-sm font-light leading-tight">{stat.text}</p>}
                    </div>
                  ))}
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
