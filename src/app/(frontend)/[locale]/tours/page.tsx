import PageClient from "./page.client";

async function getTours(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/tours?locale=${locale}&limit=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

async function getTourTypes(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/types?locale=${locale}&limit=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching tour types:", error);
    return [];
  }
}

const ToursPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const tours = await getTours(locale || "en");
  const tourTypes = await getTourTypes(locale || "en");

  return <PageClient tours={tours} tourTypes={tourTypes} _locale={locale} />;
};

export default ToursPage;
