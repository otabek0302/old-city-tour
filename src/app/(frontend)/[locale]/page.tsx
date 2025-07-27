import HomePageClient from "./page.client";

async function getSections(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/home?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const sections = data.docs || [];
    return sections;
  } catch (error) {
    console.error("Error fetching sections:", error);
    return [];
  }
}

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const sections = await getSections(locale || "en");
  
  // If no content for current locale, try to get English content as fallback
  if (!sections || !sections.length || !sections[0]?.sections) {
    if (locale !== "en") {
      const fallbackSections = await getSections("en");
      if (fallbackSections && fallbackSections.length && fallbackSections[0]?.sections) {
        return <HomePageClient sections={fallbackSections[0].sections} />;
      }
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Content Not Available
          </h1>
          <p className="text-gray-600 mb-4">
            Translation or content missing for this locale ({locale}).
          </p>
          <p className="text-sm text-gray-500">
            Please check back later or contact support.
          </p>
        </div>
      </div>
    );
  }
  
  return <HomePageClient sections={sections[0].sections} />
};

export default HomePage;
