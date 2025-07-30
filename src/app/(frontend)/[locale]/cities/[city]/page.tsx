import { Metadata } from 'next'

import CityPage from "./page.client";

import { generateMeta } from '@/utilities/generateMeta'
import { cleanLocalizedData } from '@/utilities/cleanLocalizedData'

const getCity = async (slug: string, locale: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cities?where[slug][equals]=${slug}&locale=${locale}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    const city = data.docs?.[0] || null
    
    // Clean the localized data to prevent double-encoded JSON strings
    if (city) {
      return cleanLocalizedData(city, locale);
    }
    
    return city;
  } catch (error) {
    return null
  }
}

async function getTours(cityId: number, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/tours?where[cities][in]=${cityId}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const tours = data.docs || [];
    
    return tours.map((tour: any) => cleanLocalizedData(tour, locale));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; locale: string }> }): Promise<Metadata> {
  const { city: citySlug, locale } = await params;
  const city = await getCity(citySlug, locale);
  
  return generateMeta({
    doc: city,
    collection: 'cities'
  });
}

export default async function Page({ params }: { params: Promise<{ city: string; locale: string }> }) {
  const { city: citySlug, locale } = await params;
  const city = await getCity(citySlug, locale);
  const tours = await getTours(city?.id, locale);

  if (!city) return null;
  return <CityPage city={city} tours={tours} />;
}
