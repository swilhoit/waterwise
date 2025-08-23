import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import { getBlogArticles } from "@/lib/shopify"

const defaultBlogPosts = [
  {
    id: 1,
    title: "10 Ways Greywater Recycling Can Transform Your Home",
    excerpt: "Discover how installing a greywater system can reduce your water bills, improve your garden, and increase your home's sustainability rating.",
    image: "/images/gwdd-gravity.jpg",
    author: "Water Wise Team",
    date: "March 15, 2024",
    readTime: "5 min read",
    slug: "10-ways-greywater-recycling-transforms-home"
  },
  {
    id: 2,
    title: "Understanding Greywater: What It Is and Why It Matters",
    excerpt: "Learn the basics of greywater, where it comes from, and why recycling it is crucial for water conservation and environmental protection.",
    image: "/images/aqua2use-greywater-recycling-sytem.png",
    author: "Sarah Johnson",
    date: "March 10, 2024", 
    readTime: "7 min read",
    slug: "understanding-greywater-basics"
  },
  {
    id: 3,
    title: "DIY vs Professional Installation: Which is Right for You?",
    excerpt: "Explore the pros and cons of DIY installation versus hiring professionals for your greywater recycling system.",
    image: "/images/gwdd-ug.jpg",
    author: "Mike Chen",
    date: "March 5, 2024",
    readTime: "4 min read",
    slug: "diy-vs-professional-installation"
  },
  {
    id: 4,
    title: "Maximizing Water Savings: Best Practices for Greywater Systems",
    excerpt: "Tips and strategies to get the most water savings and environmental benefits from your greywater recycling system.",
    image: "/images/gwdd-gravity.jpg",
    author: "Emily Rodriguez", 
    date: "February 28, 2024",
    readTime: "6 min read",
    slug: "maximizing-water-savings-best-practices"
  },
  {
    id: 5,
    title: "The Future of Water Conservation in Residential Properties",
    excerpt: "Explore emerging trends in water conservation technology and what they mean for homeowners and property developers.",
    image: "/images/aqua2use-greywater-recycling-sytem.png",
    author: "David Thompson",
    date: "February 20, 2024",
    readTime: "8 min read",
    slug: "future-water-conservation-residential"
  },
  {
    id: 6,
    title: "Greywater Systems for Different Climates: What You Need to Know",
    excerpt: "How climate affects greywater system performance and what considerations to make for your specific region.",
    image: "/images/gwdd-ug.jpg",
    author: "Lisa Santos",
    date: "February 15, 2024",
    readTime: "5 min read",
    slug: "greywater-systems-different-climates"
  }
]

export default async function Blog() {
  let blogPosts = defaultBlogPosts
  
  try {
    const shopifyArticles = await getBlogArticles()
    
    if (shopifyArticles && shopifyArticles.length > 0) {
      // Transform Shopify articles to match our expected format
      const shopifyPostsFormatted = shopifyArticles.map((article: any) => ({
        id: article.id,
        title: article.title,
        excerpt: article.summary || article.content?.substring(0, 150) + '...' || "Read more about this topic...",
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
      
      blogPosts = shopifyPostsFormatted
    }
  } catch (error) {
    console.error('Failed to load blog posts from Shopify, using default posts:', error)
    // Fall back to default posts
  }
  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              Water Conservation <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              Expert insights, tips, and guides for sustainable water management and greywater recycling.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
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
            {blogPosts.map((post: any) => (
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
            ))}
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