import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const ContactUs: CollectionConfig = {
    slug: 'contact-us',
    access: {
        create: anyone,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        group: 'Pages',
        useAsTitle: 'heading',
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
            name: 'heading',
            type: 'text',
            required: true,
            localized: true,
            unique: true,
        },
        {
            name: 'subheading',
            type: 'text',
            required: true,
            localized: true,
            unique: true,
        },
        {
            name: 'form_info',
            type: 'group',
            fields: [
                {
                    name: 'heading',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'subheading',
                    type: 'text',
                    required: true,
                    localized: true,
                },
            ]
        },
        {
            name: 'contact_info',
            type: 'group',
            fields: [
                {
                    name: 'heading',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'subheading',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'phone',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'email',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'address',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'opening_hours',
                    type: 'text',
                    required: true,
                    localized: true,
                },
            ],
        },
    ],
    timestamps: true,
}