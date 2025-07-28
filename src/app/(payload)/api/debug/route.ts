import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URI: process.env.DATABASE_URI ? 'SET' : 'MISSING',
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'SET' : 'MISSING',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  }

  return NextResponse.json({
    status: 'debug',
    timestamp: new Date().toISOString(),
    environment: envCheck,
    message: 'This endpoint helps debug environment variable issues'
  })
} 