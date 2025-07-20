import type { Block } from 'payload';

export const testimonials_block: Block = {
  slug: 'testimonials',
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
      name: 'reviews',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
    },
    {
      name: 'button',
      type: 'group',
      localized: true,
      fields: [
        { name: 'text', type: 'text' },
        { name: 'link', type: 'relationship', relationTo: 'pages' },
      ]
    }
  ],
}; 