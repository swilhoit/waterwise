import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getStateNameFromCode } from '@/lib/state-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stateCode = searchParams.get('state')
    
    if (!stateCode) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'State code is required' 
      }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'greywater-state-directory.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    // Get state name from code
    const stateName = getStateNameFromCode(stateCode)
    
    if (!stateName) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Invalid state code' 
      }, { status: 404 })
    }
    
    if (!data.states[stateName]) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'State data not found' 
      }, { status: 404 })
    }

    const stateData = {
      ...data.states[stateName],
      state_name: stateName,
      state_code: stateCode.toUpperCase()
    }

    return NextResponse.json({ 
      status: 'success', 
      data: stateData 
    })
    
  } catch (error) {
    console.error('Error fetching state data:', error)
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to fetch state data' 
    }, { status: 500 })
  }
}