import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'
import { hero_block, cities_block, tours_block, faq_block, testimonials_block, statistics_block } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title'
  },
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
      blocks: [ hero_block, cities_block, tours_block, faq_block, testimonials_block, statistics_block ],
    },
    ...slugField(),
  ],
  timestamps: true,
}