import type { Block } from "payload";

export const tour_features_block: Block = {
    slug: "tour-features",
    fields: [
        {
            name: "heading",
            type: "text",
            localized: true,
            required: true,
        },
        {
            name: "features",
            type: "array",
            fields: [
                {
                    name: "title",
                    type: "text",
                    localized: true,
                    required: true,
                }
            ],
        },
    ],
};