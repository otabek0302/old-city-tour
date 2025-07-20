import type { Block } from 'payload';

export const faq_block: Block = {
  slug: 'faq',
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
      name: "contacts",
      type: "group",
      fields: [
        {
          name: "phone",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "email",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "address",
          type: "text",
          required: true,
          localized: true,
        },
      ],
      required: true,
      localized: true,
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}; 