import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'link', type: 'text' },
        {
          name: 'icon', type: 'select', options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Whatsapp', value: 'whatsapp' },
          ],
        },
      ],
    },
    {
      name: 'navigationLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'licenceLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'contactLinks',
      type: 'array',
      fields: [
        {
          name: 'type', type: 'select', options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Address', value: 'address' },
          ],
        },
        { name: 'value', type: 'text' },
        {
          name: 'icon', type: 'select', options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Address', value: 'address' },
          ], defaultValue: 'phone'
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
    },
  ],
}
