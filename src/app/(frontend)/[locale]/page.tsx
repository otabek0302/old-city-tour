import PageClient from "./page.client";

async function getSections(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/pages?where[slug][equals]=home&locale=${locale}`, { cache: "no-store" });
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
  if (!sections) return null;
  return <PageClient sections={sections[0].sections} />
};

export default HomePage;
