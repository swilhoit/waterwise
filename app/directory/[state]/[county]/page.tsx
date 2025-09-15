import DirectoryView from '@/components/directory/DirectoryView'

interface PageProps {
  params: Promise<{ state: string; county: string }>
}

export default async function CountyPage({ params }: PageProps) {
  const { state, county } = await params
  
  return (
    <DirectoryView 
      level="cities"
      initialState={state}
      initialCounty={county}
    />
  )
}