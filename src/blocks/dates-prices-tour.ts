import type { Block } from "payload";

export const dates_prices_tour_block: Block = {
    slug: "dates-prices-tour",
    fields: [
        {
            name: "title",
            type: "text",
            localized: true,
            required: true,
        },
        {
            name: "type",
            type: "relationship",
            relationTo: "tours",
            required: true,
        },
        {
            name: "dates_prices",
            type: "array",
            fields: [
                {
                    name: "start_date",
                    type: "date",
                    localized: true,
                    required: true,
                },
                {
                    name: "end_date",
                    type: "date",
                    localized: true,
                    required: true,
                },
                {
                    name: "price",
                    type: "number",
                    localized: true,
                    required: true,
                },
                {
                    name: "link_to_booking",
                    type: "text",
                    localized: true,
                    required: true,
                },
            ],
        },
        {
            name: "description",
            type: "textarea",
            localized: true,
            required: true,
        }
    ],
};