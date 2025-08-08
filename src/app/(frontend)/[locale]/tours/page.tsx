import { Metadata } from 'next'
import PageClient from "./page.client";
import { generateMeta } from '@/utilities/generateMeta'


async function getTours(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/tours?locale=${locale}&limit=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const tours = data.docs || [];
    
    // Clean the localized data for each tour
    return tours.map((tour: any) => tour);
  } catch (error) {
    // Silently return empty array instead of logging error
    return [];
  }
}

async function getTourTypes(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/types?locale=${locale}&limit=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const types = data.docs || [];
    
    // Clean the localized data for each type
    return types.map((type: any) => type);
  } catch (error) {
    // Silently return empty array instead of logging error
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return generateMeta({
    doc: null,
    collection: 'tours'
  });
}

const ToursPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const tours = await getTours(locale || "en");
  const tourTypes = await getTourTypes(locale || "en");

  return <PageClient tours={tours} tourTypes={tourTypes} _locale={locale} />;
};

export default ToursPage;
