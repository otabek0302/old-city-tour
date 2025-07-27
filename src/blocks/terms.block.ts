import type { Block } from 'payload';

export const terms_block: Block = {
    slug: 'terms',
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'content',
            type: 'text',
            localized: true,
        },
    ],
}; 