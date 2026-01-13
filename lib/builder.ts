import { builder } from '@builder.io/sdk'

// Initialize Builder with your API key
const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || ''
builder.init(BUILDER_API_KEY)

export { builder }

// Paths that should NOT be handled by Builder (remain code-driven)
const EXCLUDED_PATHS = [
  '/products',        // Shopify product pages
  '/blog',            // Shopify blog
  '/directory',       // BigQuery directory
  '/contact',         // Form handling
  '/shipping',        // Policy pages
  '/returns',
  '/privacy',
  '/terms',
  '/api',             // API routes
]

/**
 * Check if a path should be handled by Builder.io
 */
export function shouldUseBuilder(path: string): boolean {
  // Normalize path
  const normalizedPath = path === '' ? '/' : path

  return !EXCLUDED_PATHS.some(excluded =>
    normalizedPath === excluded || normalizedPath.startsWith(`${excluded}/`)
  )
}

/**
 * Fetch a Builder.io page by URL path
 */
export async function getBuilderPage(urlPath: string) {
  if (!BUILDER_API_KEY) {
    console.warn('Builder.io API key not configured')
    return null
  }

  try {
    const page = await builder
      .get('page', {
        userAttributes: {
          urlPath,
        },
        options: {
          enrich: true,
        },
      })
      .toPromise()

    return page
  } catch (error) {
    console.error('Failed to fetch Builder page:', error)
    return null
  }
}

/**
 * Fetch a Builder.io section/block by model and query
 */
export async function getBuilderSection(
  modelName: string,
  query?: Record<string, any>
) {
  if (!BUILDER_API_KEY) {
    return null
  }

  try {
    const content = await builder
      .get(modelName, {
        query,
        options: {
          enrich: true,
        },
      })
      .toPromise()

    return content
  } catch (error) {
    console.error(`Failed to fetch Builder ${modelName}:`, error)
    return null
  }
}

/**
 * Fetch multiple Builder.io sections by model
 */
export async function getBuilderSections(
  modelName: string,
  options?: {
    limit?: number
    query?: Record<string, any>
  }
) {
  if (!BUILDER_API_KEY) {
    return []
  }

  try {
    const content = await builder
      .getAll(modelName, {
        limit: options?.limit || 10,
        query: options?.query,
        options: {
          enrich: true,
        },
      })

    return content
  } catch (error) {
    console.error(`Failed to fetch Builder ${modelName} list:`, error)
    return []
  }
}
