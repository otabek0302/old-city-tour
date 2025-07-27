import { Block } from "payload";

export const recommended_cities_block: Block = {
    slug: "recommended-cities",
    interfaceName: "RecommendedCities",
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
            name: "cities",
            type: "relationship",
            relationTo: "cities",
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
            ],
        }
    ]
}