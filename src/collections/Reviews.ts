import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Reviews: CollectionConfig = {
    slug: 'reviews',
    access: {
        create: authenticated,
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
                            localized: true,
                            required: true,
                        },
                        {
                            name: 'comment',
                            type: 'textarea',
                            localized: true,
                            required: true,
                        },
                    ],
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaDescriptionField({}),
                        PreviewField({
                            hasGenerateFn: true,
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                    ],
                },
            ],
        },
        ...slugField(),
    ],
    timestamps: true,
}
