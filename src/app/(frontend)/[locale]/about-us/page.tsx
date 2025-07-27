import AboutUsClient from "./page.client";

async function getSections(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/about-us?locale=${locale}`, { cache: "no-store" });
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
  if (!sections || !sections.length || !sections[0]?.sections) {
    return <p>Translation or content missing for this locale.</p>;
  }
  return <AboutUsClient sections={sections[0].sections} />;
};

export default HomePage;
