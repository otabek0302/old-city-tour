import FooterClient from "./footer.client";

interface SocialLink {
  title: string;
  link: string;
  icon: string;
}

interface NavigationLink {
  label: string;
  url: string;
}

interface ContactLink {
  type: "phone" | "email" | "address";
  value: string;
  icon?: string;
}

interface FooterData {
  socialLinks: SocialLink[];
  navigationLinks: NavigationLink[];
  licenceLinks: NavigationLink[];
  contactLinks: ContactLink[];
  copyright: string;
  logo: {
    url: string;
    alt?: string;
  };
  description: string;
}

async function getFooterData(locale: string): Promise<FooterData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/globals/footer?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const socialLinks = Array.isArray(data.socialLinks) ? data.socialLinks.map((link: any) => ({ title: link.title, link: link.link, icon: link.icon })) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigationLinks = Array.isArray(data.navigationLinks) ? data.navigationLinks.map((link: any) => ({ label: link.label, url: link.url })) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const licenceLinks = Array.isArray(data.licenceLinks) ? data.licenceLinks.map((link: any) => ({ label: link.label, url: link.url })) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contactLinks = Array.isArray(data.contactLinks) ? data.contactLinks.map((link: any) => ({ type: link.type, value: link.value, icon: { url: link.icon.url, alt: link.icon.alt || "Icon" } })) : [];
    const logo = typeof data.logo === "object" && data.logo !== null ? { url: data.logo.url, alt: data.logo.alt || "Logo" } : { url: "", alt: "Logo" };
    const description = data.description;
    const copyright = data.copyright;
    return { socialLinks, navigationLinks, licenceLinks, contactLinks, logo, description, copyright };
  } catch {
    return null;
  }
}

const Footer = async ({ locale }: { locale: string }) => {
  const footerData = await getFooterData(locale);
  if (!footerData) return null;
  return <FooterClient data={footerData} />;
};

export default Footer;
