import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import { getBlogArticle, getBlogArticles } from "@/lib/shopify"
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-markup"

// Default blog post content for fallback
const defaultBlogPosts: { [key: string]: any } = {
  "10-ways-greywater-recycling-transforms-home": {
    title: "10 Ways Greywater Recycling Can Transform Your Home",
    author: "Water Wise Team",
    publishedAt: "2024-03-15",
    readTime: 5,
    mainImage: "/images/gwdd-gravity.jpg",
    excerpt: "Discover how installing a greywater system can reduce your water bills, improve your garden, and increase your home's sustainability rating.",
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Greywater recycling is revolutionizing how homeowners approach water conservation and sustainability. By reusing water from sinks, showers, and washing machines, you can significantly reduce your environmental footprint while saving money on utility bills.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Here are 10 transformative ways greywater recycling can benefit your home:' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '1. Reduce Water Bills: Cut your water usage by 30-50% by reusing greywater for irrigation and toilet flushing.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '2. Improve Garden Health: Greywater contains nutrients that can benefit your plants and soil.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '3. Increase Property Value: Sustainable features like greywater systems are increasingly valued by buyers.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '4. Reduce Environmental Impact: Decrease your home\'s overall water consumption and wastewater production.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '5. Emergency Water Supply: Greywater systems can provide backup water during shortages.' }
        ]
      }
    ]
  },
  "understanding-greywater-basics": {
    title: "Understanding Greywater: What It Is and Why It Matters",
    author: "Sam Wilhoit",
    publishedAt: "2024-03-10",
    readTime: 7,
    mainImage: "/images/aqua2use-greywater-recycling-sytem.png",
    excerpt: "Learn the basics of greywater, where it comes from, and why recycling it is crucial for water conservation and environmental protection.",
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Greywater is wastewater generated from domestic activities such as laundry, dishwashing, and bathing. Unlike blackwater (from toilets), greywater is relatively clean and can be recycled for various non-potable uses.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Understanding greywater is the first step toward implementing sustainable water management practices in your home. This comprehensive guide will help you understand what greywater is, where it comes from, and why recycling it matters for both your wallet and the environment.' }
        ]
      }
    ]
  },
  "diy-vs-professional-installation": {
    title: "DIY vs Professional Installation: Which is Right for You?",
    author: "Water Wise Team",
    publishedAt: "2024-03-05",
    readTime: 4,
    mainImage: "/images/gwdd-ug.jpg",
    excerpt: "Explore the pros and cons of DIY installation versus hiring professionals for your greywater recycling system.",
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'When it comes to installing a greywater recycling system, you have two main options: do it yourself or hire professionals. Both approaches have their advantages and challenges.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'DIY Installation Pros: Lower upfront costs, complete control over the process, learning experience, flexible timeline.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'DIY Installation Cons: Requires technical knowledge, potential for mistakes, no warranty on installation, time-intensive.' }
        ]
      }
    ]
  }
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  let post = null

  // Try to get post from Shopify first
  try {
    const article = await getBlogArticle(slug)
    if (article) {
      post = {
        title: article.title,
        excerpt: article.summary_html?.replace(/<[^>]*>/g, '') ||
                 article.body_html?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
        image: article.image?.src || null,
        author: article.author || "Water Wise Team",
        publishedAt: article.published_at || new Date().toISOString(),
      }
    }
  } catch (error) {
    console.error('Failed to fetch blog post for metadata:', error)
  }

  // Fall back to default content
  if (!post && defaultBlogPosts[slug]) {
    const defaultPost = defaultBlogPosts[slug]
    post = {
      title: defaultPost.title,
      excerpt: defaultPost.excerpt,
      image: defaultPost.mainImage,
      author: defaultPost.author,
      publishedAt: defaultPost.publishedAt,
    }
  }

  // Return default metadata if post not found
  if (!post) {
    return {
      title: 'Blog Post Not Found | Water Wise Group',
      description: 'The requested blog post could not be found.',
    }
  }

  const title = `${post.title} | Water Wise Group`
  const description = post.excerpt || `Read about ${post.title} and learn more about greywater recycling and water conservation.`
  const url = `https://waterwisegroup.com/blog/${slug}`
  const imageUrl = post.image?.startsWith('http')
    ? post.image
    : post.image
      ? `https://waterwisegroup.com${post.image}`
      : 'https://waterwisegroup.com/images/gwdd-gravity.jpg'

  return {
    title,
    description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: 'Water Wise Group',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post = null
  
  // Try to get post from Shopify first
  try {
    const article = await getBlogArticle(slug)
    if (article) {
      post = {
        title: article.title,
        author: article.author || "Water Wise Team",
        publishedAt: article.published_at || new Date().toISOString(),
        readTime: 5,
        mainImage: article.image?.src || "/images/gwdd-gravity.jpg",
        excerpt: article.summary || "",
        body: article.body_html || article.content || ""
      }
    }
  } catch (error) {
    console.error('Failed to fetch blog post from Shopify:', error)
  }
  
  // Fall back to default content if no Shopify post found
  if (!post && defaultBlogPosts[slug]) {
    post = defaultBlogPosts[slug]
  }
  
  // If no post found at all, return 404
  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const articleUrl = `https://waterwisegroup.com/blog/${slug}`
  const imageUrl = typeof post.mainImage === 'string'
    ? (post.mainImage.startsWith('http') ? post.mainImage : `https://waterwisegroup.com${post.mainImage}`)
    : post.mainImage?.asset?.url || 'https://waterwisegroup.com/images/gwdd-gravity.jpg'

  return (
    <div>
      {/* Schema.org structured data */}
      <ArticleSchema
        article={{
          headline: post.title,
          description: post.excerpt || `Learn about ${post.title} and greywater recycling.`,
          image: imageUrl,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          author: post.author || "Water Wise Team",
          url: articleUrl,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://waterwisegroup.com' },
          { name: 'Blog', url: 'https://waterwisegroup.com/blog' },
          { name: post.title, url: articleUrl },
        ]}
      />

      {/* Header */}
      <section className="relative py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author || "Water Wise Team"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime || 5} min read</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.mainImage && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={typeof post.mainImage === 'string' ? post.mainImage : post.mainImage?.asset?.url || '/images/gwdd-gravity.jpg'}
                  alt={post.mainImage?.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:my-6 prose-li:text-gray-700 prose-strong:text-gray-900">
              {post.body ? (
                <div className="space-y-6">
                  {Array.isArray(post.body) ? post.body.map((block: any, index: number) => {
                    if (block._type === 'block' && block.children) {
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed">
                          {block.children.map((child: any) => child.text).join('')}
                        </p>
                      )
                    }
                    return null
                  }) : (
                    <div className="[&>p]:mb-4 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2" dangerouslySetInnerHTML={{ __html: post.body }} />
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p>This blog post content is currently being migrated to our new CMS. Please check back soon for the complete article.</p>
                  <p>In the meantime, you can explore our other articles or contact us directly for more information about greywater recycling systems.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center p-12">
              <CardContent className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Ready to Start Your Water Conservation Journey?
                </h2>
                <p className="text-xl text-gray-600">
                  Explore our range of greywater recycling systems and find the perfect solution for your home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
                    <Link href="/products">View Products</Link>
                  </Button>
                  <Button size="lg" asChild className="bg-black hover:bg-gray-800 text-white">
                    <Link href="/contact">Get Expert Advice</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

// Generate static params for known blog posts
export async function generateStaticParams() {
  try {
    const articles = await getBlogArticles()
    if (articles && articles.length > 0) {
      return articles.map((article: any) => ({
        slug: article.handle || article.slug
      }))
    }
  } catch (error) {
    console.error('Failed to generate static params:', error)
  }
  
  // Fall back to default slugs
  return Object.keys(defaultBlogPosts).map((slug) => ({
    slug: slug
  }))
}