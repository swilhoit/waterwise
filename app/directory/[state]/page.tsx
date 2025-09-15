import DirectoryView from '@/components/directory/DirectoryView'
import StateDetailView from '@/components/directory/StateDetailView'
import { promises as fs } from 'fs'
import path from 'path'
import { getStateNameFromCode } from '@/lib/state-utils'

interface PageProps {
  params: Promise<{ state: string }>
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