"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "@/app/(frontend)/[locale]/globals.css";

const translations = {
  en: {
    pageNotFound: "Page Not Found",
    sorryMessage: "Sorry, the page you are looking for doesn't exist or has been moved.",
    goToHomepage: "Go to Homepage",
    contactSupport: "Contact Support",
    youCanAlsoTry: "You can also try:",
    browseTours: "Browse Tours",
    exploreCities: "Explore Cities",
    aboutUs: "About Us",
    chooseLanguage: "Choose your language:",
  },
  ru: {
    pageNotFound: "Страница не найдена",
    sorryMessage: "Извините, страница, которую вы ищете, не существует или была перемещена.",
    goToHomepage: "Перейти на главную",
    contactSupport: "Связаться с поддержкой",
    youCanAlsoTry: "Вы также можете попробовать:",
    browseTours: "Просмотреть туры",
    exploreCities: "Исследовать города",
    aboutUs: "О нас",
    chooseLanguage: "Выберите язык:",
  },
  uz: {
    pageNotFound: "Sahifa topilmadi",
    sorryMessage: "Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.",
    goToHomepage: "Bosh sahifaga o'tish",
    contactSupport: "Qo'llab-quvvatlash bilan bog'lanish",
    youCanAlsoTry: "Siz ham sinab ko'rishingiz mumkin:",
    browseTours: "Turlarni ko'rish",
    exploreCities: "Shaharlarni kashf etish",
    aboutUs: "Biz haqida",
    chooseLanguage: "Tilingizni tanlang:",
  },
};

export default function NotFound() {
  const pathname = usePathname();

  // Extract locale from pathname (e.g., /en/some-page -> en)
  const pathSegments = pathname.split("/").filter(Boolean);
  const detectedLocale = pathSegments[0] as "en" | "ru" | "uz";

  // Use detected locale or fallback to English
  const locale = translations[detectedLocale] ? detectedLocale : "en";
  const t = translations[locale];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-copy mb-4">{t.pageNotFound}</h2>
          <p className="text-copy-light text-lg mb-8">{t.sorryMessage}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}`} className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-dark transition-colors">
            {t.goToHomepage}
          </Link>
          <Link href={`/${locale}/contact-us`} className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background text-copy rounded-xl font-medium hover:bg-muted transition-colors">
            {t.contactSupport}
          </Link>
        </div>

        <div className="mt-12 text-copy-light text-sm">
          <p>{t.youCanAlsoTry}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link href={`/${locale}/tours`} className="hover:text-primary transition-colors">
              {t.browseTours}
            </Link>
            <Link href={`/${locale}/cities`} className="hover:text-primary transition-colors">
              {t.exploreCities}
            </Link>
            <Link href={`/${locale}/about-us`} className="hover:text-primary transition-colors">
              {t.aboutUs}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-copy-light text-sm mb-4">{t.chooseLanguage}</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => (window.location.href = "/en")} className={`text-sm px-3 py-1 rounded-lg transition-colors ${locale === "en" ? "bg-primary text-primary-foreground" : "text-primary hover:text-primary-dark hover:bg-muted"}`}>
              English
            </button>
            <button onClick={() => (window.location.href = "/ru")} className={`text-sm px-3 py-1 rounded-lg transition-colors ${locale === "ru" ? "bg-primary text-primary-foreground" : "text-primary hover:text-primary-dark hover:bg-muted"}`}>
              Русский
            </button>
            <button onClick={() => (window.location.href = "/uz")} className={`text-sm px-3 py-1 rounded-lg transition-colors ${locale === "uz" ? "bg-primary text-primary-foreground" : "text-primary hover:text-primary-dark hover:bg-muted"}`}>
              O&apos;zbekcha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
