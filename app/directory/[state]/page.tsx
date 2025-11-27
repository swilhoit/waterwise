import SimpleDirectoryView from '@/components/directory/SimpleDirectoryView'
import { getStateNameFromCode } from '@/lib/state-utils'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateName = getStateNameFromCode(state)

  return {
    title: `${stateName} Greywater Regulations | Permits & Rebates`,
    description: `Find greywater rules and rebates in ${stateName}. Search cities for local permit requirements and available incentives.`,
    keywords: `${stateName} greywater, ${stateName} greywater rebates, ${state} greywater permits, ${stateName} water conservation`
  }
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params
  return <SimpleDirectoryView initialState={state.toUpperCase()} />
}