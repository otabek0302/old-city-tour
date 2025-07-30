"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useTransition, useEffect } from "react";
import { defaultLocale, locales, type Locale } from "@/utilities/i18n/config";
import { useLoading } from "@/providers/loading";

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  isChangingLanguage: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLocale,
  setLanguage: () => {},
  isChangingLanguage: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children, lang }: { children: React.ReactNode; lang: Locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { startLoading, stopLoading } = useLoading();

  const setLanguage = useCallback(
    (newLang: Locale) => {
      const segments = pathname.split("/");
      if (!locales.includes(segments[1] as Locale)) return;
      
      // Start loading for language switch
      startLoading("Switching language...");
      
      segments[1] = newLang;
      const newPath = segments.join("/") || "/";
      
      startTransition(() => {
        router.push(newPath);
      });
    },
    [pathname, router, startLoading]
  );

  // Stop loading when transition is complete
  useEffect(() => {
    if (!isPending) {
      // Add a small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        stopLoading();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isPending, stopLoading]);

  return (
    <LanguageContext.Provider value={{ 
      language: lang, 
      setLanguage, 
      isChangingLanguage: isPending 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
