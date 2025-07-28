declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_URL: string
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
      CRON_SECRET: string
    }
  }
}
export {}
