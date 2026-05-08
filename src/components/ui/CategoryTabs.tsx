'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProductStore, CATEGORIES } from '@/store/productStore'
import { cn } from '@/lib/utils'

const EMOJIS: Record<string, string> = {
  Beef:'🥩', Breakfast:'🍳', Chicken:'🍗', Dessert:'🍰',
  Lamb:'🐑', Pasta:'🍝',    Seafood:'🦞',
  Side:'🥗', Starter:'🥣',  Vegan:'🌿',   Vegetarian:'🥦',
}

export function CategoryTabs() {
  const { t } = useTranslation()
  const category    = useProductStore((s) => s.category)
  const pickCategory = useProductStore((s) => s.pickCategory)
  const isLoading   = useProductStore((s) => s.isLoading)

  if (isLoading) {
    return (
      <div className="w-full flex gap-1.5 overflow-hidden py-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[34px] rounded-full skeleton-shimmer flex-shrink-0"
            style={{ width: `${72 + (i % 3) * 20}px` }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full relative">
      <div className="flex gap-1.5 overflow-x-auto py-0.5 scroll-smooth
                      [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => {
          const active = cat === category
          return (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.93 }}
              onClick={() => pickCategory(cat)}
              aria-pressed={active}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full border',
                'text-[0.82rem] font-semibold cursor-pointer whitespace-nowrap flex-shrink-0',
                'transition-all duration-150 font-body',
                active
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-border bg-bg-elevated text-text-secondary hover:border-border-strong hover:text-text hover:bg-surface',
              )}
            >
              <span className="text-[0.88rem] leading-none" aria-hidden="true">
                {EMOJIS[cat] ?? '🍽️'}
              </span>
              <span className="capitalize">{t(cat)}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
