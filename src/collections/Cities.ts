import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { MetaDescriptionField, MetaImageField, MetaTitleField, PreviewField } from '@payloadcms/plugin-seo/fields'

export const Cities: CollectionConfig = {
  slug: 'cities',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Sections',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      index: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField('name'),
  ],
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        try {
          console.log(`Starting beforeDelete hook for city ID: ${id}`)

          // 1. Handle Tours collection - cities field
          const toursWithCities = await req.payload.find({
            collection: 'tours',
            where: {
              'cities.id': {
                equals: id,
              },
            },
          })

          console.log(`Found ${toursWithCities.docs.length} tours with cities field referencing city ${id}`)

          for (const tour of toursWithCities.docs) {
            if (tour.cities && Array.isArray(tour.cities)) {
              const updatedCities = tour.cities.filter((city: any) => String(city.id) !== String(id))
              console.log(`Updating tour ${tour.id}, removing city ${id} from cities field`)

              // Extract just the city IDs for database update
              const cityIds = updatedCities.map((city: any) => city.id)

              // Use raw database update to bypass validation
              await req.payload.db.updateOne({
                collection: 'tours',
                where: { id: { equals: tour.id } },
                data: {
                  cities: cityIds,
                },
              })
            }
          }

          // 2. Handle Tours collection - locations array
          const toursWithLocations = await req.payload.find({
            collection: 'tours',
            where: {
              or: [
                { 'locations.from.id': { equals: id } },
                { 'locations.to.id': { equals: id } },
              ],
            },
          })

          console.log(`Found ${toursWithLocations.docs.length} tours with locations referencing city ${id}`)

          for (const tour of toursWithLocations.docs) {
            if (tour.locations && Array.isArray(tour.locations)) {
              const updatedLocations = tour.locations.filter((location: any) =>
                String(location.from?.id) !== String(id) && String(location.to?.id) !== String(id)
              )
              console.log(`Updating tour ${tour.id}, removing city ${id} from locations`)

              // Process locations to extract just IDs for relationships
              const processedLocations = updatedLocations.map((location: any) => ({
                ...location,
                from: location.from?.id || location.from,
                to: location.to?.id || location.to,
              }))

              await req.payload.db.updateOne({
                collection: 'tours',
                where: { id: { equals: tour.id } },
                data: {
                  locations: processedLocations,
                },
              })
            }
          }

          // 3. Handle Tours collection - accommodation array
          const toursWithAccommodation = await req.payload.find({
            collection: 'tours',
            where: {
              'accommodation.city.id': {
                equals: id,
              },
            },
          })

          console.log(`Found ${toursWithAccommodation.docs.length} tours with accommodation referencing city ${id}`)

          for (const tour of toursWithAccommodation.docs) {
            if (tour.accommodation && Array.isArray(tour.accommodation)) {
              const updatedAccommodation = tour.accommodation.filter((acc: any) => String(acc.city?.id) !== String(id))
              console.log(`Updating tour ${tour.id}, removing city ${id} from accommodation`)

              // Process accommodation to extract just IDs for relationships
              const processedAccommodation = updatedAccommodation.map((acc: any) => ({
                ...acc,
                city: acc.city?.id || acc.city,
                hotel: Array.isArray(acc.hotel) ? acc.hotel.map((h: any) => h.id || h) : acc.hotel,
              }))

              await req.payload.db.updateOne({
                collection: 'tours',
                where: { id: { equals: tour.id } },
                data: {
                  accommodation: processedAccommodation,
                },
              })
            }
          }



          // 4. Handle Hotels collection
          const hotels = await req.payload.find({
            collection: 'hotels',
            where: {
              'city.id': {
                equals: id,
              },
            },
          })

          console.log(`Found ${hotels.docs.length} hotels referencing city ${id}`)

          for (const hotel of hotels.docs) {
            console.log(`🗑️ Deleting hotel ${hotel.id} (${hotel.name}) that references city ${id}`)
            try {
              await req.payload.delete({
                collection: 'hotels',
                id: hotel.id,
              })
              console.log(`  ✅ Successfully deleted hotel ${hotel.id}`)
            } catch (err) {
              console.warn(`⚠️ Failed to delete hotel ${hotel.id}:`, err)
            }
          }

          // 5. Handle Home collection - recommended cities blocks
          const homePages = await req.payload.find({
            collection: 'home',
          })

          console.log(`Checking ${homePages.docs.length} home pages for city references`)

          for (const home of homePages.docs) {
            if (home.sections && Array.isArray(home.sections)) {
              let hasChanges = false
              const updatedSections = home.sections.map((section: any) => {
                if (section.blockType === 'recommended-cities' && section.cities) {
                  const updatedCities = section.cities.filter((city: any) => String(city.id) !== String(id))
                  if (updatedCities.length !== section.cities.length) {
                    hasChanges = true
                    console.log(`Updating home page ${home.id}, removing city ${id} from recommended-cities block`)
                    return {
                      ...section,
                      cities: updatedCities,
                    }
                  }
                }
                return section
              })

              if (hasChanges) {
                await req.payload.update({
                  collection: 'home',
                  id: home.id,
                  data: {
                    sections: updatedSections,
                  },
                })
              }
            }
          }

          // 6. Handle About Us global - recommended cities blocks
          const aboutUsGlobal = await req.payload.findGlobal({
            slug: 'about-us',
          })

          if (aboutUsGlobal && aboutUsGlobal.sections && Array.isArray(aboutUsGlobal.sections)) {
            let hasChanges = false
            const updatedSections = aboutUsGlobal.sections.map((section: any) => {
              if (section.blockType === 'recommended-cities' && section.cities) {
                const updatedCities = section.cities.filter((city: any) => String(city.id) !== String(id))
                if (updatedCities.length !== section.cities.length) {
                  hasChanges = true
                  console.log(`Updating about-us global, removing city ${id} from recommended-cities block`)
                  return {
                    ...section,
                    cities: updatedCities,
                  }
                }
              }
              return section
            })

            if (hasChanges) {
              await req.payload.updateGlobal({
                slug: 'about-us',
                data: {
                  sections: updatedSections,
                },
              })
            }
          }



          console.log(`Successfully completed beforeDelete hook for city ID: ${id}`)
        } catch (error) {
          console.error(`Error in beforeDelete hook for city ID ${id}:`, error)
          throw error
        }
      },
    ],
  },
  timestamps: true,
}
