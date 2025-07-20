import type { Block } from "payload";

export const special_offer_section_block: Block = {
    slug: "special-offer-section",
    fields: [
        {
            name: "heading",
            type: "text",
            localized: true,
            required: true,
        },
        {
            name: "subheading",
            type: "text",
            localized: true,
        },
        {
            name: "action_type",
            type: "select",
            required: true,
            options: [
                {
                    label: "Buttons",
                    value: "buttons",
                },
                {
                    label: "Date",
                    value: "date",
                },
            ],
        },
        {
            name: "button",
            type: "array",
            localized: true,
            fields: [
                {
                    name: "label",
                    type: "text",
                },
                {
                    name: "link",
                    type: "text",
                }
            ],
            minRows: 1,
            maxRows: 2,
        },
        {
            name: "date",
            type: "date",
            localized: true,
        },
    ]
}   