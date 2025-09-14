import { createStorefrontApiClient } from '@shopify/storefront-api-client'

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'dummy-store.myshopify.com'
const publicAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'dummy-token'

const client = createStorefrontApiClient({
  storeDomain,
  apiVersion: '2024-10',
  publicAccessToken,
})

export function isShopifyConfigured() {
  // For blog access, we need the admin API token
  const hasAdminAccess = !!process.env.SHOPIFY_ACCESS_TOKEN
  
  // For storefront access (products)
  const hasStorefrontAccess = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && 
         process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN !== 'dummy-store.myshopify.com' &&
         process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
         process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN !== 'dummy-token'
  
  // Return true if either admin or storefront is configured
  return hasAdminAccess || hasStorefrontAccess
}

export async function getProducts() {
  if (!isShopifyConfigured()) {
    return []
  }

  const query = `
    query getProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(query)
    if (errors) {
      console.error('Shopify API errors:', errors)
      return []
    }
    return data?.products?.edges?.map((edge: any) => edge.node) || []
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export async function getProduct(handle: string) {
  if (!isShopifyConfigured()) {
    return null
  }

  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(query, {
      variables: { handle },
    })
    if (errors) {
      console.error('Shopify API errors:', errors)
      return null
    }
    return data?.product || null
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

export async function createCheckout(variantId: string, quantity: number = 1) {
  if (!isShopifyConfigured()) {
    return null
  }

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(mutation, {
      variables: {
        input: {
          lineItems: [
            {
              variantId,
              quantity,
            },
          ],
        },
      },
    })
    
    if (errors) {
      console.error('Shopify API errors:', errors)
      return null
    }
    
    return data?.checkoutCreate?.checkout || null
  } catch (error) {
    console.error('Failed to create checkout:', error)
    return null
  }
}

// Blog functions using Shopify Storefront API
export async function getBlogs() {
  if (!isShopifyConfigured()) {
    return []
  }

  const query = `
    query GetBlogs {
      blogs(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(query)
    
    if (errors) {
      console.error('Failed to fetch blogs:', errors)
      return []
    }

    return data?.blogs?.edges?.map((edge: any) => edge.node) || []
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

export async function getBlogArticles(blogHandle?: string) {
  if (!isShopifyConfigured()) {
    return []
  }

  // Default to fetching from the main blog
  const handle = blogHandle || 'greywater-education'
  
  const query = `
    query GetBlogArticles($handle: String!) {
      blog(handle: $handle) {
        articles(first: 100) {
          edges {
            node {
              id
              title
              handle
              publishedAt
              excerpt
              content
              contentHtml
              image {
                url
                altText
              }
              authorV2 {
                name
              }
            }
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(query, {
      variables: { handle },
    })
    
    if (errors) {
      console.error('Failed to fetch blog articles:', errors)
      return []
    }

    const articles = data?.blog?.articles?.edges?.map((edge: any) => {
      const article = edge.node
      return {
        id: article.id,
        title: article.title,
        handle: article.handle,
        published_at: article.publishedAt,
        summary_html: article.excerpt,
        body_html: article.contentHtml || article.content,
        image: article.image ? { src: article.image.url } : null,
        author: article.authorV2?.name || 'Water Wise Team'
      }
    }) || []

    return articles
  } catch (error) {
    console.error('Failed to fetch blog articles:', error)
    return []
  }
}

export async function getBlogArticle(handle: string) {
  if (!isShopifyConfigured()) {
    return null
  }

  // Fetch from the main blog
  const articles = await getBlogArticles('greywater-education')
  return articles.find((article: any) => article.handle === handle) || null
}

// Product Reviews API functions - server-side only
export async function getProductReviews(productId: string) {
  // Only run on server-side to avoid CORS issues
  if (typeof window !== 'undefined') {
    return []
  }
  
  if (!isShopifyConfigured()) {
    return []
  }

  const query = `
    query getProductReviews($id: ID!) {
      product(id: $id) {
        id
        metafields(first: 50, namespace: "reviews") {
          edges {
            node {
              key
              value
              type
            }
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(query, {
      variables: { id: productId },
    })
    
    if (errors && Array.isArray(errors) && errors.length > 0) {
      console.error('GraphQL errors fetching product reviews:', errors)
      return []
    }

    // Parse reviews from metafields
    const reviewsData = data?.product?.metafields?.edges || []
    const reviews = reviewsData
      .map((edge: any) => {
        try {
          const value = edge.node.value
          // Handle different metafield types
          if (typeof value === 'string') {
            return JSON.parse(value)
          }
          return value
        } catch (e) {
          console.warn('Could not parse review metafield:', e)
          return null
        }
      })
      .filter(Boolean)

    return reviews
  } catch (error) {
    console.error('Failed to fetch product reviews:', error)
    return []
  }
}

// Alternative approach using Admin API for reviews (requires SHOPIFY_ACCESS_TOKEN) - server-side only
export async function getProductReviewsAdmin(productId: string) {
  // Only run on server-side
  if (typeof window !== 'undefined') {
    return []
  }
  
  const adminAccessToken = process.env.SHOPIFY_ACCESS_TOKEN
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  if (!adminAccessToken || !storeDomain) {
    return []
  }

  // Extract numeric ID from Shopify GID
  const numericId = productId.replace('gid://shopify/Product/', '')

  try {
    // Try to fetch reviews using Shopify's built-in reviews (if enabled)
    const response = await fetch(
      `https://${storeDomain}/admin/api/2024-10/products/${numericId}/reviews.json`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      // Reviews API might not be available - this is normal
      return []
    }

    const data = await response.json()
    return data.reviews || []
  } catch (error) {
    // Silent fail - reviews API is often not available
    return []
  }
}

// Fetch reviews from popular review apps (Judge.me, Yotpo, etc.) - server-side only
export async function getThirdPartyReviews(productHandle: string) {
  // Only run on server-side to avoid CORS issues
  if (typeof window !== 'undefined') {
    return []
  }
  
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  if (!storeDomain) {
    return []
  }

  try {
    // Only attempt third-party APIs if we have the necessary tokens
    const judgeMeToken = process.env.JUDGEME_API_TOKEN
    const yotpoAppKey = process.env.YOTPO_APP_KEY

    if (judgeMeToken) {
      try {
        const judgeMeResponse = await fetch(
          `https://judge.me/api/v1/reviews?shop_domain=${storeDomain}&product_handle=${productHandle}&per_page=50&api_token=${judgeMeToken}`,
          { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )

        if (judgeMeResponse.ok) {
          const judgeMeData = await judgeMeResponse.json()
          return judgeMeData.reviews?.map((review: any) => ({
            id: review.id,
            name: review.reviewer?.name || 'Anonymous',
            rating: review.rating,
            review: review.body,
            created_at: review.created_at,
            verified_buyer: review.verified_buyer,
            helpful_count: review.helpful_count,
            images: review.pictures?.map((pic: any) => ({
              url: pic.urls?.original || pic.urls?.large || pic.urls?.medium || pic.url,
              alt: pic.alt || `Review image by ${review.reviewer?.name || 'Anonymous'}`,
              thumbnail: pic.urls?.thumb || pic.urls?.small || pic.urls?.medium || pic.url
            })) || [],
            source: 'judge.me'
          })) || []
        }
      } catch (error) {
        // Silent fail for Judge.me
      }
    }

    if (yotpoAppKey) {
      try {
        const yotpoResponse = await fetch(
          `https://api.yotpo.com/v1/apps/${yotpoAppKey}/products/${productHandle}/reviews.json`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )

        if (yotpoResponse.ok) {
          const yotpoData = await yotpoResponse.json()
          return yotpoData.reviews?.map((review: any) => ({
            id: review.id,
            name: review.user_name || 'Anonymous',
            rating: review.score,
            review: review.content,
            created_at: review.created_at,
            verified_buyer: review.verified_buyer,
            helpful_count: review.votes_up,
            images: review.images?.map((img: any) => ({
              url: img.original_url || img.big_url || img.medium_url || img.small_url,
              alt: img.alt || `Review image by ${review.user_name || 'Anonymous'}`,
              thumbnail: img.small_url || img.medium_url || img.big_url || img.original_url
            })) || [],
            source: 'yotpo'
          })) || []
        }
      } catch (error) {
        // Silent fail for Yotpo
      }
    }

    return []
  } catch (error) {
    // Silent fail for third-party reviews
    return []
  }
}

// Main function to get all reviews for a product
export async function getAllProductReviews(product: any) {
  if (!product) return []

  try {
    // Try multiple sources and combine results
    const [shopifyReviews, adminReviews, thirdPartyReviews] = await Promise.all([
      getProductReviews(product.id),
      getProductReviewsAdmin(product.id),
      getThirdPartyReviews(product.handle)
    ])

    // Combine all reviews and remove duplicates
    const allReviews = [...shopifyReviews, ...adminReviews, ...thirdPartyReviews]
    
    // Sort by creation date (newest first)
    return allReviews
      .filter(review => review && review.rating && review.review)
      .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
      .slice(0, 50) // Limit to 50 most recent reviews
  } catch (error) {
    console.error('Failed to fetch all product reviews:', error)
    return []
  }
}