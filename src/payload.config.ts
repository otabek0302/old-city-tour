import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp'
import path from 'path'

import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Users, Tours, Home, Reviews, Cities, Media, Header, Footer, Posts, Types, Hotels } from './collections'
import { AboutUs, ContactUs, PrivacyPolicy, Terms } from './collections'
import { getServerSideURL } from './utilities/getURL'
import { cloudinaryStorage } from '@pemol/payload-cloudinary'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'PAYLOAD_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`)
    process.exit(1)
  }
}

export default buildConfig({
  localization: {
    locales: ['uz', 'ru', 'en'],
    defaultLocale: 'en',
  },
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),

  collections: [
    Users,
    Tours,
    Home,
    Reviews,
    Cities,
    Media,
    Posts,
    Types,
    Hotels,
  ],

  globals: [
    Header,
    Footer,
    AboutUs,
    ContactUs,
    PrivacyPolicy,
    Terms,
  ],

  cors: [getServerSideURL()].filter(Boolean),
  secret: process.env.PAYLOAD_SECRET,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },

  plugins: [
    ...plugins,
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },
      collections: {
        media: {
          disableLocalStorage: true,
        },
      },
      folder: 'oldcitytours'
    }),
  ],

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },

  sharp,
})
