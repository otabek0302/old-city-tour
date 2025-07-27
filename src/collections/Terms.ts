import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'
import { terms_block } from '../blocks'

export const Terms: CollectionConfig = {
    slug: 'terms',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title',
        group: 'Pages',
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
            name: 'paragraphs',
            type: 'group',
            localized: true,
            fields: [
                {name: "p1", type: "text", localized: true},
                {name: "p2", type: "text", localized: true},
            ]
        },
        {
            name: 'sections',
            type: 'blocks',
            blocks: [terms_block],
        },
        ...slugField(),
    ],
    timestamps: true,
}