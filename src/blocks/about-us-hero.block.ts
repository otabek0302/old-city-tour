import type { Block } from 'payload';

export const about_us_hero_block: Block = {
    slug: 'about-us-hero',
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
            name: 'image-group',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
            maxRows: 4,
        },
        {
            name: 'button',
            type: 'group',
            localized: true,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    localized: true,
                    defaultValue: '/tours',
                },
            ],
        },

    ],
}; 