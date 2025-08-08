import { getPayload } from 'payload'
import config from '../payload.config'

function fillMissingLocales<T extends object>(field: any, defaultLocale = 'en'): Record<string, T> {
  const locales = ['en', 'ru', 'uz'];
  return locales.reduce((acc, locale) => {
    acc[locale] = field?.[locale] ?? field?.[defaultLocale] ?? {};
    return acc;
  }, {} as Record<string, T>);
}

function isLocalized<T>(value: any): value is Record<string, T> {
  return typeof value === 'object' && !Array.isArray(value) && Object.keys(value).some(k => ['en', 'ru', 'uz'].includes(k));
}

export async function up() {
  const payload = await getPayload({ config })
  
  console.log('🔧 Starting migration to fix tour localized fields...')
  
  const tours = await payload.find({
    collection: 'tours',
    limit: 1000,
    depth: 0,
  })
  
  console.log(`📝 Found ${tours.docs.length} tours to check`)
  
  for (const tour of tours.docs) {
    let patched = false
    const patch: any = {}
    
    console.log(`🔍 Checking tour ${tour.id}: ${tour.title}`)
    
    // Fix services field
    if (tour.services && !isLocalized(tour.services)) {
      console.log(`🔄 Fixing services for tour ${tour.id}`)
      patch.services = fillMissingLocales(tour.services, 'en')
      patched = true
    }
    
    // Fix itinerary field
    if (tour.itinerary && !isLocalized(tour.itinerary)) {
      console.log(`🔄 Fixing itinerary for tour ${tour.id}`)
      patch.itinerary = fillMissingLocales(tour.itinerary, 'en')
      patched = true
    }
    
    // Fix booking_pricing field
    if (tour.booking_pricing && !isLocalized(tour.booking_pricing)) {
      console.log(`🔄 Fixing booking_pricing for tour ${tour.id}`)
      patch.booking_pricing = fillMissingLocales(tour.booking_pricing, 'en')
      patched = true
    }
    
    if (patched) {
      try {
        await payload.update({
          collection: 'tours',
          id: tour.id,
          data: patch,
        })
        console.log(`✅ Successfully updated tour ${tour.id}`)
      } catch (error) {
        console.error(`❌ Failed to update tour ${tour.id}:`, error)
      }
    } else {
      console.log(`ℹ️ Tour ${tour.id} already has correct structure`)
    }
  }
  
  console.log('✅ Migration completed successfully')
  await payload.destroy()
}

export async function down() {
  console.log('⚠️ Down migration not implemented - this would require manual data restoration')
} 