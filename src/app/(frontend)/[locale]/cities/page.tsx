import PageClient from "./page.client";

async function getCities(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cities?locale=${locale}&limit=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

const CitiesPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const cities = await getCities(locale || "en");

  return <PageClient cities={cities} _locale={locale} />;
};

export default CitiesPage;
