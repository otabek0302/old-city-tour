import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { tour_itinerary_block } from '@/blocks/tour-itinerary.block'
import { dates_prices_tour_block } from '@/blocks/dates-prices-tour'
import { tour_enquiry_block } from '@/blocks/tour-enquiry.block'

export const Tours: CollectionConfig = {
  slug: 'tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: "duration",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: 'type',
      type: "relationship",
      relationTo: "types",
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          unique: true,
        },
        {
          name: 'sections',
          type: 'blocks',
          blocks: [tour_itinerary_block, dates_prices_tour_block, tour_enquiry_block],
        },
      ]
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: "reviews",
      type: "array",
      fields: [
        {
          name: "review",
          type: "relationship",
          relationTo: "reviews",
        }
      ]
    },
    ...slugField(),
  ],
}
