import { NextResponse } from 'next/server'
import { getProduct } from '@/lib/shopify'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params
  const adminAccessToken = process.env.SHOPIFY_ACCESS_TOKEN
  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  if (!adminAccessToken || !shopDomain) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing SHOPIFY_ACCESS_TOKEN or SHOPIFY_SHOP_DOMAIN/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN',
      },
      { status: 400 }
    )
  }

  try {
    // Resolve product ID via Storefront API first
    let productId: string | null = null
    try {
      const product = await getProduct(handle)
      productId = product?.id || null
    } catch {
      // Ignore and fall back to Admin lookup below
    }

    // Fallback: resolve product ID via Admin GraphQL if needed
    if (!productId) {
      const resolveQuery = `#graphql
        query ResolveProductId($handle: String!) {
          productByHandle(handle: $handle) { id title handle }
        }
      `

      const resolveRes = await fetch(`https://${shopDomain}/admin/api/2024-10/graphql.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: resolveQuery, variables: { handle } }),
      })

      const resolveJson = await resolveRes.json()
      if (resolveJson?.errors?.length) {
        return NextResponse.json({ success: false, error: resolveJson.errors }, { status: 502 })
      }
      productId = resolveJson?.data?.productByHandle?.id || null
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, error: `Product not found for handle '${handle}'` },
        { status: 404 }
      )
    }

    // Fetch metafields for the product via Admin GraphQL
    const metafieldsQuery = `#graphql
      query ProductMetafields($id: ID!) {
        product(id: $id) {
          id
          handle
          title
          metafields(first: 250) {
            edges {
              node {
                id
                namespace
                key
                type
                value
              }
            }
          }
        }
      }
    `

    const mfRes = await fetch(`https://${shopDomain}/admin/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': adminAccessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: metafieldsQuery, variables: { id: productId } }),
    })

    const mfJson = await mfRes.json()
    if (mfJson?.errors?.length) {
      return NextResponse.json({ success: false, error: mfJson.errors }, { status: 502 })
    }

    const edges = mfJson?.data?.product?.metafields?.edges || []
    const metafields = edges.map((e: any) => e.node)

    return NextResponse.json({
      success: true,
      productId,
      handle,
      count: metafields.length,
      metafields,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 })
  }
}


