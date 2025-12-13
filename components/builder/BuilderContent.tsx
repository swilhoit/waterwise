'use client'

import { useEffect, useState } from 'react'
import { BuilderComponent, builder } from '@builder.io/react'

// Import registry to ensure all custom components are registered
import './builder-registry'

interface BuilderContentProps {
  model: string
  content?: any
  apiKey?: string
  // For querying specific content
  query?: Record<string, any>
  // Fallback component if no Builder content
  fallback?: React.ReactNode
  // Additional data to pass to the Builder component
  data?: Record<string, any>
}

export function BuilderContent({
  model,
  content: initialContent,
  apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '',
  query,
  fallback = null,
  data,
}: BuilderContentProps) {
  const [content, setContent] = useState(initialContent)
  const [loading, setLoading] = useState(!initialContent && !!query)

  useEffect(() => {
    // Initialize builder if needed
    if (apiKey) {
      builder.init(apiKey)
    }

    // Fetch content if not provided and query exists
    if (!initialContent && query && apiKey) {
      builder
        .get(model, {
          query,
          options: {
            enrich: true,
          },
        })
        .toPromise()
        .then((result) => {
          setContent(result)
          setLoading(false)
        })
        .catch((error) => {
          console.error(`Failed to fetch Builder ${model}:`, error)
          setLoading(false)
        })
    }
  }, [initialContent, model, apiKey, query])

  if (loading) {
    return (
      <div className="animate-pulse py-8">
        <div className="container mx-auto px-4">
          <div className="h-32 bg-gray-100 rounded-lg" />
        </div>
      </div>
    )
  }

  if (!content) {
    return <>{fallback}</>
  }

  return (
    <BuilderComponent
      content={content}
      model={model}
      apiKey={apiKey}
      data={data}
    />
  )
}
