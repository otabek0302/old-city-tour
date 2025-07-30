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
  const smallImage1 = imageGroup?.[1]?.image;
  const smallImage2 = imageGroup?.[2]?.image;
  const smallImage3 = imageGroup?.[3]?.image;

  return (
    <section className="relative">
      <div className="container">
        <div className="max-h-[820px] rounded-[28px] overflow-hidden bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
            <div className="relative py-8 lg:py-14 flex flex-col justify-center">
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

                <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-3">
                  {smallImage1 ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background">
                      <Image src={smallImage1.url} alt={smallImage1.alt || "About Us Image 1"} width={96} height={96} className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background bg-muted flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  )}
                  {smallImage2 ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background">
                      <Image src={smallImage2.url} alt={smallImage2.alt || "About Us Image 2"} width={96} height={96} className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background bg-muted flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  )}
                  {smallImage3 ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background col-span-2">
                      <Image src={smallImage3.url} alt={smallImage3.alt || "About Us Image 3"} width={96} height={96} className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background col-span-2 bg-muted flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-secondary/20 rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="max-w-2xl">
                <h1 className="text-copy text-4xl md:text-5xl font-bold leading-tight mb-6">{heading}</h1>

                {subheading && <p className="text-copy-light text-lg font-normal leading-tight mb-8">{subheading}</p>}

                {button?.label && button?.link && (
                  <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
