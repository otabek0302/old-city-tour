import ContactUsPageClient from "./page.client";
import { NotCompleted } from "@/components/ui/not-completed";

async function getContactUs(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/contact-us?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    // Silently return empty array instead of logging error
    return [];
  }
}

const ContactUsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const contact_us = await getContactUs(locale || "en");

  const data = Array.isArray(contact_us) ? contact_us[0] : contact_us;

  if (!data) return <NotCompleted 
    title="Contact Us Page Not Available"
    message="The contact us page content is currently not available. Please contact us for assistance."
  />;

  return <ContactUsPageClient heading={data?.title} subheading={data?.heading} form_info={data?.form_info} contact_info={data?.contact_info} />;
};

export default ContactUsPage;
