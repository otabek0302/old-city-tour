"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

interface HeroButton {
  label: string;
  link: string;
  icon?: {
    url: string;
    alt?: string;
  };
}

interface HeroProps {
  heading: string;
  subheading?: string;
  image?: {
    url: string;
    alt?: string;
  };
  button?: HeroButton[];
}

const Hero = ({ heading, subheading, image, button }: HeroProps) => {
  return (
    <section className="relative -top-8">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8;">
        <div className="relative min-h-[calc(100vh-2vh)] rounded-3xl overflow-hidden">
          {image?.url && (
            <div className="absolute inset-0 z-0">
              <Image src={image.url} alt={image.alt || "Hero background"} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 max-w-2xl mx-auto flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">{heading}</h1>
                  <p className="text-white text-lg">{subheading}</p>
                  {button?.map((item, idx) => (
                    <Button key={idx} variant="primary" size="sm" className="mt-4 rounded-[8px]">
                      <Link href={item.link} className="text-primary-foreground text-sm font-normal">
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
