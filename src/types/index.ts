export interface MenuItem {
  id: string
  title: string
  image: string
  restaurantChain: string
}

export interface Ingredient {
  name: string
  measure: string
}

export interface Meal {
  id: string
  title: string
  images: string[]
  area: string
  category: string
  instructions: string
  ingredients: Ingredient[]
}

export interface ProductsPayload {
  menuItems: MenuItem[]
}

export type ThemeName = 'light' | 'dark'
export type LangCode  = 'en' | 'tr'
