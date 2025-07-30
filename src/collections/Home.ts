import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { hero_block, special_offer_section_block, faq_block, testimonials_block, recommended_tours_block, recommended_cities_block } from '../blocks'

export const Home: CollectionConfig = {
  slug: 'home',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Pages',
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
      blocks: [hero_block, special_offer_section_block, faq_block, testimonials_block, recommended_tours_block, recommended_cities_block ],
    },
  ],
  timestamps: true,
}