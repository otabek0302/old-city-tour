import AboutUsClient from "./page.client";
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'

async function getSections(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/globals/about-us?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const aboutUs = await getSections(locale);
  
  return generateMeta({
    doc: aboutUs,
    global: 'about-us',
  })
}

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const aboutUs = await getSections(locale || "en");
  
  if (!aboutUs || !aboutUs.sections) {
    return null;
  }
  return <AboutUsClient sections={aboutUs.sections} />;
};

export default HomePage;
