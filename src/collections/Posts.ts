import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Posts: CollectionConfig = {
    slug: 'posts',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        group: 'Pages',
        useAsTitle: 'title',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
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
                    ],
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
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
