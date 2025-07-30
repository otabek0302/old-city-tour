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
      name: 'button',
      type: 'group',
      fields: [
        { name: "label", type: "text", label: "Link Label", localized: true },
      ]
    },
  ],
};