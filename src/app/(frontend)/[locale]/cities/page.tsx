import { Metadata } from 'next'
import PageClient from "./page.client";
import { generateMeta } from '@/utilities/generateMeta'
import { cleanLocalizedData } from '@/utilities/cleanLocalizedData'

async function getCities(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cities?locale=${locale}&limit=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const cities = data.docs || [];
    
    // Clean the localized data for each city
    return cities.map((city: any) => cleanLocalizedData(city, locale));
  } catch (error) {
    // Silently return empty array instead of logging error
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return generateMeta({
    doc: null,
    collection: 'cities'
  });
}

const CitiesPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const cities = await getCities(locale || "en");

  return <PageClient cities={cities} _locale={locale} />;
};

export default CitiesPage;
