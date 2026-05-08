import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/layout/Sidebar'

function MainChartSkeleton() {
  return (
    <div className="w-full h-[140px] rounded-[10px] skeleton-shimmer" />
  )
}

function MealChartsSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="w-full h-[200px] rounded-[10px] skeleton-shimmer" />
      ))}
    </div>
  )
}

const MainChart  = dynamic(() => import('@/components/charts/MainChart').then(m => ({ default: m.MainChart })),  { ssr: false, loading: MainChartSkeleton })
const MealCharts = dynamic(() => import('@/components/charts/MealCharts').then(m => ({ default: m.MealCharts })), { ssr: false, loading: MealChartsSkeleton })

export default function DashboardPage() {
  return (
    <div className="flex items-start gap-5 px-6 py-5 mx-auto max-w-8xl
                    max-[1200px]:gap-4 max-[1200px]:px-4
                    max-[992px]:flex-col
                    max-[768px]:px-3.5 max-[768px]:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
        <MainChart />
        <hr className="border-border" />
        <MealCharts />
      </div>
    </div>
  )
}
