import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id:              string
  title:           string
  image:           string
  restaurantChain: string
  price:           number
  discount:        number
  quantity:        number
}

interface CartState {
  items: CartItem[]
  addItem:        (item: Omit<CartItem, 'quantity'>) => void
  removeItem:     (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart:      () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          }))
        } else {
          set((s) => ({ items: [...s.items, { ...item, quantity: 1 }] }))
        }
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, delta) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'food-app-cart',
    },
  ),
)

// Derived selectors
export const cartItemCount  = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0)
export const cartSubtotal   = (s: CartState) =>
  s.items.reduce((sum, i) => sum + (i.price - i.discount) * i.quantity, 0)
