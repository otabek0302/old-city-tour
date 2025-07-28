import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SITE_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SITE_URL || ''
}

export const getImageURL = (image?: any) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template.png'

  if (image && typeof image === 'object' && 'url' in image) {
    // Use desktop size if available, otherwise fall back to original URL
    const desktopUrl = image.sizes?.desktop?.url
    const imageUrl = desktopUrl || image.url

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
