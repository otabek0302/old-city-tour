import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { about_us_hero_block, recommended_tours_block, special_offer_section_block, statistics_block, testimonials_block } from '../blocks'

export const AboutUs: CollectionConfig = {
  slug: 'about-us',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',  
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
      blocks: [ about_us_hero_block, statistics_block, recommended_tours_block, testimonials_block, special_offer_section_block ],
    },
  ],
  timestamps: true,
}