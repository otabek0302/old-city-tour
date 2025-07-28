import TermsPageClient from "./page.client";
import { NotCompleted } from "@/components/ui/not-completed";
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'

async function getTerms(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/globals/terms?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const terms = await getTerms(locale);
  
  return generateMeta({
    doc: terms,
    global: 'terms',
  })
}

const TermsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const terms = await getTerms(locale || "en");

  if (!terms) return <NotCompleted
    title="Terms Not Available"
    message="The terms and conditions content is currently not available. Please contact us for assistance."
  />;

  return <TermsPageClient _locale={locale} />;
};

export default TermsPage; 