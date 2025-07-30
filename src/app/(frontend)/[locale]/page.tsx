import HomePageClient from "./page.client";

import { cleanLocalizedData } from "@/utilities/cleanLocalizedData";

const getSections = async (locale: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/home?locale=${locale}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    const home = data.docs?.[0] || null;

    // Clean the localized data to prevent double-encoded JSON strings
    if (home) {
      return cleanLocalizedData(home, locale);
    }

    return home;
  } catch (_error) {
    return null;
  }
};

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

    return null;
  }

  if (!homeData.sections || homeData.sections.length === 0) return null;

  return <HomePageClient sections={homeData.sections} />;
};

export default HomePage;
