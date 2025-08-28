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

// Blog functions using Shopify Admin API
export async function getBlogs() {
  if (!isShopifyConfigured()) {
    return []
  }

  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN

  if (!accessToken) {
    console.error('SHOPIFY_ACCESS_TOKEN is required for blog access')
    return []
  }

  try {
    const response = await fetch(`https://${shopDomain}/admin/api/2024-01/blogs.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch blogs:', response.statusText)
      return []
    }

    const data = await response.json()
    return data.blogs || []
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

export async function getBlogArticles(blogId?: string) {
  if (!isShopifyConfigured()) {
    return []
  }

  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN

  if (!accessToken) {
    console.error('SHOPIFY_ACCESS_TOKEN is required for blog access')
    return []
  }

  try {
    // If no blogId provided, fetch all articles from all blogs
    let allArticles: any[] = []
    
    if (!blogId) {
      const blogs = await getBlogs()
      for (const blog of blogs) {
        const response = await fetch(`https://${shopDomain}/admin/api/2024-01/blogs/${blog.id}/articles.json?limit=250`, {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          allArticles = [...allArticles, ...data.articles]
        }
      }
    } else {
      const response = await fetch(`https://${shopDomain}/admin/api/2024-01/blogs/${blogId}/articles.json?limit=250`, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        console.error('Failed to fetch articles:', response.statusText)
        return []
      }

      const data = await response.json()
      allArticles = data.articles || []
    }

    return allArticles
  } catch (error) {
    console.error('Failed to fetch blog articles:', error)
    return []
  }
}

export async function getBlogArticle(handle: string) {
  if (!isShopifyConfigured()) {
    return null
  }

  const articles = await getBlogArticles()
  return articles.find((article: any) => article.handle === handle) || null
}