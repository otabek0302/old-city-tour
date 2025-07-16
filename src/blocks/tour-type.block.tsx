import type { Block } from "payload";

export const tour_type_block: Block = {
  slug: "tour-type",
  fields: [
    {
      name: "type",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          required: true,
        },
      ],
    },
  ],
};