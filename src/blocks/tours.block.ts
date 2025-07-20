import type { Block } from 'payload';

export const tours_block: Block = {
  slug: 'tours',
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
      name: 'tours',
      type: 'array',
      fields: [
        {
          name: 'tour',
          type: 'relationship',
          relationTo: 'tours',
          required: true,
          hasMany: true,
          maxRows: 4,
        }
      ],
    },
  ],
}; 