import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
// import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
// import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
// import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
// import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
// import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
// import { searchFields } from '@/search/fieldOverrides'
// import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Tour, City } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Tour | City> = ({ doc }) => {
  // Check if it's a Tour by looking for tour-specific properties
  if ('title' in doc && doc.title) {
    return (doc as any).meta?.title || `${doc.title} | Old City Tours`
  }
  // Check if it's a City by looking for city-specific properties
  if ('name' in doc && doc.name) {
    return (doc as any).meta?.title || `${doc.name} | Old City Tours`
  }
  return 'Old City Tours'
}

const generateURL: GenerateURL<Tour | City> = ({ doc }) => {
  const url = getServerSideURL()
  
  // Check if it's a Tour by looking for tour-specific properties
  if ('title' in doc && doc.slug) {
    return `${url}/tours/${doc.slug}`
  }
  // Check if it's a City by looking for city-specific properties
  if ('name' in doc && doc.slug) {
    return `${url}/cities/${doc.slug}`
  }
  return url
}

export const plugins: Plugin[] = [
  // redirectsPlugin({
  //   collections: ['pages', 'posts'],
  //   overrides: {
  //     // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
  //     fields: ({ defaultFields }) => {
  //       return defaultFields.map((field) => {
  //         if ('name' in field && field.name === 'from') {
  //           return {
  //             ...field,
  //             admin: {
  //               description: 'You will need to rebuild the website when changing this field.',
  //             },
  //           }
  //         }
  //         return field
  //       })
  //     },
  //     hooks: {
  //       afterChange: [revalidateRedirects],
  //     },
  //   },
  // }),
  // nestedDocsPlugin({
  //   collections: ['categories'],
  //   generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  // }),
  seoPlugin({
    collections: ['tours', 'cities', 'hotels', 'posts', 'reviews'],
    globals: ['about-us', 'contact-us', 'privacy-policy', 'terms'],
    generateTitle: ({ doc, locale }) => {
      if (doc?.meta?.title) {
        return doc.meta.title
      }

      // Generate titles based on collection type
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

      // Generate URLs based on collection type and slug
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

      // Generate URLs for globals
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
  // formBuilderPlugin({
  //   fields: {
  //     payment: false,
  //   },
  //   formOverrides: {
  //     fields: ({ defaultFields }) => {
  //       return defaultFields.map((field) => {
  //         if ('name' in field && field.name === 'confirmationMessage') {
  //           return {
  //             ...field,
  //             editor: lexicalEditor({
  //               features: ({ rootFeatures }) => {
  //                 return [
  //                   ...rootFeatures,
  //                   FixedToolbarFeature(),
  //                   HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
  //                 ]
  //               },
  //             }),
  //           }
  //         }
  //         return field
  //       })
  //     },
  //   },
  // }),
  // searchPlugin({
  //   collections: ['posts'],
  //   beforeSync: beforeSyncWithSearch,
  //   searchOverrides: {
  //     fields: ({ defaultFields }) => {
  //       return [...defaultFields, ...searchFields]
  //     },
  //   },
  // }),
  payloadCloudPlugin(),
]
