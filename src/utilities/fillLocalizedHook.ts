import { locales, defaultLocale } from '@/config/locales'
import { isLocalized } from './isLocalized'

function fillMissingLocales<T extends object>(field: any, defaultLocale = 'en'): Record<string, T> {
  return locales.reduce((acc, locale) => {
    acc[locale] = field?.[locale] ?? field?.[defaultLocale] ?? {};
    return acc;
  }, {} as Record<string, T>);
}

function getAvailableLocale<T>(field: Record<string, T>): typeof locales[number] {
  return locales.find(locale => field[locale]) || defaultLocale;
}

// Helper function to get nested value by path
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Helper function to set nested value by path
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

export const fillLocalizedHook = <T extends object>(fields: string[]) => {
  return (args: { data?: Partial<T> }) => {
    if (!args.data) return args.data;

    for (const fieldPath of fields) {
      const value = getNestedValue(args.data, fieldPath);
      
      if (value && !isLocalized(value)) {
        const availableLocale = getAvailableLocale(value ?? {});
        const localizedValue = fillMissingLocales(
          Array.isArray(value) ? { [availableLocale]: value } : value,
          availableLocale
        );
        
        setNestedValue(args.data, fieldPath, localizedValue);
      }
    }

    return args.data;
  }
} 