import { client, isSanityConfigured } from './sanity'

export async function getBlogPosts() {
  if (!isSanityConfigured()) {
    return []
  }
  
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        author,
        excerpt,
        publishedAt,
        readTime,
        category,
        tags,
        featured,
        mainImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `)
    return posts
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  if (!isSanityConfigured()) {
    return null
  }
  
  try {
    const post = await client.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        author,
        excerpt,
        publishedAt,
        readTime,
        category,
        tags,
        featured,
        mainImage {
          asset->{
            _id,
            url
          },
          alt
        },
        body
      }
    `, { slug })
    return post
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}

export async function getFeaturedBlogPosts() {
  if (!isSanityConfigured()) {
    return []
  }
  
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
        _id,
        title,
        slug,
        author,
        excerpt,
        publishedAt,
        readTime,
        category,
        mainImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `)
    return posts
  } catch (error) {
    console.error('Failed to fetch featured blog posts:', error)
    return []
  }
}

export async function getBlogPostsByCategory(category: string) {
  if (!isSanityConfigured()) {
    return []
  }
  
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost" && category == $category] | order(publishedAt desc) {
        _id,
        title,
        slug,
        author,
        excerpt,
        publishedAt,
        readTime,
        category,
        mainImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `, { category })
    return posts
  } catch (error) {
    console.error('Failed to fetch blog posts by category:', error)
    return []
  }
}