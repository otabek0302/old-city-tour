import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { getPayload, Payload } from 'payload'
import config from '../payload.config'

const locales = ['en', 'ru', 'uz']
const defaultLocale = 'en'

function fillMissingLocales(field: any, defaultLocale = 'en'): Record<string, any> {
  return locales.reduce((acc, locale) => {
    acc[locale] = field?.[locale] ?? field?.[defaultLocale] ?? {};
    return acc;
  }, {} as Record<string, any>);
}

const migrateCollection = async (payload: Payload, collectionSlug: 'tours') => {
  const docs = await payload.find({
    collection: collectionSlug,
    limit: 9999,
    depth: 0,
  })

  for (const doc of docs.docs) {
    let patched = false
    const patch: any = {}

               // Fix services field
           if (doc.services && typeof doc.services === 'object' && !(doc.services as any).en) {
             patch.services = fillMissingLocales(doc.services, defaultLocale)
             patched = true
           }

           // Fix itinerary field
           if (doc.itinerary && Array.isArray(doc.itinerary) && !(doc.itinerary as any).en) {
             patch.itinerary = fillMissingLocales({ en: doc.itinerary }, defaultLocale)
             patched = true
           }

           // Fix booking_pricing field
           if (doc.booking_pricing && Array.isArray(doc.booking_pricing) && !(doc.booking_pricing as any).en) {
             patch.booking_pricing = fillMissingLocales({ en: doc.booking_pricing }, defaultLocale)
             patched = true
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
  console.log('🔧 Fixing localized fields...')
  
  if (!payload) {
    const payloadInstance = await getPayload({ config })
    await migrateCollection(payloadInstance, 'tours')
    await payloadInstance.destroy()
  } else {
    await migrateCollection(payload, 'tours')
  }
  
  console.log('✅ Localized fields fixed successfully!')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  console.log('🔄 Reverting localized fields changes...')
  // This migration is not reversible as it cleans up data
  console.log('⚠️ This migration cannot be reverted')
} 