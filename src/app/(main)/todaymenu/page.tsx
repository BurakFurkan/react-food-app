import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/layout/Sidebar'

function CarouselSkeleton() {
  return (
    <div className="flex gap-3 w-full overflow-hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[280px] h-[380px] rounded-[20px] skeleton-shimmer" />
      ))}
    </div>
  )
}

const Carousel = dynamic(() => import('@/components/ui/Carousel').then(m => ({ default: m.Carousel })), { ssr: false, loading: CarouselSkeleton })

export default function TodayMenuPage() {
  return (
    <div className="flex items-start gap-5 px-6 py-5 mx-auto max-w-8xl
                    max-[1200px]:gap-4 max-[1200px]:px-4
                    max-[992px]:flex-col
                    max-[768px]:px-3.5 max-[768px]:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Carousel />
      </main>
    </div>
  )
}
