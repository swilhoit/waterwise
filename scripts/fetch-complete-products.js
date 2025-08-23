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

async function fetchCompleteProductData() {
  try {
    console.log('🔍 Fetching complete product data from Shopify Admin API...\n')
    
    // Get all products with full details
    const productsResponse = await shopifyRequest('products.json?limit=250&fields=id,title,handle,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,images,options')
    const products = productsResponse.products

    console.log(`📦 Found ${products.length} products in Shopify:\n`)

    for (const product of products) {
      console.log(`🏷️  PRODUCT: ${product.title}`)
      console.log(`   ID: ${product.id}`)
      console.log(`   Handle: ${product.handle}`)
      console.log(`   Status: ${product.status}`)
      console.log(`   Product Type: ${product.product_type || 'Not set'}`)
      console.log(`   Vendor: ${product.vendor || 'Not set'}`)
      console.log(`   Tags: ${product.tags || 'None'}`)
      console.log(`   Published: ${product.published_at ? 'Yes' : 'No'}`)
      console.log(`   Created: ${product.created_at}`)
      console.log(`   Updated: ${product.updated_at}`)
      
      // Description/Content
      console.log(`\n   📝 DESCRIPTION:`)
      if (product.body_html) {
        const plainText = product.body_html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
        console.log(`   ${plainText.substring(0, 200)}${plainText.length > 200 ? '...' : ''}`)
        console.log(`   Length: ${product.body_html.length} chars`)
      } else {
        console.log(`   ⚠️  No description found`)
      }

      // Images
      console.log(`\n   🖼️  IMAGES (${product.images.length}):`)
      if (product.images.length === 0) {
        console.log(`   ⚠️  No images found`)
      } else {
        product.images.forEach((image, idx) => {
          console.log(`   ${idx + 1}. ${image.src}`)
          console.log(`      Alt: ${image.alt || 'No alt text'}`)
          console.log(`      Position: ${image.position}`)
        })
      }

      // Variants and Options
      console.log(`\n   💰 VARIANTS (${product.variants.length}):`)
      product.variants.forEach((variant, idx) => {
        console.log(`   ${idx + 1}. ${variant.title}`)
        console.log(`      ID: ${variant.id}`)
        console.log(`      Price: $${variant.price}`)
        console.log(`      Compare Price: ${variant.compare_at_price ? '$' + variant.compare_at_price : 'None'}`)
        console.log(`      SKU: ${variant.sku || 'None'}`)
        console.log(`      Inventory: ${variant.inventory_quantity || 'N/A'}`)
        console.log(`      Available: ${variant.available ? 'Yes' : 'No'}`)
        console.log(`      Weight: ${variant.weight || 'N/A'}`)
      })

      // Product Options
      console.log(`\n   ⚙️  PRODUCT OPTIONS (${product.options.length}):`)
      if (product.options.length === 0) {
        console.log(`   No product options`)
      } else {
        product.options.forEach((option, idx) => {
          console.log(`   ${idx + 1}. ${option.name}: [${option.values.join(', ')}]`)
          console.log(`      Position: ${option.position}`)
        })
      }

      // Get product metafields for additional content
      try {
        const metafieldsResponse = await shopifyRequest(`products/${product.id}/metafields.json`)
        const metafields = metafieldsResponse.metafields

        if (metafields.length > 0) {
          console.log(`\n   🏷️  METAFIELDS (${metafields.length}):`)
          metafields.forEach((metafield) => {
            console.log(`   ${metafield.namespace}.${metafield.key}: ${metafield.value}`)
            console.log(`      Type: ${metafield.type}`)
          })
        }
      } catch (error) {
        console.log(`\n   🏷️  METAFIELDS: Unable to fetch (${error.message})`)
      }

      console.log(`\n${'='.repeat(80)}\n`)
    }

    // Generate updated fallback products data
    console.log('🔧 GENERATING UPDATED FALLBACK PRODUCTS DATA:')
    console.log('Copy this data to update your fallback products:\n')
    
    const fallbackData = {}
    
    for (const product of products) {
      const variants = product.variants.map(variant => ({
        node: {
          id: `gid://shopify/ProductVariant/${variant.id}`,
          title: variant.title,
          priceV2: {
            amount: variant.price,
            currencyCode: 'USD'
          },
          availableForSale: variant.available
        }
      }))

      const images = product.images.map(image => ({
        node: {
          url: image.src,
          altText: image.alt || product.title
        }
      }))

      fallbackData[product.handle] = {
        id: `gid://shopify/Product/${product.id}`,
        title: product.title,
        description: product.body_html ? product.body_html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '',
        handle: product.handle,
        priceRange: {
          minVariantPrice: {
            amount: product.variants[0]?.price || '0.00',
            currencyCode: 'USD'
          }
        },
        images: {
          edges: images
        },
        variants: {
          edges: variants
        }
      }
    }

    console.log('const updatedFallbackProducts = ' + JSON.stringify(fallbackData, null, 2))

    console.log('\n✅ PRODUCT DATA ANALYSIS COMPLETE!')

  } catch (error) {
    console.error('❌ Failed to fetch product data:', error.message)
    process.exit(1)
  }
}

// Run the script
fetchCompleteProductData()