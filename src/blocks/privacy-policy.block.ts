import type { Block } from 'payload';

export const privacy_policy_block: Block = {
    slug: 'privacy-policy',
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'content',
            type: 'textarea',
            localized: true,
        },
    ],
}; 