import type { Metadata } from 'next'

import type { Media, Post, Config, City, Type } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    url = serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<City> | Partial<Post> | null
  _tourTypes: Type[]
}): Promise<Metadata> => {
  const { doc, _tourTypes } = args

  const ogImage = getImageURL(doc?.image)

  const title = 'Old City Tour Agency'

  return {
    description: 'Discover amazing tours and destinations with Old City Tour Agency',
    openGraph: mergeOpenGraph({
      description: 'Discover amazing tours and destinations with Old City Tour Agency',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: '/',
    }),
    title,
  }
}
