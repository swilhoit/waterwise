import { createStorefrontApiClient } from '@shopify/storefront-api-client'

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
})

export async function getProducts() {
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