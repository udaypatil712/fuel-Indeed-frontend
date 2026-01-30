export default function Loader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {[1, 2, 3].map((i, ind) => (
        <div
          key={ind}
          className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden 
          border border-gray-200 shadow-sm animate-pulse"
        >
          {/* Image skeleton */}
          <div className="h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          {/* Content skeleton */}
          <div className="p-5 space-y-4">
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-200 rounded"></div>

            <div className="border-t pt-3 space-y-3">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
                <div className="h-3 w-12 bg-gray-300 rounded"></div>
              </div>

              <div className="flex justify-between">
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
                <div className="h-3 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="h-10 w-full bg-gray-300 rounded-xl mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
