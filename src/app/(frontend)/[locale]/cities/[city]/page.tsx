import { Metadata } from 'next'
import CityPage from "./page.client";
import { generateMeta } from '@/utilities/generateMeta'
import { NotCompleted } from "@/components/ui/not-completed";

async function getCity(cityName: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cities?where[slug][equals]=${encodeURIComponent(cityName)}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    // Silently return null instead of logging error
    return null;
  }
}

async function getTours(cityId: number, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/tours?where[cities][in]=${cityId}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    // Silently return empty array instead of logging error
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

  if (!city) return <NotCompleted 
    title="City Not Found"
    message="The requested city could not be found. Please check the URL or contact us for assistance."
  />;
  return <CityPage city={city} tours={tours} />;
}
