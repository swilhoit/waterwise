import { NextRequest, NextResponse } from 'next/server'
import { getAllProductReviews } from '@/lib/shopify'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Create a minimal product object for the reviews function
    const product = {
      id: productId.startsWith('gid://') ? productId : `gid://shopify/Product/${productId}`,
      handle: request.nextUrl.searchParams.get('handle') || ''
    }

    const reviews = await getAllProductReviews(product)
    
    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews', reviews: [] }, { status: 500 })
  }
}

export const runtime = 'nodejs'