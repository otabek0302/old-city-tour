import { cleanLocalizedData } from "@/utilities/cleanLocalizedData";
import HotelsPageClient from "./page.client";

async function getHotels(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/hotels?locale=${locale}&populate[images][populate][image]=true&populate[city]=true`, { 
      cache: "no-store" 
    });
    if (!res.ok) return [];
    const data = await res.json();
    const hotels = data.docs || [];

    // Clean the localized data for each hotel
    return hotels.map((hotel: any) => cleanLocalizedData(hotel, locale));
  } catch (_error) {
    return [];
  }
}

const HotelsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const hotels = await getHotels(locale || "en");

  return <HotelsPageClient hotels={hotels} />;
};

export default HotelsPage;
