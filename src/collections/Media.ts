import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: false,
      admin: {
        description: 'Describe the image for accessibility',
      },
    },
    {
      name: 'cloudinaryMetadata',
      label: 'Cloudinary Info',
      type: 'group',
      admin: { readOnly: true },
      fields: [
        { name: 'secure_url', type: 'text' },
        { name: 'original_filename', type: 'text' },
        { name: 'format', type: 'text' },
        { name: 'resource_type', type: 'text' },
        { name: 'width', type: 'number' },
        { name: 'height', type: 'number' },
        { name: 'bytes', type: 'number' },
      ],
    },
  ],
};