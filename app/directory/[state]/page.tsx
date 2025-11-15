import DirectoryView from '@/components/directory/DirectoryView'
import StateDetailView from '@/components/directory/StateDetailView'
import { promises as fs } from 'fs'
import path from 'path'
import { getStateNameFromCode } from '@/lib/state-utils'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateName = getStateNameFromCode(state)

  return {
    title: `${stateName} Water Conservation Programs | Greywater & Rainwater Rebates`,
    description: `Find greywater systems, rainwater harvesting rebates, and water conservation programs in ${stateName}. Browse by county and city for local incentives and grants.`,
    keywords: `${stateName} greywater rebates, ${stateName} rainwater harvesting, ${state} water conservation, ${stateName} water rebates`
  }
}

async function getStateData(stateCode: string) {
  try {
    const filePath = path.join(process.cwd(), 'greywater-state-directory.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    // Get state name from code
    const stateName = getStateNameFromCode(stateCode)
    
    if (stateName && data.states[stateName]) {
      return {
        ...data.states[stateName],
        state_name: stateName,
        state_code: stateCode.toUpperCase()
      }
    }
    
    return null
  } catch (error) {
    console.error('Error loading state data:', error)
    return null
  }
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params
  const stateData = await getStateData(state)
  
  return (
    <DirectoryView 
      level="counties"
      initialState={state}
      stateData={stateData}
      showStateDetail={true}
    />
  )
}