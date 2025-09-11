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