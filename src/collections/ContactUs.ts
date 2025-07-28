import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const ContactUs: GlobalConfig = {
  slug: 'contact-us',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'heading',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'subheading',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'form_info',
              type: 'group',
              label: 'Form Information',
              localized: true,
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subheading',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'contact_info',
              type: 'group',
              label: 'Contact Information',
              localized: true,
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subheading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'address',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'opening_hours',
                  type: 'text',
                  required: true,
                },
              ],
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
  ],
}