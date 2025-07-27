import { Block } from "payload";

export const recommended_tours_block: Block = {
    slug: "recommended-tours",
    interfaceName: "RecommendedTours",
    fields: [
        {
            name: "heading",
            type: "text",
            localized: true,
        },
        {
            name: "subheading",
            type: "text",
            localized: true,
        },
        {
            name: "tours",
            type: "relationship",
            relationTo: "tours",
            hasMany: true,
            maxRows: 4,
            required: true,
        },
        {
            name: "button",
            type: "group",
            localized: true,
            fields: [
                { name: "label", type: "text", label: "Link Label" },
                { name: "link", type: "text", label: "Link URL" },
            ]
        }
    ]
}