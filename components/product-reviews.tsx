'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ThumbsUp, Calendar, ShieldCheck, ChevronDown, ChevronUp, ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ReviewImage {
  url: string
  alt: string
  thumbnail: string
}

interface Review {
  id: string | number
  name: string
  rating: number
  review: string
  created_at?: string
  verified_buyer?: boolean
  helpful_count?: number
  source?: string
  images?: ReviewImage[]
}

interface ProductReviewsProps {
  product: any
  fallbackReviews?: Review[]
}

export function ProductReviews({ product, fallbackReviews = [] }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest')
  const [selectedImage, setSelectedImage] = useState<ReviewImage | null>(null)

  // Fetch reviews on component mount
  useEffect(() => {
    async function fetchReviews() {
      if (!product?.id) {
        setLoading(false)
        return
      }

      try {
        // Extract numeric ID for API call
        const numericId = product.id.replace('gid://shopify/Product/', '')
        const response = await fetch(`/api/reviews/${numericId}?handle=${encodeURIComponent(product.handle || '')}`)
        
        if (response.ok) {
          const data = await response.json()
          
          if (data.reviews && data.reviews.length > 0) {
            // Transform API reviews to our format
            const transformedReviews = data.reviews.map((review: any) => ({
              id: review.id || Math.random().toString(),
              name: review.name || review.user_name || review.reviewer?.name || 'Anonymous',
              rating: review.rating || review.score || 5,
              review: review.review || review.content || review.body || '',
              created_at: review.created_at,
              verified_buyer: review.verified_buyer,
              helpful_count: review.helpful_count || review.votes_up || 0,
              source: review.source || 'shopify',
              images: review.images || []
            }))

            setReviews(transformedReviews)
          } else {
            // Use fallback reviews if no API reviews found
            setReviews(fallbackReviews)
          }
        } else {
          // API failed, use fallback reviews
          setReviews(fallbackReviews)
        }
      } catch (error) {
        console.error('Failed to fetch reviews from API:', error)
        setReviews(fallbackReviews)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [product, fallbackReviews])

  // Sort reviews based on selected criteria
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      case 'oldest':
        return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Calculate review statistics
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }))

  // Show limited or all reviews
  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 6)

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return ''
    }
  }

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`${starSize} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card className="bg-white border border-gray-200 rounded-xl">
        <CardContent className="p-8 text-center">
          <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
          <p className="text-gray-600">Be the first to review this product!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Star className="h-5 w-5 text-gray-600" />
            Customer Reviews ({reviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <div>
                  {renderStars(Math.round(averageRating), 'lg')}
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-6">{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Highlights */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Review Highlights</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Quality</span>
                  {renderStars(5)}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Performance</span>
                  {renderStars(5)}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Value</span>
                  {renderStars(5)}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Installation</span>
                  {renderStars(4)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              Customer Feedback
            </CardTitle>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'rating')}
                className="text-sm border border-gray-200 rounded px-2 py-1 bg-white"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {displayedReviews.map((review, index) => (
              <div key={review.id || index} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {renderStars(review.rating)}
                    <span className="font-semibold text-gray-900">{review.name}</span>
                    {review.verified_buyer && (
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {review.source && review.source !== 'shopify' && (
                      <Badge variant="outline" className="text-xs">
                        {review.source}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {review.created_at && (
                      <>
                        <Calendar className="h-3 w-3" />
                        {formatDate(review.created_at)}
                      </>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-3">"{review.review}"</p>
                
                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {review.images.slice(0, 4).map((image, imageIndex) => (
                        <div key={imageIndex} className="relative">
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                          >
                            <Image
                              src={image.thumbnail}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </button>
                          {imageIndex === 3 && review.images!.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                              +{review.images!.length - 4}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      {review.images.length} image{review.images.length !== 1 ? 's' : ''} from customer
                    </p>
                  </div>
                )}
                
                {review.helpful_count && review.helpful_count > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{review.helpful_count} found this helpful</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {reviews.length > 6 && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show All {reviews.length} Reviews
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}