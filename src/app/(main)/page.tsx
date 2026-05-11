import { Suspense }        from 'react'
import { Sidebar }         from '@/components/layout/Sidebar'
import { CategoryTabs }    from '@/components/ui/CategoryTabs'
import { Tabs }            from '@/components/ui/Tabs'
import { SideCart }        from '@/components/ui/SideCart'
import { HomePagination }  from '@/components/ui/HomePagination'
import { HomeInitializer } from '@/components/ui/HomeInitializer'
import type { ProductsPayload } from '@/types'

const PAGE_SIZE = 12
const rng = (lo: number, hi: number) => Math.floor(Math.random() * (hi - lo + 1)) + lo

async function fetchInitialProducts(): Promise<ProductsPayload> {
  try {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken',
      { next: { revalidate: 300 } },   // 5-min server-side cache
    )
    if (!res.ok) return { menuItems: [] }
    const data = await res.json() as {
      meals: Array<{ idMeal: string; strMeal: string; strMealThumb: string }> | null
    }
    return {
      menuItems: (data.meals ?? []).slice(0, PAGE_SIZE).map((m) => ({
        id:              m.idMeal,
        title:           m.strMeal,
        image:           m.strMealThumb,
        restaurantChain: 'Chicken',
        price:           rng(50, 150),
        discount:        rng(5, 25),
        rating:          rng(1, 5),
        reviewCount:     rng(100, 2500),
      })),
    }
  } catch {
    return { menuItems: [] }
  }
}

/**
 * Async island – runs on the server, seeds the Zustand store through the
 * client HomeInitializer without blocking the synchronous page shell.
 * With `revalidate: 300`, Next.js serves this from cache after the first hit.
 */
async function HomeDataLoader() {
  const initialProducts = await fetchInitialProducts()
  return <HomeInitializer initialProducts={initialProducts} />
}

export default function HomePage() {
  return (
    <div className="flex items-start gap-5 px-6 py-5 mx-auto max-w-8xl
                    max-[1200px]:gap-4 max-[1200px]:px-4
                    max-[992px]:flex-col
                    max-[768px]:px-3.5 max-[768px]:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      {/*
        Suspense fallback=null → page shell renders instantly.
        HomeDataLoader streams in after the server fetch resolves and
        then HomeInitializer seeds the store → skeleton swaps to real cards.
      */}
      <Suspense fallback={null}>
        <HomeDataLoader />
      </Suspense>
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
