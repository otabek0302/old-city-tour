import type { ReactNode } from "react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Old City",
  description: "A simple Payload CMS website",
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale} className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers lang={locale as Locale}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
