import FooterClient from "./footer.client";
import { getImageURL } from "../../../utilities/getURL";

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

// Function to fix broken social media links
const fixSocialLinks = (socialLinks: any[]): SocialLink[] => {
  return socialLinks.map((link: any) => {
    let fixedLink = link.link;
    
    // Fix specific broken links
    if (link.icon === "telegram" && (link.link === "/" || !link.link.startsWith("http"))) {
      fixedLink = "https://t.me/oldcitytour_samarkand";
    } else if (link.icon === "facebook" && link.link.includes("instagram.com")) {
      fixedLink = "https://www.facebook.com/oldcitytour.samarkand";
    } else if (link.icon === "instagram" && !link.link.startsWith("http")) {
      fixedLink = "https://www.instagram.com/oldcitytour_samarkand";
    }
    
    return {
      title: link.title,
      link: fixedLink,
      icon: link.icon
    };
  });
};

async function getFooterData(locale: string): Promise<FooterData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   process.env.NEXT_PUBLIC_SERVER_URL || 
                   "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/globals/footer?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const socialLinks = Array.isArray(data.socialLinks) ? fixSocialLinks(data.socialLinks) : [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigationLinks = Array.isArray(data.navigationLinks) ? data.navigationLinks.map((link: any) => ({ 
      label: link.label, 
      url: link.url 
    })) : [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const licenceLinks = Array.isArray(data.licenceLinks) ? data.licenceLinks.map((link: any) => ({ 
      label: link.label, 
      url: link.url 
    })) : [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contactLinks = Array.isArray(data.contactLinks) ? data.contactLinks.map((link: any) => ({ 
      type: link.type, 
      value: link.value, 
      icon: link.icon 
    })) : [];
    
    const logo = typeof data.logo === "object" && data.logo !== null ? { 
      url: getImageURL(data.logo.url), 
      alt: data.logo.alt || "Logo" 
    } : { url: "", alt: "Logo" };
    
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
