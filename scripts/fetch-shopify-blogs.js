require('dotenv').config({ path: '.env.local' })
const fetch = require('node-fetch')
const { createClient } = require('@sanity/client')

// Shopify Admin API configuration
const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

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

// Convert Shopify blog post to Sanity format
function convertToSanityFormat(shopifyPost, blogTitle = 'Greywater Education') {
  // Convert HTML content to Sanity blocks
  const htmlToBlocks = (html) => {
    if (!html) return []
    
    // Simple HTML to blocks conversion (for basic HTML)
    const paragraphs = html.split('<p>').filter(p => p.trim())
    
    return paragraphs.map(p => {
      const cleanText = p
        .replace(/<\/p>/g, '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .trim()
      
      if (!cleanText) return null
      
      return {
        _type: 'block',
        children: [{ 
          _type: 'span', 
          text: cleanText 
        }],
        markDefs: [],
        style: 'normal'
      }
    }).filter(Boolean)
  }

  return {
    _type: 'blogPost',
    _id: `blogPost-shopify-${shopifyPost.id}`,
    title: shopifyPost.title,
    slug: { 
      _type: 'slug', 
      current: shopifyPost.handle 
    },
    author: shopifyPost.author || 'Water Wise Group',
    publishedAt: shopifyPost.published_at || shopifyPost.created_at,
    excerpt: shopifyPost.summary || (shopifyPost.content ? shopifyPost.content.substring(0, 200) + '...' : ''),
    readTime: Math.max(1, Math.ceil((shopifyPost.content?.length || 0) / 1000)), // Rough estimate
    category: blogTitle.toLowerCase().replace(/\s+/g, '-'),
    tags: shopifyPost.tags ? shopifyPost.tags.split(',').map(tag => tag.trim()) : [],
    featured: false,
    body: htmlToBlocks(shopifyPost.content)
  }
}

// Main function to fetch and migrate blog content
async function fetchAndMigrateBlogs() {
  try {
    console.log('🔍 Fetching blogs from Shopify...')
    
    // Get all blogs
    const blogsResponse = await shopifyRequest('blogs.json')
    const blogs = blogsResponse.blogs
    
    console.log(`📚 Found ${blogs.length} blog(s) in Shopify`)
    
    for (const blog of blogs) {
      console.log(`\n📖 Processing blog: "${blog.title}"`)
      
      // Get all articles for this blog
      const articlesResponse = await shopifyRequest(`blogs/${blog.id}/articles.json?limit=250`)
      const articles = articlesResponse.articles
      
      console.log(`📝 Found ${articles.length} article(s) in "${blog.title}"`)
      
      // Convert each article to Sanity format
      const sanityPosts = articles.map(article => convertToSanityFormat(article, blog.title))
      
      // Migrate to Sanity
      for (const post of sanityPosts) {
        try {
          console.log(`   ⬆️  Migrating: "${post.title}"`)
          
          // Check if post already exists
          const existingPost = await sanityClient.getDocument(post._id).catch(() => null)
          
          if (existingPost) {
            console.log(`   ⚠️  Post already exists, updating: "${post.title}"`)
            await sanityClient.createOrReplace(post)
          } else {
            console.log(`   ✨ Creating new post: "${post.title}"`)
            await sanityClient.create(post)
          }
          
          console.log(`   ✅ Successfully migrated: "${post.title}"`)
        } catch (error) {
          console.error(`   ❌ Failed to migrate "${post.title}":`, error.message)
        }
      }
    }
    
    console.log('\n🎉 Blog migration completed!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run the migration
fetchAndMigrateBlogs()