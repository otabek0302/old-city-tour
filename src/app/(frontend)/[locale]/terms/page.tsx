import PageClient from "./page.client";

const TermsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return <PageClient _locale={locale} />;
};

export default TermsPage; 