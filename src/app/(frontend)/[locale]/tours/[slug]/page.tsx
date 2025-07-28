import { Metadata } from 'next'
import SingleTourPageClient from "./page.client";
import { generateMeta } from '@/utilities/generateMeta'
import { NotCompleted } from "@/components/ui/not-completed";

async function getTour(slug: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/tours?where[slug][equals]=${encodeURIComponent(slug)}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
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
  if (!tour) return <NotCompleted 
    title="Tour Not Found"
    message="The requested tour could not be found. Please check the URL or contact us for assistance."
  />;
  return <SingleTourPageClient tour={tour} />;
};

export default SingleTourPage; 