import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig = {
    slug: 'posts',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: 'title',
            type: 'text',
            localized: true,
            required: true,
        },
        {
            name: 'content',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    localized: true,
                    required: true,
                }
            ],
            minRows: 1,
            maxRows: 5
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                }
            ],
            minRows: 1,
            maxRows: 5
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        ...slugField(),
    ],
    timestamps: true,
}
