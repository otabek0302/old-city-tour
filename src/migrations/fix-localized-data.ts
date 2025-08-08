import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { getPayload, Payload } from 'payload'
import config from '../payload.config'

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
    const val = obj[key]
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

const migrateCollection = async (payload: Payload, collectionSlug: 'cities' | 'tours') => {
  const docs = await payload.find({
    collection: collectionSlug,
    limit: 9999,
    depth: 0,
  })

  for (const doc of docs.docs) {
    let patched = false
    const patch: any = {}

    for (const locale of locales) {
      const fieldsToClean = ['name', 'description', 'link', 'title', 'duration']
      for (const field of fieldsToClean) {
        const fieldValue = (doc as any)[field]
        if (fieldValue && typeof fieldValue === 'object') {
          const cleaned = cleanObject(fieldValue, locale)
          if (cleaned !== fieldValue) {
            patch[field] = cleaned
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

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  console.log('🔧 Fixing localized data...')
  
  if (!payload) {
    const payloadInstance = await getPayload({ config })
    await migrateCollection(payloadInstance, 'cities')
    await migrateCollection(payloadInstance, 'tours')
    await payloadInstance.destroy()
  } else {
    await migrateCollection(payload, 'cities')
    await migrateCollection(payload, 'tours')
  }
  
  console.log('✅ Localized data fixed successfully!')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  console.log('🔄 Reverting localized data changes...')
  // This migration is not reversible as it cleans up data
  console.log('⚠️ This migration cannot be reverted')
}