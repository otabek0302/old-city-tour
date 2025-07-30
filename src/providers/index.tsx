import React from "react";

import type { Locale } from "@/utilities/i18n/config";
import { ThemeProvider } from "./theme";
import { LanguageProvider } from "./language";
import { I18nProvider } from "./i18n";
import { LoadingProvider } from "./loading";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { InitialLoading } from "@/components/ui/initial-loading";

export const Providers: React.FC<{ children: React.ReactNode; lang: Locale }> = ({ children, lang }) => {
  return (
    <LoadingProvider>
      <I18nProvider locale={lang}>
        <LanguageProvider lang={lang}>
          <ThemeProvider>
            <InitialLoading />
            {children}
            <LoadingOverlay />
          </ThemeProvider>
        </LanguageProvider>
      </I18nProvider>
    </LoadingProvider>
  );
};
