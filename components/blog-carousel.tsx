"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type BlogCarouselPost = {
  id: string | number
  title: string
  excerpt: string
  image: string
  author?: string
  date?: string
  slug: string
}

export function BlogCarousel({ posts, title = "From the Blog", description = "Insights, guides, and tips on greywater and water conservation" }: { posts: BlogCarouselPost[]; title?: string; description?: string }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }

  if (!posts || posts.length === 0) return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-lg text-gray-600">{description}</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Previous" onClick={() => scrollByAmount(-360)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next" onClick={() => scrollByAmount(360)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Hide scrollbar for WebKit */}
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            {posts.map((post) => (
              <div key={post.id} className="min-w-[320px] max-w-[320px] snap-start">
                <Card className="h-full overflow-hidden hover-lift transition-all duration-300 border-0">
                  <CardHeader className="p-0">
                    <Link href={`/blog/${post.slug}`} className="relative block">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-44 object-cover"
                      />
                    </Link>
                  </CardHeader>
                  <CardContent className="p-5">
                    <CardTitle className="text-lg leading-snug mb-2 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="text-gray-600 mb-0 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/blog">View all articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
