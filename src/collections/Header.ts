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
      required: true,
    },
    {
      name: 'navigations',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
