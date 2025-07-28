import HomePageClient from "./page.client";

import { NotCompleted } from "@/components/ui/not-completed";

async function getSections(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/home?locale=${locale}`, { cache: "no-store" });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const sections = data.docs || [];
    return sections;
  } catch (error) {
    return [];
  }
}

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const sections = await getSections(locale || "en");

  if (!sections || sections.length === 0) {
    if (locale !== "en") {
      const fallbackSections = await getSections("en");
      if (fallbackSections && fallbackSections.length > 0 && fallbackSections[0]?.sections) {
        return <HomePageClient sections={fallbackSections[0].sections} />;
      }
    }

    return <NotCompleted title="Home Page Not Available" message="The home page content is currently not available. Please contact us for assistance." />;
  }

  const firstSection = sections[0];
  if (!firstSection?.sections) {
    return <NotCompleted title="Content Structure Error" message="The content structure is not properly configured. Please contact us to fix this issue." />;
  }

  return <HomePageClient sections={firstSection.sections} />;
};

export default HomePage;
