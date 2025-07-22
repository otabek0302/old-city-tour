import Image from "next/image";

const TourHero = ({ image, heading, subheading }: { image: { url: string; alt: string }; heading: string; subheading: string }) => {
  return (
    <section className="relative -top-8">
      <div className="w-full px-4">
        <div className="relative min-h-[calc(100vh-2vh)] h-[100vh] max-h-[780px] rounded-[28px] overflow-hidden">
          {image?.url && (
            <div className="absolute inset-0 z-0">
              <Image src={image.url} alt={image.alt || "Hero background"} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container flex items-center justify-center">
                <div className="max-w-2xl text-center">
                  <h1 className="text-copy-white text-4xl md:text-5xl font-bold leading-tight">{heading}</h1>
                  <p className="my-4 text-copy-lighter text-lg font-normal leading-tight">{subheading}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourHero;
