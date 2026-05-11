import { create } from 'zustand'
import axios from 'axios'
import type { MenuItem, ProductsPayload } from '@/types'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'
const PAGE_SIZE = 12

export type Category =
  | 'Beef' | 'Breakfast' | 'Chicken' | 'Dessert'
  | 'Lamb' | 'Pasta'    | 'Seafood'
  | 'Side' | 'Starter'  | 'Vegan'   | 'Vegetarian'

export const CATEGORIES: Category[] = [
  'Beef','Breakfast','Chicken','Dessert','Lamb','Pasta',
  'Seafood','Side','Starter','Vegan','Vegetarian',
]

interface CacheEntry {
  data: ProductsPayload
  fetchedAt: number
}

const CACHE_TTL_MS = 5 * 60 * 1000 // 5 dakika

interface ProductState {
  category: Category
  products: ProductsPayload | null
  isLoading: boolean
  page: number
  error: boolean
  _cache: Map<string, CacheEntry>

  pickCategory: (cat: Category) => void
  nextPage: () => void
  previousPage: () => void
  fetchProducts: (cat?: Category, page?: number, force?: boolean) => Promise<void>
  setInitialData: (data: ProductsPayload) => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  category: 'Chicken',
  products: null,
  isLoading: true,
  page: 1,
  error: false,
  _cache: new Map(),

  pickCategory: (cat) => {
    set({ category: cat, page: 1 })
    get().fetchProducts(cat, 1)
  },

  nextPage: () => {
    const next = get().page + 1
    set({ page: next })
    get().fetchProducts(get().category, next)
  },

  previousPage: () => {
    const prev = Math.max(1, get().page - 1)
    set({ page: prev })
    get().fetchProducts(get().category, prev)
  },

  setInitialData: (data) => {
    const state = get()
    const cacheKey = `${state.category}:${state.page}`
    state._cache.set(cacheKey, { data, fetchedAt: Date.now() })
    set({ products: data, isLoading: false, error: false })
  },

  fetchProducts: async (cat, page, force = false) => {
    const category = cat ?? get().category
    const currentPage = page ?? get().page
    const cacheKey = `${category}:${currentPage}`

    if (!force) {
      const cached = get()._cache.get(cacheKey)
      if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        set({ products: cached.data, category, page: currentPage, isLoading: false, error: false })
        return
      }
    }

    set({ isLoading: true, error: false })
    try {
      const res = await axios.get<{ meals: Array<{ idMeal: string; strMeal: string; strMealThumb: string }> | null }>(
        `${BASE_URL}/filter.php?c=${category}`,
      )
      const all = res.data.meals ?? []
      const offset = (currentPage - 1) * PAGE_SIZE
      const paginated = all.slice(offset, offset + PAGE_SIZE)

      const rand = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min

      const menuItems: MenuItem[] = paginated.map((m) => {
        const price    = rand(50, 150)
        const discount = rand(5, 25)
        return {
          id: m.idMeal,
          title: m.strMeal,
          image: m.strMealThumb,
          restaurantChain: category,
          price,
          discount,
          rating:      rand(1, 5),
          reviewCount: rand(100, 2500),
        }
      })

      const payload: ProductsPayload = { menuItems }
      get()._cache.set(cacheKey, { data: payload, fetchedAt: Date.now() })
      set({ products: payload, isLoading: false })
    } catch {
      set({ isLoading: false, error: true })
    }
  },
}))
