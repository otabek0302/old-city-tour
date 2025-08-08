import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value, originalDoc }) => {
    // If there's already a manually entered value, keep it
    if (typeof value === 'string' && value.trim() !== '') {
      return formatSlug(value)
    }

    // Only auto-generate on create or if no slug exists
    if (operation === 'create' || !originalDoc?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    // If updating and slug is locked or manually entered, keep existing value
    if (operation === 'update' && originalDoc?.slug) {
      return originalDoc.slug
    }

    return value
  }
