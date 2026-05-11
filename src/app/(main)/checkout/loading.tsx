export default function CheckoutLoading() {
  return (
    <div className="px-6 py-5 mx-auto max-w-8xl max-[1200px]:px-4 max-[768px]:px-3.5">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-[10px] skeleton-shimmer" />
        <div className="flex flex-col gap-1.5">
          <div className="w-24 h-5 rounded-md skeleton-shimmer" />
          <div className="w-16 h-3.5 rounded-md skeleton-shimmer" />
        </div>
      </div>

      <div className="grid gap-5 items-start
                      grid-cols-[1fr_360px]
                      max-[1100px]:grid-cols-[1fr_320px]
                      max-[900px]:grid-cols-1">
        {/* Items skeleton */}
        <div className="bg-bg-elevated border border-border rounded-[20px] overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <div className="w-24 h-4 rounded-md skeleton-shimmer" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0">
              <div className="w-[68px] h-[68px] rounded-[14px] skeleton-shimmer flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="w-[60%] h-4 rounded-md skeleton-shimmer" />
                <div className="w-[40%] h-3 rounded-md skeleton-shimmer" />
                <div className="w-[30%] h-3.5 rounded-md skeleton-shimmer" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="w-7 h-7 rounded-[8px] skeleton-shimmer" />
                <div className="w-[4.5rem] h-7 rounded-[8px] skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* Summary skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-bg-elevated border border-border rounded-[20px] p-5">
              <div className="w-32 h-4 rounded-md skeleton-shimmer mb-4" />
              <div className="flex flex-col gap-2.5">
                {Array.from({ length: i === 2 ? 4 : 2 }).map((_, j) => (
                  <div key={j} className="w-full h-3.5 rounded-md skeleton-shimmer" />
                ))}
              </div>
              {i === 2 && <div className="w-full h-12 rounded-[14px] skeleton-shimmer mt-5" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
