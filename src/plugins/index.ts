import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle: ({ doc, locale }) => {
      if (doc?.meta?.title) {
        return doc.meta.title
      }
      if ('title' in doc && doc.title) {
        return `${doc.title} | Old City Tours`
      }
      if ('name' in doc && doc.name) {
        return `${doc.name} | Old City Tours`
      }

      return 'Old City Tours'
    },
    generateURL: ({ doc, locale }) => {
      if (doc?.meta?.url) {
        return doc.meta.url
      }

      if (doc?.slug) {
        if ('title' in doc) {
          return `/tours/${doc.slug}`
        }
        if ('name' in doc && 'image' in doc) {
          return `/cities/${doc.slug}`
        }
        if ('name' in doc && 'city' in doc) {
          return `/hotels/${doc.slug}`
        }
        if ('title' in doc && 'image' in doc && 'content' in doc) {
          return `/posts/${doc.slug}`
        }
        if ('name' in doc && 'rating' in doc && 'tour' in doc) {
          return `/reviews/${doc.slug}`
        }
      }

      if ('title' in doc) {
        if (doc.title?.toLowerCase().includes('about')) {
          return '/about-us'
        }
        if (doc.title?.toLowerCase().includes('contact')) {
          return '/contact-us'
        }
        if (doc.title?.toLowerCase().includes('privacy')) {
          return '/privacy-policy'
        }
        if (doc.title?.toLowerCase().includes('terms')) {
          return '/terms'
        }
      }

      return '/'
    },
  }),
  payloadCloudPlugin(),
]
