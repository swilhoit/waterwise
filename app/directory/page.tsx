import DirectoryView from '@/components/directory/DirectoryView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Water Conservation Programs by State | Greywater & Rainwater Rebates Directory',
  description: 'Find greywater, rainwater harvesting, and water conservation rebates, grants, and programs across all 50 US states. Search by state, county, or city for local incentives.',
  keywords: 'greywater rebates, rainwater harvesting grants, water conservation programs, state water rebates, water efficiency incentives'
}

export default function DirectoryPage() {
  return <DirectoryView level="states" />
}