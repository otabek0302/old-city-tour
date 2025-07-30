import React from "react";

import type { Locale } from "@/utilities/i18n/config";
import { ThemeProvider } from "./theme";
import { LanguageProvider } from "./language";
import { I18nProvider } from "./i18n";

export const Providers: React.FC<{ children: React.ReactNode; lang: Locale }> = ({ children, lang }) => {
  return (
    <LanguageProvider lang={lang}>
      <ThemeProvider>
        <I18nProvider locale={lang}>
          {children}
        </I18nProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
