import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Hotels: CollectionConfig = {
    slug: 'hotels',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        group: 'Pages',
        useAsTitle: 'name',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Basic Info',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'name',
                                    label: 'Hotel Name',
                                    type: 'text',
                                    localized: true,
                                    required: true,
                                    admin: {
                                        width: '50%',
                                    },
                                },
                                {
                                    name: 'city',
                                    type: 'relationship',
                                    relationTo: 'cities',
                                    required: true,
                                    admin: {
                                        width: '50%',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'description',
                            label: 'Hotel Description',
                            type: 'textarea',
                            localized: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'address',
                                    label: 'Address',
                                    type: 'text',
                                    localized: true,
                                    admin: {
                                        width: '33%',
                                    },
                                },
                                {
                                    name: 'phone',
                                    label: 'Phone Number',
                                    type: 'text',
                                    admin: {
                                        width: '33%',
                                    },
                                },
                                {
                                    name: 'website',
                                    label: 'Website URL',
                                    type: 'text',
                                    admin: {
                                        width: '33%',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'rating',
                            label: 'Hotel Rating',
                            type: 'select',
                            options: [
                                { label: '1 Star', value: '1' },
                                { label: '2 Stars', value: '2' },
                                { label: '3 Stars', value: '3' },
                                { label: '4 Stars', value: '4' },
                                { label: '5 Stars', value: '5' },
                            ],
                        },
                    ],
                },
                {
                    label: 'Hotel Details',
                    fields: [
                        {
                            name: 'images',
                            type: 'array',
                            label: 'Hotel Images',
                            fields: [
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: 'features',
                            type: 'array',
                            label: 'Hotel Features',
                            localized: true,
                            fields: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: 'policies',
                            type: 'group',
                            label: 'Hotel Policies',
                            localized: true,
                            fields: [
                                {
                                    name: 'checkIn',
                                    type: 'text',
                                    label: 'Check-in Time',
                                    required: true,
                                },
                                {
                                    name: 'checkOut',
                                    type: 'text',
                                    label: 'Check-out Time',
                                    required: true,
                                },
                                {
                                    name: 'cancellation',
                                    type: 'text',
                                    label: 'Cancellation Policy',
                                },
                                {
                                    name: 'pet',
                                    type: 'text',
                                    label: 'Pet Policy',
                                },
                                {
                                    name: 'children',
                                    type: 'text',
                                    label: 'Children Policy',
                                },
                                {
                                    name: 'payment',
                                    type: 'text',
                                    label: 'Payment Policy',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
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