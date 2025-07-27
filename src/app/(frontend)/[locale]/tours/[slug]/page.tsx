import SingleTourPageClient from "./page.client";

async function getTour(slug: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/tours?where[slug][equals]=${encodeURIComponent(slug)}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

const SingleTourPage = async ({ params }: { params: Promise<{ slug: string; locale: string }> }) => {
  const { slug, locale } = await params;
  const tour = await getTour(slug, locale || "en");
  if (!tour) return <div>Tour not found</div>;
  return <SingleTourPageClient tour={tour} />;
};

export default SingleTourPage; 