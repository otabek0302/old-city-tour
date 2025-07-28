import type { Metadata } from 'next'

import type { Media, Tour, City, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template.png'

  if (image && typeof image === 'object' && 'url' in image) {
    // Use desktop size if available, otherwise fall back to original URL
    const desktopUrl = image.sizes?.desktop?.url
    url = desktopUrl ? serverUrl + desktopUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Tour> | Partial<City> | null
  collection?: 'tours' | 'cities'
}): Promise<Metadata> => {
  const { doc, collection } = args

  if (!doc) {
    return {
      title: 'Old City Tours',
      description: 'Discover amazing tours and destinations with Old City Tours',
      openGraph: mergeOpenGraph({
        description: 'Discover amazing tours and destinations with Old City Tours',
        title: 'Old City Tours',
        url: '/',
      }),
    }
  }

  // Get the appropriate image based on collection type
  let image = null
  if (collection === 'tours' && 'images' in doc && doc.images?.[0]?.image) {
    image = doc.images[0].image
  } else if (collection === 'cities' && 'image' in doc && doc.image) {
    image = doc.image
  }

  const ogImage = getImageURL(image)

  // Generate title based on collection and document
  let title = 'Old City Tours'
  if (collection === 'tours' && 'title' in doc && doc.title) {
    title = (doc as any).meta?.title || `${doc.title} | Old City Tours`
  } else if (collection === 'cities' && 'name' in doc && doc.name) {
    title = (doc as any).meta?.title || `${doc.name} | Old City Tours`
  }

  // Generate description based on collection and document
  let description = 'Discover amazing tours and destinations with Old City Tours'
  if (collection === 'tours' && 'description' in doc && doc.description) {
    description = (doc as any).meta?.description || doc.description
  } else if (collection === 'cities' && 'description' in doc && doc.description) {
    description = (doc as any).meta?.description || doc.description
  }

  // Generate URL based on collection and slug
  let url = '/'
  if (collection === 'tours' && doc?.slug) {
    url = `/tours/${doc.slug}`
  } else if (collection === 'cities' && doc?.slug) {
    url = `/cities/${doc.slug}`
  }

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      title,
      url,
    }),
    title,
  }
}
