import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBuilderPage, shouldUseBuilder } from '@/lib/builder'
import { BuilderPageClient } from '@/components/builder/BuilderPageClient'

interface PageProps {
  params: Promise<{ page?: string[] }>
}

// Generate metadata from Builder.io page data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const urlPath = '/' + (resolvedParams.page?.join('/') || '')

  // Skip Builder for excluded paths
  if (!shouldUseBuilder(urlPath)) {
    return {}
  }

  const page = await getBuilderPage(urlPath)

  if (!page) {
    return {}
  }

  return {
    title: page.data?.title || 'Water Wise Group',
    description: page.data?.description,
    openGraph: {
      title: page.data?.title,
      description: page.data?.description,
      images: page.data?.image ? [{ url: page.data.image }] : [],
    },
  }
}

export default async function BuilderCatchAllPage({ params }: PageProps) {
  const resolvedParams = await params
  const urlPath = '/' + (resolvedParams.page?.join('/') || '')

  // Skip Builder for excluded paths - let Next.js handle 404 or existing routes
  if (!shouldUseBuilder(urlPath)) {
    notFound()
  }

  const page = await getBuilderPage(urlPath)

  // If no Builder content exists, return 404
  if (!page) {
    notFound()
  }

  return (
    <BuilderPageClient
      content={page}
      model="page"
      apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY || ''}
    />
  )
}

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60
