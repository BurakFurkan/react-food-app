'use client'

import { motion } from 'framer-motion'
import { useProductStore } from '@/store/productStore'
import { MenuItem } from './MenuItem'
import { ErrorHandler } from './ErrorHandler'

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

function SkeletonCard() {
  return (
    <div className="rounded-[20px] overflow-hidden bg-bg-card shadow-theme-sm border border-border">
      <div className="h-[188px] skeleton-shimmer" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-[17px] w-[72%] rounded-md skeleton-shimmer" />
        <div className="h-[13px] w-[42%] rounded-md skeleton-shimmer" />
        <div className="h-[13px] w-[58%] rounded-md skeleton-shimmer" />
        <div className="flex justify-between mt-0.5">
          <div className="h-[15px] w-[32%] rounded-md skeleton-shimmer" />
          <div className="h-[15px] w-[26%] rounded-md skeleton-shimmer" />
        </div>
      </div>
    </div>
  )
}

export function Tabs() {
  const { products, isLoading, error } = useProductStore()

  if (error) return <ErrorHandler />

  if (isLoading) {
    return (
      <div className="grid gap-[1.125rem] w-full"
           style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}>
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-[1.125rem] w-full"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}
    >
      {products?.menuItems?.map((product, idx) => (
        <MenuItem key={product.id ?? idx} {...product} />
      ))}
    </motion.div>
  )
}
