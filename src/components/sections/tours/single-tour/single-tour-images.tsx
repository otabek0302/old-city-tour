import Image from "next/image";

import { useEffect, useState } from "react";

interface Media {
  url?: string;
  alt?: string;
}

interface ImageItem {
  image: Media;
  id?: string | null;
}

interface SingleTourImagesProps {
  images?: ImageItem[];
}

const SingleTourImages = ({ images = [] }: SingleTourImagesProps) => {
  const [mainIdx, setMainIdx] = useState(0);
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    setMainImage(images[mainIdx]);
  }, [mainIdx]);
  
  if (!images.length) return <div className="w-full h-[520px] bg-muted rounded-xl border border-border" />;

  return (
    <div className="mb-6">
      <div className="relative w-full h-[520px] mb-2 border border-border rounded-xl overflow-hidden">
        <Image src={mainImage.image.url as string} fill priority alt={typeof mainImage.image === "object" && mainImage.image.alt ? mainImage.image.alt : "Tour image"} className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setMainImage(images[0])} />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img: ImageItem, idx: number) => (
          <button key={img.id || idx} onClick={() => setMainIdx(idx)} className={`relative h-32 w-52 border-2 rounded-xl overflow-hidden flex items-center justify-center transition-all ${mainIdx === idx ? "border-primary" : "border-border"}`} type="button">
            <Image src={img.image.url as string} fill priority alt={typeof img.image === "object" && img.image.alt ? img.image.alt : `Thumbnail ${idx + 1}`} className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SingleTourImages;
