import { locales } from '@/config/locales'

export const isLocalized = <T>(value: any): value is Record<string, T> =>
  typeof value === 'object' && !Array.isArray(value) && Object.keys(value).some(k => locales.includes(k as any)) 