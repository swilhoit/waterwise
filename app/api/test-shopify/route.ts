import { NextResponse } from 'next/server'
import { getBlogArticles } from '@/lib/shopify'

export async function GET() {
  const hasToken = !!process.env.SHOPIFY_ACCESS_TOKEN
  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  
  console.log('Testing Shopify Blog API...')
  console.log('SHOPIFY_ACCESS_TOKEN exists:', hasToken)
  console.log('SHOPIFY_SHOP_DOMAIN:', shopDomain)
  console.log('All env keys:', Object.keys(process.env).filter(k => k.includes('SHOPIFY')).join(', '))
  
  try {
    const articles = await getBlogArticles()
    console.log(`Found ${articles.length} articles`)
    
    return NextResponse.json({
      success: true,
      hasToken,
      shopDomain,
      articlesCount: articles.length,
      articles: articles.slice(0, 3).map((a: any) => ({
        title: a.title,
        handle: a.handle,
        published: a.published_at
      }))
    })
  } catch (error: any) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}