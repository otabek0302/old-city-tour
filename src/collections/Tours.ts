import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

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
                  name: 'duration',
                  type: 'text',
                  label: 'Tour Duration',
                  localized: true,
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Tour Price',
                  localized: true,
                  required: true,
                  admin: {
                    width: '50%',
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
              localized: true,
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
              localized: true,
              fields: [
                { name: 'from', type: 'relationship', relationTo: 'cities', required: true },
                { name: 'to', type: 'relationship', relationTo: 'cities', required: true },
                { name: 'transport', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'date', type: 'date' },
                    { name: 'fromTime', type: 'text' },
                    { name: 'toTime', type: 'text' },
                    { name: 'duration', type: 'text' },
                  ]
                }
              ],
            },
            {
              name: 'accommodation',
              type: 'array',
              label: 'Accommodation Per City',
              localized: true,
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
              localized: true,
              fields: [
                {
                  name: 'included', type: 'array', label: 'Included Services', fields: [
                    { name: 'title', type: 'text', required: true },
                  ]
                },
                {
                  name: 'notIncluded', type: 'array', label: 'Not Included Services', fields: [
                    { name: 'title', type: 'text', required: true },
                  ]
                },
              ],
            },
            {
              name: 'itinerary',
              type: 'array',
              label: 'Itinerary (By Day)',
              localized: true,
              fields: [
                { name: 'day', type: 'text', required: true },
                {
                  name: 'activities',
                  type: 'array',
                  fields: [
                    { name: 'activity', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'booking_pricing',
              label: 'Booking & Pricing',
              type: 'array',
              localized: true,
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
}