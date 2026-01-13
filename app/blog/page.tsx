import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import { getBlogArticles } from "@/lib/shopify"
import { BreadcrumbSchema } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: 'Greywater Education Blog | Water Conservation Tips & Guides | Water Wise Group',
  description: 'Expert guides on greywater recycling, water conservation, and sustainable irrigation. Learn about greywater systems, installation tips, maintenance, and state regulations.',
  keywords: [
    'greywater blog',
    'water conservation tips',
    'greywater recycling guide',
    'greywater system installation',
    'water saving tips',
    'sustainable irrigation',
    'greywater laws',
    'greywater maintenance',
  ],
  openGraph: {
    title: 'Greywater Education Blog | Water Wise Group',
    description: 'Expert guides on greywater recycling, water conservation, and sustainable irrigation. Learn how to save water and create a thriving landscape.',
    url: 'https://waterwisegroup.com/blog',
    siteName: 'Water Wise Group',
    type: 'website',
    images: [
      {
        url: 'https://waterwisegroup.com/images/gwdd-gravity.jpg',
        width: 1200,
        height: 630,
        alt: 'Water Wise Group Greywater Education Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greywater Education Blog | Water Wise Group',
    description: 'Expert guides on greywater recycling, water conservation, and sustainable irrigation.',
    images: ['https://waterwisegroup.com/images/gwdd-gravity.jpg'],
  },
  alternates: {
    canonical: 'https://waterwisegroup.com/blog',
  },
}

export default async function Blog() {
  let blogPosts: any[] = []
  
  try {
    // Only use real Shopify articles
    const shopifyArticles = await getBlogArticles()
    
    if (shopifyArticles && shopifyArticles.length > 0) {
      // Transform Shopify articles to match our expected format
      blogPosts = shopifyArticles.map((article: any) => ({
        id: article.id,
        title: article.title,
        excerpt: article.summary_html || (article.body_html ? article.body_html.replace(/<[^>]*>/g, '').substring(0, 150).trim() + '...' : "Read more about this topic..."),
        image: article.image?.src || "/images/gwdd-gravity.jpg",
        author: article.author || "Water Wise Team",
        date: article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : "Recent",
        readTime: "5 min read",
        slug: article.handle || `article-${article.id}`
      }))
    }
  } catch (error) {
    console.error('Failed to load blog posts from Shopify:', error)
    // No fallback - only show real articles
  }
  return (
    <div>
      {/* Schema.org structured data */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://waterwisegroup.com' },
          { name: 'Blog', url: 'https://waterwisegroup.com/blog' },
        ]}
      />

      <section className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and insights in water conservation and greywater recycling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">
                  Blog articles are currently being loaded from our content management system.
                </p>
                <p className="text-gray-500 mt-2">
                  Please check back soon for the latest water conservation insights and tips.
                </p>
              </div>
            ) : (
              blogPosts.map((post: any) => (
              <Card key={post.id} className="hover-lift transition-all duration-300 overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-3 leading-tight">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 mb-4">
                    {post.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Categories
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Explore articles by topic to find exactly what you're looking for
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover-lift transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Installation Guides</h3>
                  <p className="text-sm text-gray-600 mb-4">Step-by-step installation tutorials and tips</p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/blog/category/installation">Browse</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Water Conservation</h3>
                  <p className="text-sm text-gray-600 mb-4">Tips and strategies for saving water</p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/blog/category/conservation">Browse</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">System Maintenance</h3>
                  <p className="text-sm text-gray-600 mb-4">Keep your system running efficiently</p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/blog/category/maintenance">Browse</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Case Studies</h3>
                  <p className="text-sm text-gray-600 mb-4">Real-world success stories</p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/blog/category/case-studies">Browse</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-blue-50 rounded-lg p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest water conservation tips and product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button size="lg" className="px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}