import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLoading() {
  return (
    <div className="flex items-start gap-5 px-6 py-5 mx-auto max-w-8xl
                    max-[1200px]:gap-4 max-[1200px]:px-4
                    max-[992px]:flex-col
                    max-[768px]:px-3.5 max-[768px]:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
        <div className="w-full h-[140px] rounded-[10px] skeleton-shimmer" />
        <hr className="border-border" />
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="w-full h-[200px] rounded-[10px] skeleton-shimmer" />
          ))}
        </div>
      </div>
    </div>
  )
}
