require('dotenv').config({ path: '.env.local' })

// Shopify Admin API configuration
const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN

console.log('Testing Shopify Blog Connection...')
console.log('Shop Domain:', SHOPIFY_SHOP_DOMAIN)
console.log('Access Token:', SHOPIFY_ACCESS_TOKEN ? 'Present' : 'Missing')

if (!SHOPIFY_ACCESS_TOKEN) {
  console.error('❌ SHOPIFY_ACCESS_TOKEN is missing! This is required to fetch blog posts.')
  process.exit(1)
}

// Test fetching blogs
async function testShopifyBlogs() {
  try {
    // First, get all blogs
    const blogsUrl = `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-01/blogs.json`
    console.log('\n📚 Fetching blogs from:', blogsUrl)
    
    const blogsResponse = await fetch(blogsUrl, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      }
    })

    if (!blogsResponse.ok) {
      console.error('❌ Failed to fetch blogs:', blogsResponse.status, blogsResponse.statusText)
      const errorText = await blogsResponse.text()
      console.error('Error details:', errorText)
      return
    }

    const blogsData = await blogsResponse.json()
    const blogs = blogsData.blogs || []
    
    console.log(`✅ Found ${blogs.length} blog(s) in Shopify`)
    
    if (blogs.length === 0) {
      console.log('ℹ️  No blogs found in your Shopify store. You need to create a blog in Shopify Admin first.')
      return
    }

    // For each blog, fetch articles
    for (const blog of blogs) {
      console.log(`\n📖 Blog: "${blog.title}" (ID: ${blog.id})`)
      
      const articlesUrl = `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-01/blogs/${blog.id}/articles.json?limit=10`
      const articlesResponse = await fetch(articlesUrl, {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        }
      })

      if (!articlesResponse.ok) {
        console.error(`❌ Failed to fetch articles for blog ${blog.title}:`, articlesResponse.status)
        continue
      }

      const articlesData = await articlesResponse.json()
      const articles = articlesData.articles || []
      
      console.log(`   Found ${articles.length} article(s)`)
      
      if (articles.length === 0) {
        console.log(`   ℹ️  No articles in this blog. Add articles in Shopify Admin.`)
      } else {
        articles.slice(0, 3).forEach((article, i) => {
          console.log(`   ${i + 1}. "${article.title}"`)
          console.log(`      - Handle: ${article.handle}`)
          console.log(`      - Published: ${article.published_at || 'Draft'}`)
        })
        if (articles.length > 3) {
          console.log(`   ... and ${articles.length - 3} more`)
        }
      }
    }
    
    console.log('\n✅ Shopify blog connection test completed successfully!')
    
  } catch (error) {
    console.error('❌ Error testing Shopify blogs:', error.message)
    console.error('Full error:', error)
  }
}

testShopifyBlogs()