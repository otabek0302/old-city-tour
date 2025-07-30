import { Metadata } from "next";

import { generateMeta } from "@/utilities/generateMeta";

import PrivacyPolicyPageClient from "./page.client";

async function getPrivacyPolicy(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/globals/privacy-policy?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const privacyPolicy = await getPrivacyPolicy(locale);

  return generateMeta({
    doc: privacyPolicy,
    global: "privacy-policy",
  });
}

const PrivacyPolicyPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const privacyPolicy = await getPrivacyPolicy(locale || "en");

  if (!privacyPolicy) return null;

  return <PrivacyPolicyPageClient _locale={locale} privacyPolicy={privacyPolicy} />;
};

export default PrivacyPolicyPage;
