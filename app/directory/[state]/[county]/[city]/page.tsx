import DirectoryView from '@/components/directory/DirectoryView'

interface PageProps {
  params: Promise<{ state: string; county: string; city: string }>
}

export default async function CityPage({ params }: PageProps) {
  const { state, county, city } = await params
  
  return (
    <DirectoryView 
      level="cities"
      initialState={state}
      initialCounty={county}
      initialCity={city}
    />
  )
}