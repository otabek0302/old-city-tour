import payload from 'payload'

const locales = ['uz', 'ru', 'en']

const cleanField = (value: any, locale: string): any => {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    try {
      const parsed = JSON.parse(value)
      if (parsed && parsed[locale]) return parsed[locale]
    } catch {}
  }
  return value
}

const cleanObject = (obj: any, locale: string): any => {
  if (obj == null || typeof obj !== 'object') return obj
  const cleaned: any = {}
  for (const key of Object.keys(obj)) {
    const val = (obj as any)[key]
    if (typeof val === 'string') {
      cleaned[key] = cleanField(val, locale)
    } else if (Array.isArray(val)) {
      cleaned[key] = val.map((item) => cleanObject(item, locale))
    } else {
      cleaned[key] = cleanObject(val, locale)
    }
  }
  return cleaned
}

const migrateCollection = async (collectionSlug: 'cities' | 'tours') => {
  const docs = await payload.find({
    collection: collectionSlug,
    limit: 9999,
    depth: 0,
  })
  for (const doc of docs.docs) {
    let patched = false
    const patch: any = {}
    
    // Handle cities collection
    if (collectionSlug === 'cities') {
      const cityDoc = doc as any
      for (const locale of locales) {
        if (cityDoc.name && typeof cityDoc.name === 'object') {
          const cleanedName = cleanObject(cityDoc.name, locale)
          if (cleanedName !== cityDoc.name) {
            patch.name = cleanedName
            patched = true
          }
        }
        if (cityDoc.description && typeof cityDoc.description === 'object') {
          const cleaned = cleanObject(cityDoc.description, locale)
          if (cleaned !== cityDoc.description) {
            patch.description = cleaned
            patched = true
          }
        }
        if (cityDoc.link && typeof cityDoc.link === 'object') {
          const cleaned = cleanObject(cityDoc.link, locale)
          if (cleaned !== cityDoc.link) {
            patch.link = cleaned
            patched = true
          }
        }
      }
    }
    
    // Handle tours collection
    if (collectionSlug === 'tours') {
      const tourDoc = doc as any
      for (const locale of locales) {
        if (tourDoc.title && typeof tourDoc.title === 'object') {
          const cleaned = cleanObject(tourDoc.title, locale)
          if (cleaned !== tourDoc.title) {
            patch.title = cleaned
            patched = true
          }
        }
        if (tourDoc.description && typeof tourDoc.description === 'object') {
          const cleaned = cleanObject(tourDoc.description, locale)
          if (cleaned !== tourDoc.description) {
            patch.description = cleaned
            patched = true
          }
        }
        if (tourDoc.duration && typeof tourDoc.duration === 'object') {
          const cleaned = cleanObject(tourDoc.duration, locale)
          if (cleaned !== tourDoc.duration) {
            patch.duration = cleaned
            patched = true
          }
        }
      }
    }
    
    if (patched) {
      await payload.update({
        collection: collectionSlug,
        id: doc.id,
        data: patch,
      })
      console.log(`Fixed ${collectionSlug} doc ${doc.id}`)
    }
  }
}

export const handler = async () => {
  await payload.init({
    local: true,
  })

  await migrateCollection('cities')
  await migrateCollection('tours')
  // Add others as needed

  await payload.destroy()
}

// Run the migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  handler()
    .then(() => {
      console.log('Migration completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Migration failed:', error)
      process.exit(1)
    })
}