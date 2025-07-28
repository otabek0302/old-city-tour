import type { Metadata } from 'next'
import type { Media, Tour, City, Hotel, Post, Review, Config } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const imageUrl = image.url

    // If it's already an absolute URL (Cloudinary), return as is
    if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
      return imageUrl
    }

    // Otherwise, prefix with server URL (for local files)
    if (imageUrl) {
      url = serverUrl + imageUrl
    }
  }
  return url
}

export const generateMeta = async (args: {
  doc: Partial<Tour> | Partial<City> | Partial<Hotel> | Partial<Post> | Partial<Review> | null
  collection?: 'tours' | 'cities' | 'hotels' | 'posts' | 'reviews'
  global?: 'about-us' | 'contact-us' | 'privacy-policy' | 'terms'
}): Promise<Metadata> => {
  const { doc, collection, global } = args

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

  let image = null
  let title = 'Old City Tours'
  let description = 'Discover amazing tours and destinations with Old City Tours'
  let url = '/'

  // Handle collections
  if (collection) {
    if (collection === 'tours' && 'images' in doc && doc.images?.[0]?.image) {
      image = doc.images[0].image
    } else if (collection === 'cities' && 'image' in doc && doc.image) {
      image = doc.image
    } else if (collection === 'hotels' && 'images' in doc && doc.images?.[0]?.image) {
      image = doc.images[0].image
    } else if (collection === 'posts' && 'image' in doc && doc.image) {
      image = doc.image
    }

    if (collection === 'tours' && 'title' in doc && doc.title) {
      title = (doc as any).meta?.title || `${doc.title} | Old City Tours`
    } else if (collection === 'cities' && 'name' in doc && doc.name) {
      title = (doc as any).meta?.title || `${doc.name} | Old City Tours`
    } else if (collection === 'hotels' && 'name' in doc && doc.name) {
      title = (doc as any).meta?.title || `${doc.name} | Old City Tours`
    } else if (collection === 'posts' && 'title' in doc && doc.title) {
      title = (doc as any).meta?.title || `${doc.title} | Old City Tours`
    } else if (collection === 'reviews' && 'name' in doc && doc.name) {
      title = (doc as any).meta?.title || `Review by ${doc.name} | Old City Tours`
    }

    if (collection === 'tours' && 'description' in doc && doc.description) {
      description = (doc as any).meta?.description || doc.description
    } else if (collection === 'cities' && 'description' in doc && doc.description) {
      description = (doc as any).meta?.description || doc.description
    } else if (collection === 'hotels' && 'description' in doc && doc.description) {
      description = (doc as any).meta?.description || doc.description
    } else if (collection === 'posts' && 'content' in doc && doc.content?.[0]?.text) {
      description = (doc as any).meta?.description || doc.content[0].text
    } else if (collection === 'reviews' && 'comment' in doc && doc.comment) {
      description = (doc as any).meta?.description || doc.comment
    }

    if (collection === 'tours' && doc?.slug) {
      url = `/tours/${doc.slug}`
    } else if (collection === 'cities' && doc?.slug) {
      url = `/cities/${doc.slug}`
    } else if (collection === 'hotels' && doc?.slug) {
      url = `/hotels/${doc.slug}`
    } else if (collection === 'posts' && doc?.slug) {
      url = `/posts/${doc.slug}`
    } else if (collection === 'reviews' && doc?.slug) {
      url = `/reviews/${doc.slug}`
    }
  }

  // Handle globals
  if (global) {
    if (global === 'about-us' && 'title' in doc && doc.title) {
      title = (doc as any).meta?.title || `${doc.title} | Old City Tours`
      description = (doc as any).meta?.description || 'Learn more about Old City Tours and our mission to provide exceptional travel experiences.'
      url = '/about-us'
    } else if (global === 'contact-us' && 'title' in doc && doc.title) {
      title = (doc as any).meta?.title || `${doc.title} | Old City Tours`
      description = (doc as any).meta?.description || 'Contact Old City Tours for booking inquiries, support, or any questions about our services.'
      url = '/contact-us'
    } else if (global === 'privacy-policy' && 'title' in doc && doc.title) {
      title = (doc as any).meta?.title || `${doc.title} | Old City Tours`
      description = (doc as any).meta?.description || 'Privacy policy and data protection information for Old City Tours.'
      url = '/privacy-policy'
    } else if (global === 'terms' && 'title' in doc && doc.title) {
      title = (doc as any).meta?.title || `${doc.title} | Old City Tours`
      description = (doc as any).meta?.description || 'Terms and conditions for Old City Tours services.'
      url = '/terms'
    }
  }

  const ogImage = getImageURL(image)

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
