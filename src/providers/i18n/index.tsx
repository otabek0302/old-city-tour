"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { t, Locale, getFallbackLocale } from '@/utilities/i18n';

interface I18nContextType {
  locale: Locale;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  locale: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const validLocale = getFallbackLocale(locale) as Locale;
  
  const contextValue: I18nContextType = {
    locale: validLocale,
    t: (key: string, params?: Record<string, string | number>) => t(validLocale, key, params),
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook for getting current locale
export function useLocale(): Locale {
  const { locale } = useI18n();
  return locale;
}

// Hook for translation with current locale
export function useTranslation() {
  const { t } = useI18n();
  return { t };
} 