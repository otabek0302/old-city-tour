"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useTransition } from "react";
import { defaultLocale, locales, type Locale } from "@/utilities/i18n/config";

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLocale,
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children, lang }: { children: React.ReactNode; lang: Locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const setLanguage = useCallback(
    (newLang: Locale) => {
      const segments = pathname.split("/");
      if (!locales.includes(segments[1] as Locale)) return;
      segments[1] = newLang;
      const newPath = segments.join("/") || "/";
      startTransition(() => {
        router.push(newPath);
      });
    },
    [pathname, router]
  );

  return <LanguageContext.Provider value={{ language: lang, setLanguage }}>{children}</LanguageContext.Provider>;
};
