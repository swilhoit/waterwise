require('dotenv').config({ path: '.env.local' })
const fetch = require('node-fetch')

// Shopify Admin API configuration
const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN

// Helper function to make Shopify API requests
async function shopifyRequest(endpoint) {
  const url = `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-01/${endpoint}`
  const response = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    throw new Error(`Shopify API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

async function auditSiteContent() {
  console.log('🔍 Starting comprehensive site content audit...\n')

  try {
    // 1. Products audit
    console.log('📦 PRODUCT CONTENT AUDIT')
    console.log('=' .repeat(50))
    
    const productsResponse = await shopifyRequest('products.json?limit=250')
    const products = productsResponse.products
    
    console.log(`Found ${products.length} products in Shopify store:\n`)
    
    for (const product of products) {
      console.log(`📋 Product: ${product.title}`)
      console.log(`   Handle: ${product.handle}`)
      console.log(`   Status: ${product.status}`)
      console.log(`   Price: $${product.variants[0]?.price || 'N/A'}`)
      console.log(`   Description length: ${product.body_html?.length || 0} chars`)
      console.log(`   Images: ${product.images.length}`)
      console.log(`   Variants: ${product.variants.length}`)
      console.log(`   Tags: ${product.tags}`)
      console.log(`   Created: ${product.created_at}`)
      console.log('---')
    }

    // 2. Store information audit
    console.log('\n🏪 STORE INFORMATION AUDIT')
    console.log('=' .repeat(50))
    
    const shopResponse = await shopifyRequest('shop.json')
    const shop = shopResponse.shop
    
    console.log(`Store Name: ${shop.name}`)
    console.log(`Email: ${shop.email}`)
    console.log(`Phone: ${shop.phone}`)
    console.log(`Address: ${shop.address1}`)
    console.log(`City: ${shop.city}`)
    console.log(`Province: ${shop.province}`)
    console.log(`Country: ${shop.country_name}`)
    console.log(`Zip: ${shop.zip}`)
    console.log(`Domain: ${shop.domain}`)
    console.log(`Currency: ${shop.currency}`)
    console.log(`Timezone: ${shop.iana_timezone}`)
    console.log(`Plan: ${shop.plan_name}`)

    // 3. Collections audit
    console.log('\n📚 COLLECTIONS AUDIT')
    console.log('=' .repeat(50))
    
    const collectionsResponse = await shopifyRequest('collections.json')
    const collections = collectionsResponse.collections
    
    console.log(`Found ${collections.length} collections:\n`)
    for (const collection of collections) {
      console.log(`📂 ${collection.title}`)
      console.log(`   Handle: ${collection.handle}`)
      console.log(`   Description: ${collection.body_html ? collection.body_html.substring(0, 100) + '...' : 'No description'}`)
      console.log(`   Products count: ${collection.products_count || 0}`)
      console.log('---')
    }

    // 4. Pages audit
    console.log('\n📄 PAGES AUDIT')
    console.log('=' .repeat(50))
    
    const pagesResponse = await shopifyRequest('pages.json')
    const pages = pagesResponse.pages
    
    console.log(`Found ${pages.length} pages:\n`)
    for (const page of pages) {
      console.log(`📄 ${page.title}`)
      console.log(`   Handle: ${page.handle}`)
      console.log(`   Content length: ${page.body_html?.length || 0} chars`)
      console.log(`   Published: ${page.published_at ? 'Yes' : 'No'}`)
      console.log(`   Created: ${page.created_at}`)
      console.log('---')
    }

    // 5. Metafields audit (additional content)
    console.log('\n🏷️  METAFIELDS AUDIT')
    console.log('=' .repeat(50))
    
    try {
      const metafieldsResponse = await shopifyRequest('metafields.json')
      const metafields = metafieldsResponse.metafields
      
      console.log(`Found ${metafields.length} metafields`)
      for (const metafield of metafields.slice(0, 10)) { // Show first 10
        console.log(`🏷️  ${metafield.namespace}.${metafield.key}`)
        console.log(`   Value: ${metafield.value?.substring(0, 100)}...`)
        console.log(`   Type: ${metafield.type}`)
        console.log('---')
      }
    } catch (error) {
      console.log('No accessible metafields or permission limited')
    }

    // 6. Store policies audit
    console.log('\n📜 POLICIES AUDIT')
    console.log('=' .repeat(50))
    
    const policiesResponse = await shopifyRequest('policies.json')
    const policies = policiesResponse.policies
    
    console.log(`Found ${policies.length} policies:\n`)
    for (const policy of policies) {
      console.log(`📜 ${policy.title}`)
      console.log(`   Handle: ${policy.handle}`)
      console.log(`   Content length: ${policy.body?.length || 0} chars`)
      console.log(`   Created: ${policy.created_at}`)
      console.log('---')
    }

    console.log('\n✅ CONTENT AUDIT COMPLETED')
    console.log('=' .repeat(50))
    console.log('Review the above information to ensure your Next.js site has all the correct content.')

  } catch (error) {
    console.error('❌ Audit failed:', error.message)
    process.exit(1)
  }
}

// Run the audit
auditSiteContent()