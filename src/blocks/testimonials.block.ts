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
    }
  ],
};