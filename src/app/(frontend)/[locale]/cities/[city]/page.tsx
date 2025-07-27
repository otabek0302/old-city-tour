import CityPage from "./page.client";

async function getCity(cityName: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cities?where[slug][equals]=${encodeURIComponent(cityName)}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs?.[0] || [];
  } catch (error) {
    console.error("Error fetching city:", error);
    return [];
  }
}

async function getTours(cityId: number, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/tours?where[cities][in]=${cityId}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export default async function Page({ params }: { params: Promise<{ city: string; locale: string }> }) {
  const { city: citySlug, locale } = await params;
  const city = await getCity(citySlug, locale);
  const tours = await getTours(city.id, locale);

  return <CityPage city={city} tours={tours} />;
}
