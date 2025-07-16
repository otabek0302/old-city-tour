import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'

export const Types: CollectionConfig = {
    slug: 'types',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
            unique: true,
        },
        {
            name: 'description',
            type: 'textarea',
            localized: true,
            required: true,
        },
        ...slugField(),
    ],
    timestamps: true,
}