import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { MetaDescriptionField, MetaImageField, MetaTitleField, PreviewField } from '@payloadcms/plugin-seo/fields'
import { fillLocalizedHook } from '@/utilities/fillLocalizedHook'

export const Tours: CollectionConfig = {
  slug: 'tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Sections',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Tour Title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'duration_days',
                  type: 'number',
                  label: 'Tour Duration (Days)',
                  required: true,
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'duration_nights',
                  type: 'number',
                  label: 'Tour Duration (Nights)',
                  required: true,
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Tour Price',
                  required: true,
                  admin: {
                    width: '33%',
                  },
                }
              ],
            },
            {
              name: 'description',
              label: 'Short Description',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'type',
              type: 'relationship',
              relationTo: 'types',
              required: true,
            },
            {
              name: 'cities',
              type: 'relationship',
              relationTo: 'cities',
              hasMany: true,
              required: true,
            },
          ],
        },
        {
          label: 'Tour Details',
          fields: [
            {
              name: 'locations',
              type: 'array',
              label: 'Travel Path (e.g., Samarkand → Tashkent)',
              fields: [
                { name: 'from', type: 'relationship', relationTo: 'cities', required: true },
                { name: 'to', type: 'relationship', relationTo: 'cities', required: true },
                { name: 'transport', type: 'text', localized: true, required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'fromTime', type: 'text', required: true },
                    { name: 'toTime', type: 'text', required: true },
                    { name: 'duration', type: 'text', required: true },
                  ]
                }
              ],
            },
            {
              name: 'accommodation',
              type: 'array',
              label: 'Accommodation Per City',
              fields: [
                { name: 'city', type: 'relationship', relationTo: 'cities', required: true },
                { name: 'nights', type: 'number', required: true },
                { name: 'hotel', type: 'relationship', relationTo: 'hotels', hasMany: true },
              ],
            },
            {
              name: 'services',
              type: 'group',
              label: 'Services',
              admin: {
                description: 'Please fill all languages — otherwise default values will be used from English.',
              },
              fields: [
                {
                  name: 'included', type: 'array', label: 'Included Services', fields: [
                    { name: 'title', type: 'text', required: true, localized: true },
                  ]
                },
                {
                  name: 'notIncluded', type: 'array', label: 'Not Included Services', fields: [
                    { name: 'title', type: 'text', required: true, localized: true },
                  ]
                },
              ],
            },
            {
              name: 'itinerary',
              type: 'array',
              label: 'Itinerary (By Day)',
              fields: [
                { name: 'day', type: 'text', required: true, localized: true },
                {
                  name: 'activities',
                  type: 'array',
                  fields: [
                    { name: 'activity', type: 'text', required: true, localized: true },
                  ],
                },
              ],
            },
            {
              name: 'booking_pricing',
              label: 'Booking & Pricing',
              type: 'array',
              fields: [
                { name: 'dateStart', type: 'date' },
                { name: 'dateEnd', type: 'date' },
                { name: 'pricePerAdult', type: 'number' },
                { name: 'pricePerChild', type: 'number' },
              ],
            },
            {
              name: 'images',
              type: 'array',
              label: 'Gallery',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
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
    ...slugField(),
  ],
  hooks: {
    beforeValidate: [
      fillLocalizedHook([
        'services.included.title',
        'services.notIncluded.title', 
        'itinerary.day',
        'itinerary.activities.activity'
      ]),
      ({ data }) => {
        console.log('🔧 Tour beforeValidate hook - auto-filling localized fields');
        console.log('📝 Final data:', JSON.stringify(data, null, 2));
        return data;
      }
    ],
    beforeDelete: [
      async ({ req, id }) => {
        try {
          console.log(`Starting beforeDelete hook for tour ID: ${id}`)

          // Handle Reviews collection - delete all reviews for this tour
          const reviewsForTour = await req.payload.find({
            collection: 'reviews',
            where: {
              tour: {
                equals: id,
              },
            },
          })

          console.log(`Found ${reviewsForTour.docs.length} reviews for tour ${id}`)

          // Delete all reviews for this tour
          if (reviewsForTour.docs.length > 0) {
            console.log(`🗑️ Deleting ${reviewsForTour.docs.length} reviews for tour ${id}`)
            for (const review of reviewsForTour.docs) {
              console.log(`  - Deleting review ${review.id} (${review.name})`)
              try {
                await req.payload.delete({
                  collection: 'reviews',
                  id: review.id,
                })
                console.log(`  ✅ Successfully deleted review ${review.id}`)
              } catch (err) {
                console.warn(`⚠️ Failed to delete review ${review.id}:`, err)
              }
            }
          } else {
            console.log(`ℹ️ No reviews found for tour ${id}`)
          }

          // Handle Home collection - remove tour from recommended tours blocks
          const homePages = await req.payload.find({
            collection: 'home',
            depth: 2, // Need depth to access block content
          })

          console.log(`🔍 Found ${homePages.docs.length} home pages to check`)

          for (const homePage of homePages.docs) {
            console.log(`🔍 Checking home page ${homePage.id} for tour references`)
            if (homePage.sections && Array.isArray(homePage.sections)) {
              let updated = false
              const updatedSections = homePage.sections.map((section: any) => {
                if (section.blockType === 'recommended-tours' && section.tours && Array.isArray(section.tours)) {
                  console.log(`🔍 Found recommended-tours block with ${section.tours.length} tours`)
                  const updatedTours = section.tours.filter((tour: any) => String(tour.id) !== String(id))
                  if (updatedTours.length !== section.tours.length) {
                    updated = true
                    console.log(`🔄 Removing tour ${id} from recommended tours (${section.tours.length} -> ${updatedTours.length})`)
                    return {
                      ...section,
                      tours: updatedTours,
                    }
                  }
                }
                return section
              })

              if (updated) {
                console.log(`🔄 Updating home page ${homePage.id}, removing tour ${id} from recommended tours`)
                try {
                  await req.payload.update({
                    collection: 'home',
                    id: homePage.id,
                    data: {
                      sections: updatedSections,
                    },
                  })
                  console.log(`✅ Successfully updated home page ${homePage.id}`)
                } catch (err) {
                  console.warn(`⚠️ Failed to update home page ${homePage.id}:`, err)
                }
              } else {
                console.log(`ℹ️ No tour references found in home page ${homePage.id}`)
              }
            }
          }

          // Handle AboutUs global - remove tour from recommended tours blocks
          const aboutUsGlobal = await req.payload.findGlobal({
            slug: 'about-us',
            depth: 2, // Need depth to access block content
          })

          if (aboutUsGlobal && aboutUsGlobal.sections && Array.isArray(aboutUsGlobal.sections)) {
            console.log(`🔍 Checking about-us global for tour references`)
            let updated = false
            const updatedSections = aboutUsGlobal.sections.map((section: any) => {
              if (section.blockType === 'recommended-tours' && section.tours && Array.isArray(section.tours)) {
                console.log(`🔍 Found recommended-tours block in about-us with ${section.tours.length} tours`)
                const updatedTours = section.tours.filter((tour: any) => String(tour.id) !== String(id))
                if (updatedTours.length !== section.tours.length) {
                  updated = true
                  console.log(`🔄 Removing tour ${id} from about-us recommended tours (${section.tours.length} -> ${updatedTours.length})`)
                  return {
                    ...section,
                    tours: updatedTours,
                  }
                }
              }
              return section
            })

            if (updated) {
              console.log(`🔄 Updating about-us global, removing tour ${id} from recommended tours`)
              try {
                await req.payload.updateGlobal({
                  slug: 'about-us',
                  data: {
                    sections: updatedSections,
                  },
                })
                console.log(`✅ Successfully updated about-us global`)
              } catch (err) {
                console.warn(`⚠️ Failed to update about-us global:`, err)
              }
            } else {
              console.log(`ℹ️ No tour references found in about-us global`)
            }
          }

          console.log(`Successfully completed beforeDelete hook for tour ID: ${id}`)
        } catch (error) {
          console.error(`Error in beforeDelete hook for tour ID ${id}:`, error)
          throw error
        }
      },
    ]
  }
}