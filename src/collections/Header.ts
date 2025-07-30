import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Header: GlobalConfig = {
  slug: 'header',
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
      name: 'navigations',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
        }
      ],
    },
  ],
}
