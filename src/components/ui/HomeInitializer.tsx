'use client'

import { useEffect, useRef } from 'react'
import { useProductStore } from '@/store/productStore'
import type { ProductsPayload } from '@/types'

interface Props {
  initialProducts?: ProductsPayload
}

export function HomeInitializer({ initialProducts }: Props) {
  const fetchProducts  = useProductStore((s) => s.fetchProducts)
  const setInitialData = useProductStore((s) => s.setInitialData)
  const seeded = useRef(false)

  useEffect(() => {
    if (seeded.current) return
    seeded.current = true
    if (initialProducts && initialProducts.menuItems.length > 0) {
      setInitialData(initialProducts)
    } else {
      fetchProducts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
