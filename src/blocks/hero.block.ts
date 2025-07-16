import type { Block } from 'payload';

export const hero_block: Block = {
  slug: 'hero',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'button',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          localized: true,
        }
      ]
    },
  ],
}; 