import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import type { Meal, ThemeName, LangCode } from '@/types'

interface UserState {
  userMenu:    string[]
  favList:     string[]
  meals:       Meal[]
  isLoading:   boolean
  isLoggedIn:  boolean
  userName:    string
  theme:       ThemeName
  lang:        LangCode

  login:               (name: string) => void
  logout:              () => void
  addToUserMenu:       (id: string)   => void
  removeFromUserMenu:  (id: string)   => void
  addToFavList:        (id: string)   => void
  removeFromFavList:   (id: string)   => void
  removeFromMeals:     (id: string)   => void
  setTheme:            (t: ThemeName) => void
  setLang:             (l: LangCode)  => void
  fetchMeal:           (id: string)   => Promise<void>
}

type RawMeal = Record<string, string | null>

const setCookie = (name: string, value: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=${value}; path=/; max-age=86400`
  }
}
const deleteCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; path=/; max-age=0`
  }
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userMenu:  [],
      favList:   [],
      meals:     [],
      isLoading: false,
      isLoggedIn: false,
      userName:  '',
      theme:     'light',
      lang:      'en',

      login: (name) => {
        setCookie('isLoggedIn', 'true')
        set({ isLoggedIn: true, userName: name })
      },

      logout: () => {
        deleteCookie('isLoggedIn')
        set({ isLoggedIn: false, userName: '', userMenu: [], meals: [], favList: [] })
      },

      addToUserMenu:      (id) => set((s) => ({ userMenu: [...s.userMenu, id] })),
      removeFromUserMenu: (id) => set((s) => ({ userMenu: s.userMenu.filter((i) => i !== id) })),
      addToFavList:       (id) => set((s) => ({ favList: [...s.favList, id] })),
      removeFromFavList:  (id) => set((s) => ({ favList: s.favList.filter((i) => i !== id) })),
      removeFromMeals:    (id) => set((s) => ({ meals: s.meals.filter((m) => m.id !== id) })),

      setTheme: (theme) => set({ theme }),
      setLang:  (lang)  => set({ lang }),

      fetchMeal: async (id) => {
        if (get().meals.find((m) => m.id === id)) return
        set({ isLoading: true })
        try {
          const res = await axios.get<{ meals: RawMeal[] }>(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          )
          const raw = res.data.meals[0]
          const ingredients: Meal['ingredients'] = []
          for (let i = 1; i <= 20; i++) {
            const name    = raw[`strIngredient${i}`]
            const measure = raw[`strMeasure${i}`]
            if (name?.trim()) {
              ingredients.push({ name: name.trim(), measure: measure?.trim() ?? '' })
            }
          }
          const meal: Meal = {
            id:           raw.idMeal as string,
            title:        raw.strMeal as string,
            images:       [raw.strMealThumb as string],
            area:         raw.strArea as string,
            category:     raw.strCategory as string,
            instructions: raw.strInstructions as string,
            ingredients,
          }
          set((s) => ({ meals: [...s.meals, meal], isLoading: false }))
        } catch {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'food-app-user',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userName:   state.userName,
        theme:      state.theme,
        lang:       state.lang,
        favList:    state.favList,
        userMenu:   state.userMenu,
        meals:      state.meals,
      }),
    },
  ),
)
