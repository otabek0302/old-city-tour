import type { Block } from 'payload';

export const statistics_block: Block = {
    slug: 'statistics',
    fields: [
        {
            name: 'statistics',
            type: 'array',
            fields: [
                {
                    name: 'number',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    localized: true,
                },
            ],
        },
    ],
};