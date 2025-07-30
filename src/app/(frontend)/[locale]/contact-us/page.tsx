import { Metadata } from 'next'
import ContactUsPageClient from "./page.client";
import { generateMeta } from '@/utilities/generateMeta'

async function getContactUs(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/globals/contact-us?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const contactUs = await getContactUs(locale);
  
  return generateMeta({
    doc: contactUs,
    global: 'contact-us',
  })
}

const ContactUsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const contactUs = await getContactUs(locale || "en");

  if (!contactUs) return null;

  return <ContactUsPageClient heading={contactUs?.title} subheading={contactUs?.heading} form_info={contactUs?.form_info} contact_info={contactUs?.contact_info} />;
};

export default ContactUsPage;
