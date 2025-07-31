import type { ReactNode } from "react";
import type { Locale } from "@/utilities/i18n/config";

import "./globals.css";

import { cn } from "@/utilities/ui";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/providers";

import Header from "@/components/globals/header";
import Footer from "@/components/globals/footer";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <div className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <Providers lang={locale as Locale}>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </Providers>
    </div>
  );
}
