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
        },
        {
          name: 'link',
          type: 'text',
        }
      ],
      minRows: 1,
      maxRows: 2,
    },
    {
      name: "static_content",
      type: "array",
      localized: true,
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "text",
          type: "text",
        }
      ],
      minRows: 1,
      maxRows: 4,
    }
  ],
}; 