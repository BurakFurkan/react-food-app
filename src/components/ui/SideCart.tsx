'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2'
import { BsCart3 } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { HiArrowRight } from 'react-icons/hi'
import { GoLocation } from 'react-icons/go'
import { useUserStore } from '@/store/userStore'
const PLACEHOLDER = '/images/placeholder.png'

export function SideCart() {
  const { t } = useTranslation()
  const meals           = useUserStore((s) => s.meals)
  const removeFromMeals = useUserStore((s) => s.removeFromMeals)
  const removeFromUserMenu = useUserStore((s) => s.removeFromUserMenu)
  const [dragStart, setDragStart] = useState(0)

  const toast = () =>
    Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true })

  const handleDelete = (id: string) => {
    removeFromUserMenu(id)
    removeFromMeals(id)
    toast().fire({ icon: 'error', title: t('ItemRemoved') })
  }

  const handleDragEnd = (_e: unknown, info: { point: { x: number } }, id: string) => {
    if (dragStart - info.point.x > 180) handleDelete(id)
  }

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-[272px] flex-shrink-0 bg-bg-elevated rounded-[20px] shadow-theme-lg border border-border
                 flex flex-col max-h-[calc(100vh-100px)] overflow-hidden self-start sticky top-20
                 max-[1200px]:w-[240px]
                 max-[992px]:w-full max-[992px]:max-h-[320px] max-[992px]:static"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-[1.125rem] pt-[1.125rem] pb-[0.875rem]
                      border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] rounded-[8px] bg-primary-muted text-primary
                          flex items-center justify-center text-[0.95rem]">
            <BsCart3 />
          </div>
          <h2 className="text-[0.925rem] font-bold text-text tracking-[0.005em]">
            {t('userinventory')}
          </h2>
        </div>
        {meals.length > 0 && (
          <span className="bg-primary text-white text-[0.7rem] font-bold min-w-5 h-5 rounded-[10px]
                           px-[5px] flex items-center justify-center">
            {meals.length}
          </span>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1.5
                      [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[3px]
                      [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-[3px]">
        <AnimatePresence initial={false}>
          {meals.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 gap-2 text-center"
            >
              <div className="text-[2.25rem] opacity-50 mb-1">🛒</div>
              <p className="text-sm font-semibold text-text-secondary">No items yet</p>
              <p className="text-[0.75rem] text-text-muted leading-relaxed">
                Add meals from the menu to get started
              </p>
            </motion.div>
          ) : (
            [...meals].reverse().map((meal) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={{ left: 0.12, right: 0.01 }}
                onDragStart={(_e, info) => setDragStart(info.point.x)}
                onDragEnd={(e, info) => handleDragEnd(e, info, meal.id)}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 12 }}
                className="flex items-center gap-[0.55rem] px-2.5 py-[0.55rem] rounded-[14px]
                           bg-surface cursor-grab active:cursor-grabbing select-none"
              >
                <img
                  src={meal.images?.[0]}
                  alt={meal.title}
                  className="w-[46px] h-[46px] rounded-[10px] object-cover flex-shrink-0 bg-border"
                  onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[0.78rem] font-semibold text-text whitespace-nowrap overflow-hidden
                                text-ellipsis mb-[0.18rem]">
                    {meal.title}
                  </p>
                  <div className="flex items-center gap-1 text-[0.68rem] text-text-muted">
                    <GoLocation className="flex-shrink-0 text-[0.72rem]" aria-hidden="true" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{meal.area}</span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleDelete(meal.id)}
                  aria-label="Remove item"
                  className="w-7 h-7 rounded-[8px] border-none bg-transparent text-text-muted
                             flex items-center justify-center text-[0.95rem] flex-shrink-0 cursor-pointer
                             transition-colors duration-200 hover:text-red-500 hover:bg-red-500/10"
                >
                  <RiDeleteBin6Line />
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {meals.length > 0 && (
        <div className="p-3.5 border-t border-border flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            className="w-full h-11 rounded-[12px] border-none bg-primary text-white text-sm font-semibold
                       cursor-pointer font-body flex items-center justify-center gap-2 shadow-primary
                       transition-colors duration-200 hover:bg-primary-hover tracking-[0.01em]"
          >
            Checkout
            <HiArrowRight className="text-base" />
          </motion.button>
        </div>
      )}
    </motion.aside>
  )
}
