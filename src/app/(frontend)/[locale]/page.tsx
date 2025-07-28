import HomePageClient from "./page.client";

import { NotCompleted } from "@/components/ui/not-completed";

const getSections = async (locale: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/home?locale=${locale}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (_error) {
    return null
  }
}

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const homeData = await getSections(locale || "en");

  if (!homeData) {
    if (locale !== "en") {
      const fallbackData = await getSections("en");
      if (fallbackData?.sections) {
        return <HomePageClient sections={fallbackData.sections} />;
      }
    }

    return <NotCompleted title="Home Page Not Available" message="The home page content is currently not available. Please contact us for assistance." />;
  }

  if (!homeData.sections || homeData.sections.length === 0) {
    return <NotCompleted title="No Content Available" message="The home page has no content sections. Please add content through the admin panel." />;
  }

  return <HomePageClient sections={homeData.sections} />;
};

export default HomePage;
