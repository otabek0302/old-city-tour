import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';

export type Locale = 'en' | 'ru' | 'uz';

export const locales: Record<Locale, any> = {
  en,
  ru,
  uz,
};

export const defaultLocale: Locale = 'en';

export const supportedLocales: Locale[] = ['en', 'ru', 'uz'];

export function getTranslation(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path;
  }, obj);
}

export function t(locale: Locale, key: string, params?: Record<string, string | number>): string {
  const translation = getTranslation(locales[locale], key);

  if (params) {
    return Object.entries(params).reduce((result, [key, value]) => {
      return result.replace(new RegExp(`{${key}}`, 'g'), String(value));
    }, translation);
  }

  return translation;
}

export function getTranslations(key: string): Record<Locale, string> {
  return supportedLocales.reduce((acc, locale) => {
    acc[locale] = t(locale, key);
    return acc;
  }, {} as Record<Locale, string>);
}

export function isValidLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export function getFallbackLocale(locale: string): Locale {
  return isValidLocale(locale) ? (locale as Locale) : defaultLocale;
} 