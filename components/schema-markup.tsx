// Schema.org structured data components for SEO

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Water Wise Group",
    "url": "https://waterwisegroup.com",
    "logo": "https://waterwisegroup.com/images/logo.png",
    "description": "Water Wise Group is the exclusive U.S. distributor of Aqua2use Greywater Systems since 2010, helping homeowners conserve water through greywater recycling.",
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "postalCode": "30068",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-678-809-3008",
      "contactType": "sales",
      "email": "sales@waterwisegroup.com",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://facebook.com/waterwisegroup",
      "https://instagram.com/waterwisegreywater/",
      "https://youtube.com/user/WaterWiseGroup"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Water Wise Group",
    "url": "https://waterwisegroup.com",
    "description": "Greywater recycling systems for homes, RVs, tiny homes, and commercial properties. Save water with Aqua2use filtration systems.",
    "publisher": {
      "@type": "Organization",
      "name": "Water Wise Group"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://waterwisegroup.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProductSchema({ product }: { product: {
  name: string
  description: string
  image: string
  sku?: string
  price: string
  priceCurrency?: string
  availability?: string
  url: string
  brand?: string
  reviewCount?: number
  ratingValue?: number
}}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Aqua2use"
    },
    "offers": {
      "@type": "Offer",
      "url": product.url,
      "priceCurrency": product.priceCurrency || "USD",
      "price": product.price,
      "availability": product.availability || "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Water Wise Group"
      }
    },
    ...(product.reviewCount && product.ratingValue ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.ratingValue,
        "reviewCount": product.reviewCount
      }
    } : {})
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({ article }: { article: {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Water Wise Group",
      "logo": {
        "@type": "ImageObject",
        "url": "https://waterwisegroup.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Water Wise Group",
    "image": "https://waterwisegroup.com/images/logo.png",
    "@id": "https://waterwisegroup.com",
    "url": "https://waterwisegroup.com",
    "telephone": "+1-678-809-3008",
    "email": "sales@waterwisegroup.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "postalCode": "30068",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.9519,
      "longitude": -84.5251
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$625-$2695"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
