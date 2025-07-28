/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

// Simple error handling wrapper
const wrapWithErrorHandling = (handler: any) => {
  return async (req: Request, context: any) => {
    try {
      return await handler(req, context)
    } catch (error: unknown) {
      console.error('API Error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Internal server error',
          message: 'An unexpected error occurred. Please check your database connection and environment variables.',
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
}

export const GET = wrapWithErrorHandling(REST_GET(config))
export const POST = wrapWithErrorHandling(REST_POST(config))
export const DELETE = wrapWithErrorHandling(REST_DELETE(config))
export const PATCH = wrapWithErrorHandling(REST_PATCH(config))
export const PUT = wrapWithErrorHandling(REST_PUT(config))
export const OPTIONS = wrapWithErrorHandling(REST_OPTIONS(config))
