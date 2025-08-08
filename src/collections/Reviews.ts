import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Reviews: CollectionConfig = {
    slug: 'reviews',
    access: {
        create: anyone,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        group: 'Sections',
        useAsTitle: 'name',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Review Info',
                    fields: [
                        {
                            name: 'rating',
                            type: 'number',
                            required: true,
                            min: 1,
                            max: 5,
                        },
                        {
                            name: 'tour',
                            type: 'relationship',
                            relationTo: 'tours',
                            required: true,
                        },
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'comment',
                            type: 'textarea',
                            required: true,
                        },
                    ],
                },
            ],
        },
        ...slugField('name'),
    ],
    timestamps: true,
}
