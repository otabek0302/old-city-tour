import HomePageClient from "./page.client";

async function getSections(locale: string) {
  try {
    // Use the correct environment variable or fallback
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   process.env.NEXT_PUBLIC_SERVER_URL || 
                   "http://localhost:3000";
    
    console.log("Debug - Base URL:", baseUrl);
    console.log("Debug - Locale:", locale);
    
    const res = await fetch(`${baseUrl}/api/home?locale=${locale}`, { cache: "no-store" });
    console.log("Debug - Response status:", res.status);
    
    if (!res.ok) {
      console.log("Debug - Response not ok:", res.statusText);
      return [];
    }
    
    const data = await res.json();
    console.log("Debug - API Response data:", JSON.stringify(data, null, 2));
    
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
  
  console.log("Debug - Locale:", locale);
  console.log("Debug - Sections:", sections);
  console.log("Debug - Sections length:", sections?.length);
  console.log("Debug - First section:", sections?.[0]);
  console.log("Debug - First section sections:", sections?.[0]?.sections);
  
  // Check if we have valid sections data
  if (!sections || sections.length === 0) {
    // Try fallback to English
    if (locale !== "en") {
      console.log("Debug - Trying English fallback");
      const fallbackSections = await getSections("en");
      if (fallbackSections && fallbackSections.length > 0 && fallbackSections[0]?.sections) {
        console.log("Debug - Using English fallback");
        return <HomePageClient sections={fallbackSections[0].sections} />;
      }
    }
    
    console.log("Debug - No content available");
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
    console.log("Debug - First section has no sections property");
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
  
  console.log("Debug - Rendering with sections:", firstSection.sections);
  return <HomePageClient sections={firstSection.sections} />
};

export default HomePage;
