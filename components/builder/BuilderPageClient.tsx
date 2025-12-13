'use client'

import { BuilderComponent, useIsPreviewing } from '@builder.io/react'

// Import registry to ensure all custom components are registered
import './builder-registry'

interface BuilderPageClientProps {
  content: any
  model: string
  apiKey: string
}

export function BuilderPageClient({ content, model, apiKey }: BuilderPageClientProps) {
  const isPreviewing = useIsPreviewing()

  // If no content and not previewing, show nothing (let 404 handle it)
  if (!content && !isPreviewing) {
    return null
  }

  return (
    <BuilderComponent
      content={content}
      model={model}
      apiKey={apiKey}
    />
  )
}
