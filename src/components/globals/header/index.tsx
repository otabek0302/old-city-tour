import HeaderClient from "./header.client";

interface Navigation {
  label: string;
  url: string;
}

interface HeaderData {
  logo: {
    url: string;
    alt?: string;
  };
  navigations: Navigation[];
}

async function getHeaderData(locale: string): Promise<HeaderData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/globals/header?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const logo = typeof data.logo === "object" && data.logo !== null ? { url: data.logo.url, alt: data.logo.alt || "Logo" } : { url: "", alt: "Logo" };
    const navigations = Array.isArray(data.navigations) ? data.navigations.map((nav: { label: string; url: string }) => ({ label: nav.label, url: nav.url })) : [];
    return { logo, navigations };
  } catch (error) {
    return null;
  }
}

const Header = async ({ locale }: { locale: string }) => {
  const data = await getHeaderData(locale);
  return data ? <HeaderClient data={data} /> : null;
};

export default Header;
