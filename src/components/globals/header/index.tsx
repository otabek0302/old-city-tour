import HeaderClient from "./header.client";

interface Navigation {
  label: string;
  url: string;
  isExternal: boolean;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigations = Array.isArray(data.navigations) ? data.navigations.map((nav: any) => ({ label: nav.label, url: nav.url, isExternal: !!nav.isExternal })) : [];
    return { logo, navigations };
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
}

const Header = async ({ locale }: { locale: string }) => {
  const headerData = await getHeaderData(locale);
  if (!headerData) return null;
  return <HeaderClient data={headerData} />;
};

export default Header;
