'use client'

import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useProductStore } from '@/store/productStore'
import { cn } from '@/lib/utils'

export function HomePagination() {
  const page         = useProductStore((s) => s.page)
  const error        = useProductStore((s) => s.error)
  const nextPage     = useProductStore((s) => s.nextPage)
  const previousPage = useProductStore((s) => s.previousPage)

  if (error) return null

  const canGoBack = page > 1

  return (
    <div className="flex items-center justify-center gap-1.5 py-1">
      <motion.button
        whileTap={canGoBack ? { scale: 0.9 } : {}}
        onClick={() => canGoBack && previousPage()}
        disabled={!canGoBack}
        aria-label="Previous page"
        className={cn(
          'w-9 h-9 rounded-[10px] border-[1.5px] border-border bg-bg-elevated',
          'text-text-secondary flex items-center justify-center text-[1.1rem]',
          'transition-colors duration-200',
          canGoBack
            ? 'cursor-pointer hover:border-primary hover:text-primary hover:bg-primary-muted'
            : 'cursor-default opacity-[0.38]',
        )}
      >
        <HiChevronLeft />
      </motion.button>

      <div className="min-w-[40px] h-9 rounded-[10px] bg-surface border-[1.5px] border-border
                      flex items-center justify-center px-3">
        <span className="text-sm font-bold text-text tracking-[0.02em]">{page}</span>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={nextPage}
        aria-label="Next page"
        className="w-9 h-9 rounded-[10px] border-[1.5px] border-border bg-bg-elevated
                   text-text-secondary flex items-center justify-center text-[1.1rem] cursor-pointer
                   transition-colors duration-200 hover:border-primary hover:text-primary hover:bg-primary-muted"
      >
        <HiChevronRight />
      </motion.button>
    </div>
  )
}
