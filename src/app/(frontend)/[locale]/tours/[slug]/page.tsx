import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SingleTourPageClient from "./page.client";
import { generateMeta } from '@/utilities/generateMeta'


async function getTour(slug: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    // Search for tour by slug with locale parameter for localized data
    const res = await fetch(`${baseUrl}/api/tours?where[slug][equals]=${encodeURIComponent(slug)}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const tour = data.docs?.[0] || null;
    
    // Clean the localized data to prevent double-encoded JSON strings
    if (tour) {
      return tour;
    }
    
    return tour;
  } catch (error) {
    // Silently return null instead of logging error
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const tour = await getTour(slug, locale || "en");
  
  return generateMeta({
    doc: tour,
    collection: 'tours'
  });
}

const SingleTourPage = async ({ params }: { params: Promise<{ slug: string; locale: string }> }) => {
  const { slug, locale } = await params;
  const tour = await getTour(slug, locale || "en");
  
  if (!tour) {
    notFound();
  }
  
  return <SingleTourPageClient tour={tour} />;
};

export default SingleTourPage; 