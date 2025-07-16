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
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        {
          name: 'icon', type: 'select', options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Whatsapp', value: 'whatsapp' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Youtube', value: 'youtube' },
            { label: 'Linkedin', value: 'linkedin' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Website', value: 'website' },
          ], required: true
        },
      ],
    },
    {
      name: 'navigationLinks',
      type: 'array',
      localized: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'licenceLinks',
      type: 'array',
      localized: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'contactLinks',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'type', type: 'select', options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Address', value: 'address' },
          ], required: true
        },
        { name: 'value', type: 'text', required: true },
        { name: 'icon', type: 'select', options: [
          { label: 'Phone', value: 'phone' },
          { label: 'Email', value: 'email' },
          { label: 'Address', value: 'address' },
        ], required: true, defaultValue: 'phone' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
    },
  ],
}
