import HomePageClient from "./page.client";

async function getSections(locale: string) {
  try {
    // Use the correct environment variable or fallback
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   process.env.NEXT_PUBLIC_SERVER_URL || 
                   "http://localhost:3000";
    
    const res = await fetch(`${baseUrl}/api/home?locale=${locale}`, { cache: "no-store" });
    
    if (!res.ok) {
      return [];
    }
    
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
  
  // Check if we have valid sections data
  if (!sections || sections.length === 0) {
    // Try fallback to English
    if (locale !== "en") {
      const fallbackSections = await getSections("en");
      if (fallbackSections && fallbackSections.length > 0 && fallbackSections[0]?.sections) {
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
  
  // Check if the first section has the sections property
  const firstSection = sections[0];
  if (!firstSection?.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Content Structure Error
          </h1>
          <p className="text-gray-600 mb-4">
            The content structure is not properly configured.
          </p>
          <p className="text-sm text-gray-500">
            Please contact support to fix this issue.
          </p>
        </div>
      </div>
    );
  }
  
  return <HomePageClient sections={firstSection.sections} />
};

export default HomePage;
