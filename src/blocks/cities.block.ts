import type { Block } from 'payload';

export const cities_block: Block = {
  slug: 'cities',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'button',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        }
      ]
    },
    {
      name: 'cities',
      type: 'array',
      fields: [
        {
          name: 'city',
          type: 'relationship',
          relationTo: 'cities',
          required: true,
        }
      ],
    },
  ],
}; 