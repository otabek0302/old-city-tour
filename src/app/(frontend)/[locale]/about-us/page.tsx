import AboutUsClient from "./page.client";

async function getAboutUsContent(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/pages?where[slug][equals]=about-us&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching about us content:", error);
    return null;
  }
}

const AboutUsPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params; // FIXED: removed await
  const content = await getAboutUsContent(locale || "en");
  
  return <AboutUsClient content={content} locale={locale} />;
};

export default AboutUsPage;

// Optional: add this if you want static generation
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'uz' }];
}
