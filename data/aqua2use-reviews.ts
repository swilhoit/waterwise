// Aqua2use product reviews imported from the original waterwisegroup.com site
// These reviews include images and are structured for Google rich snippet compatibility

export interface ReviewImage {
  url: string
  alt: string
  thumbnail: string
}

export interface Review {
  id: string
  name: string
  rating: number
  title?: string
  review: string
  created_at: string
  verified_buyer: boolean
  helpful_count: number
  source: string
  product: string
  variant?: string
  images?: ReviewImage[]
}

// Reviews for Aqua2use GWDD (both gravity and pump variants)
export const aqua2useGwddReviews: Review[] = [
  {
    id: "gwdd-review-1",
    name: "Selma K.",
    rating: 5,
    title: "Pure water for our trees",
    review: "We love the fact that we are sending pure water into our trees. This product is a wonderful investment!",
    created_at: "2024-12-15",
    verified_buyer: true,
    helpful_count: 12,
    source: "judge.me",
    product: "aqua2use-gwdd",
    variant: "GWDD - Includes Pump"
  },
  {
    id: "gwdd-review-2",
    name: "Raul C.",
    rating: 5,
    title: "Great customer service",
    review: "Love the people that work there. The owner answered all the question that I had.",
    created_at: "2024-11-28",
    verified_buyer: true,
    helpful_count: 8,
    source: "judge.me",
    product: "aqua2use-gwdd",
    variant: "Gravity - No Pump Included"
  },
  {
    id: "gwdd-review-3",
    name: "Mike E.",
    rating: 5,
    title: "Tiny house living for 7 years, work great!",
    review: "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan. The county reviewed our water discharge and had no inquiries. We are extremely satisfied with the system and would strongly recommend it.",
    created_at: "2024-10-15",
    verified_buyer: true,
    helpful_count: 24,
    source: "judge.me",
    product: "aqua2use-gwdd"
  },
  {
    id: "gwdd-review-4",
    name: "Dave A.",
    rating: 5,
    title: "Working great after 3 years",
    review: "We live in the desert, and water is scarce. When we built our house, we put in two sewer lines - one for black water into the septic, and one for gray water (showers, bathroom sink, laundry) into the garden. We were concerned about surface smell and deposits, so we buried our irrigation lines and the emitters are each in their own PVC pipe filled with gravel, about 12\" below the surface. It's been great to have all this additional water available for the garden.",
    created_at: "2024-09-20",
    verified_buyer: true,
    helpful_count: 31,
    source: "judge.me",
    product: "aqua2use-gwdd",
    images: [
      {
        url: "/images/reviews/dave-a-garden-setup.jpg",
        alt: "Customer garden irrigation setup with Aqua2use GWDD",
        thumbnail: "/images/reviews/dave-a-garden-setup.jpg"
      }
    ]
  },
  {
    id: "gwdd-review-5",
    name: "J.G.",
    rating: 5,
    title: "GWDD System 5 years STILL working perfectly!",
    review: "Received a GWDD pump unit in 2020 and has been performing top notch ever since. Original filters are holding up with regular cleanings monthly. I have it set up to either pump out into a natural swale or into a reed bed greywater filtration system that irrigates a garden most months. The pump performance is perfect to get up about 8 feet head over 75 feet distance. A check valve is needed to prevent the pipe volume from backflowing and refilling the tank. Reed bed has 3 legs of 30\" length of PVC (1 1/2\") with about 25 half inch outlet holes per leg. Works great! Waterwise has amazing customer service and product is well worth the investment and (as proven) holds up long term with regular maintenance to clean the filters. Again, top notch!",
    created_at: "2024-08-05",
    verified_buyer: true,
    helpful_count: 45,
    source: "judge.me",
    product: "aqua2use-gwdd",
    images: [
      {
        url: "/images/reviews/jg-reed-bed-1.jpeg",
        alt: "Reed bed greywater filtration system setup",
        thumbnail: "/images/reviews/jg-reed-bed-1.jpeg"
      },
      {
        url: "/images/reviews/jg-reed-bed-2.jpeg",
        alt: "GWDD pump unit installation",
        thumbnail: "/images/reviews/jg-reed-bed-2.jpeg"
      },
      {
        url: "/images/reviews/jg-reed-bed-3.jpeg",
        alt: "Garden irrigation with greywater",
        thumbnail: "/images/reviews/jg-reed-bed-3.jpeg"
      },
      {
        url: "/images/reviews/jg-reed-bed-4.jpeg",
        alt: "Complete greywater system overview",
        thumbnail: "/images/reviews/jg-reed-bed-4.jpeg"
      }
    ]
  },
  {
    id: "gwdd-review-6",
    name: "MrsT",
    rating: 5,
    title: "Exactly what I needed",
    review: "I used this system for my tiny house and love it! Best purchase I could have made.",
    created_at: "2024-07-12",
    verified_buyer: true,
    helpful_count: 15,
    source: "judge.me",
    product: "aqua2use-gwdd"
  }
]

// Reviews for Aqua2use Pro
export const aqua2useProReviews: Review[] = [
  {
    id: "pro-review-1",
    name: "John E.",
    rating: 5,
    title: "Great product!",
    review: "We really like the quality of construction and the filter system. The delivery was quick and it arrived in excellent shape. The installation instructions are a little vague especially with regards to the internal plumbing of the inlet and outlet. Better pictures would be nice. I would definitely recommend it!",
    created_at: "2024-11-10",
    verified_buyer: true,
    helpful_count: 18,
    source: "judge.me",
    product: "aqua2use-pro"
  }
]

// Combined reviews for all Aqua2use products (used on main product page)
export const allAqua2useReviews: Review[] = [
  ...aqua2useGwddReviews,
  ...aqua2useProReviews
]

// Helper function to get reviews by product handle
export function getReviewsByProduct(handle: string): Review[] {
  switch (handle) {
    case 'aqua2use-gwdd':
      return aqua2useGwddReviews
    case 'aqua2use-pro':
      return aqua2useProReviews
    case 'aqua2use':
      return allAqua2useReviews
    default:
      return []
  }
}

// Calculate aggregate rating stats for a set of reviews
export function getAggregateRating(reviews: Review[]) {
  if (reviews.length === 0) {
    return { ratingValue: 0, reviewCount: 0, bestRating: 5, worstRating: 1 }
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const ratingValue = totalRating / reviews.length

  return {
    ratingValue: Math.round(ratingValue * 10) / 10,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  }
}
