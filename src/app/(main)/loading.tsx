import { Sidebar } from '@/components/layout/Sidebar'

export default function Loading() {
  return (
    <div className="flex items-start gap-5 px-6 py-5 mx-auto max-w-8xl
                    max-[1200px]:gap-4 max-[1200px]:px-4
                    max-[992px]:flex-col
                    max-[768px]:px-3.5 max-[768px]:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      <Sidebar />

      {/* Content skeleton */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="h-10 rounded-xl bg-surface animate-pulse" />
        <div className="grid gap-[1.125rem]"
             style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-[20px] overflow-hidden bg-bg-card border border-border">
              <div className="h-[188px] skeleton-shimmer" />
              <div className="p-4 flex flex-col gap-2.5">
                <div className="h-[17px] w-[72%] rounded-md skeleton-shimmer" />
                <div className="h-[13px] w-[42%] rounded-md skeleton-shimmer" />
                <div className="h-[13px] w-[58%] rounded-md skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
