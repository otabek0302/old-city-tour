import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'
import { privacy_policy_block } from '../blocks'

export const PrivacyPolicy: CollectionConfig = {
    slug: 'privacy-policy',
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
            blocks: [privacy_policy_block],
        },
        ...slugField(),
    ],
    timestamps: true,
}