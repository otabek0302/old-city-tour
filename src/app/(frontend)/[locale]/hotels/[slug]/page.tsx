import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMeta } from "@/utilities/generateMeta";
import SingleHotelPageClient from "./page.client";

async function getHotel(slug: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/hotels?where[slug][equals]=${slug}&locale=${locale}&populate=city,images,features`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const hotel = await getHotel(slug, locale);

  return generateMeta({
    doc: hotel,
    collection: "hotels",
  });
}

const HotelPage = async ({ params }: { params: Promise<{ slug: string; locale: string }> }) => {
  const { slug, locale } = await params;
  const hotel = await getHotel(slug, locale);

  if (!hotel) {
    notFound();
  }

  return <SingleHotelPageClient hotel={hotel} />;
};

export default HotelPage;
