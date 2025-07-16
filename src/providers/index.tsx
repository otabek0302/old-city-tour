import React from "react";

import type { Locale } from "@/utilities/i18n/config";
import { ThemeProvider } from "./theme";
import { LanguageProvider } from "./language";

export const Providers: React.FC<{ children: React.ReactNode; lang: Locale }> = ({ children, lang }) => {
  return (
    <LanguageProvider lang={lang}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
};
