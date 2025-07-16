import type { Block } from "payload";

export const tour_itinerary_block: Block = {
    slug: "tour-itinerary",
    fields: [
        {
            name: "itinerary",
            type: "array",
            fields: [
                {
                    name: "day",
                    type: "text",
                    localized: true,
                    required: true,
                },
                {
                    name: "city",
                    type: "relationship",
                    relationTo: "cities",
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
                        },
                    ],
                },
            ],
        },
    ],
};