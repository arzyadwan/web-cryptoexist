export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-8"></div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            {/* Image Placeholder */}
            <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
            
            <div className="p-4">
              {/* Category Tag */}
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>
              
              {/* Title Lines */}
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
              
              {/* Meta Info */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}