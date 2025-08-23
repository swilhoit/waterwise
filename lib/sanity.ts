import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || 'dcrrvv3m'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'

// Validate projectId format
const isValidProjectId = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(projectId)
if (!isValidProjectId && projectId !== 'dcrrvv3m') {
  console.warn(`Invalid Sanity projectId: ${projectId}. Using fallback.`)
}

export const client = createClient({
  projectId: isValidProjectId ? projectId : 'dcrrvv3m',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function isSanityConfigured() {
  const envProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
  return envProjectId && 
         envProjectId !== 'your_sanity_project_id' &&
         /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(envProjectId)
}