import { Sidebar }        from '@/components/layout/Sidebar'
import { Tabs }           from '@/components/ui/Tabs'
import { CategoryTabs }   from '@/components/ui/CategoryTabs'
import { SideCart }       from '@/components/ui/SideCart'
import { HomePagination } from '@/components/ui/HomePagination'
import { HomeInitializer } from '@/components/ui/HomeInitializer'

export default function HomePage() {
  return (
    <div className="flex items-start gap-5 px-6 py-5 mx-auto max-w-8xl
                    max-[1200px]:gap-4 max-[1200px]:px-4
                    max-[992px]:flex-col
                    max-[768px]:px-3.5 max-[768px]:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      <HomeInitializer />
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col gap-4">
        <CategoryTabs />
        <Tabs />
        <HomePagination />
      </main>
      <SideCart />
    </div>
  )
}
