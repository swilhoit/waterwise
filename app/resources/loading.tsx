export default function DirectoryLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Hero skeleton */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border border-gray-200 p-8 mb-8">
          <div className="h-10 w-3/4 max-w-md bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-5 w-1/2 max-w-sm bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex gap-3">
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Regions skeleton */}
        {[1, 2, 3].map((region) => (
          <div key={region} className="mb-8">
            <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="flex gap-2">
                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
