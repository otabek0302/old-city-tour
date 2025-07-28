import AboutUsClient from "./page.client";
import { NotCompleted } from "@/components/ui/not-completed";

async function getSections(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/about-us?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const sections = data.docs || [];
    return sections;
  } catch (error) {
    // Silently return empty array instead of logging error
    return [];
  }
}

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const sections = await getSections(locale || "en");
  if (!sections || !sections.length || !sections[0]?.sections) {
    return <NotCompleted 
      title="About Us Page Not Available"
      message="The about us page content is currently not available. Please contact us for assistance."
    />;
  }
  return <AboutUsClient sections={sections[0].sections} />;
};

export default HomePage;
