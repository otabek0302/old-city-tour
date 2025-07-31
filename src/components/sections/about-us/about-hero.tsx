"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

interface AboutHeroButton {
  label?: string;
  link?: string;
}

interface AboutHeroImage {
  image?: {
    url: string;
    alt?: string;
  };
}

interface AboutHeroProps {
  heading: string;
  subheading?: string;
  "image-group"?: AboutHeroImage[];
  button?: AboutHeroButton;
}

const AboutHero = ({ heading, subheading, "image-group": imageGroup, button }: AboutHeroProps) => {
  const mainImage = imageGroup?.[0]?.image;
  const smallImages = imageGroup;

  return (
    <section className="relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative py-8 flex flex-col justify-center">
            <div className="relative">
              {mainImage ? (
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                  <Image src={mainImage.url} alt={mainImage.alt || "About Us Main Image"} fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ) : (
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted-foreground/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground font-medium">Add main image</p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
                {smallImages?.map((imageItem, index) => (
                  <div key={index} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background">
                    {imageItem?.image ? (
                      <Image src={imageItem.image.url} alt={imageItem.image.alt || `About Us Image ${index + 1}`} width={96} height={96} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-secondary/20 rounded-full"></div>
            </div>
          </div>

          <div className="max-w-2xl flex flex-col justify-center">
            <h1 className="text-copy text-4xl md:text-5xl font-bold leading-tight mb-6">{heading}</h1>

            {subheading && <p className="text-copy-light text-base md:text-lg font-normal leading-tight mb-8">{subheading}</p>}

            {button?.label && button?.link && (
              <div className="w-fit flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="hero" className="rounded-xl" asChild>
                  <Link href={button.link} className="text-primary-foreground text-sm font-normal">
                    {button.label}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
