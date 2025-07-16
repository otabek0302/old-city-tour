import type { Block } from 'payload';

export const tour_enquiry_block: Block = {
    slug: 'tour-enquiry',
    fields: [
        {
            name: 'title',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    localized: true,
                    required: true,
                },
                {
                    name: 'email',
                    type: 'email',
                    localized: true,
                    required: true,
                },
                {
                    name: 'phone',
                    type: 'text',
                    localized: true,
                    required: true,
                },
                {
                    name: 'message',
                    type: 'textarea',
                    localized: true,
                    required: true,
                },
                {
                    name: 'tour',
                    type: 'relationship',
                    relationTo: 'tours',
                    required: true,
                },
            ],
        },
    ],
};