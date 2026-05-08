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

interface ProductState {
  category: Category
  products: ProductsPayload | null
  isLoading: boolean
  page: number
  error: boolean

  pickCategory: (cat: Category) => void
  nextPage: () => void
  previousPage: () => void
  fetchProducts: (cat?: Category, page?: number) => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
  category: 'Chicken',
  products: null,
  isLoading: true,
  page: 1,
  error: false,

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

  fetchProducts: async (cat, page) => {
    const category = cat ?? get().category
    const currentPage = page ?? get().page
    set({ isLoading: true, error: false })
    try {
      const res = await axios.get<{ meals: Array<{ idMeal: string; strMeal: string; strMealThumb: string }> | null }>(
        `${BASE_URL}/filter.php?c=${category}`,
      )
      const all = res.data.meals ?? []
      const offset = (currentPage - 1) * PAGE_SIZE
      const paginated = all.slice(offset, offset + PAGE_SIZE)

      const menuItems: MenuItem[] = paginated.map((m) => ({
        id: m.idMeal,
        title: m.strMeal,
        image: m.strMealThumb,
        restaurantChain: category,
      }))

      set({ products: { menuItems }, isLoading: false })
    } catch {
      set({ isLoading: false, error: true })
    }
  },
}))
