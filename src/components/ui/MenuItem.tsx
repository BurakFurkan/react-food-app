'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { HiPlus, HiCheck } from 'react-icons/hi'
import { GoLocation } from 'react-icons/go'
import Swal from 'sweetalert2'
import { useUserStore } from '@/store/userStore'
import { StarRating } from './StarRating'
import { useRandomNumber } from '@/hooks/useRandomNumber'
import { cn } from '@/lib/utils'
import type { MenuItem as MenuItemType } from '@/types'
const PLACEHOLDER = '/images/placeholder.png'

const cardVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 26 } },
}

type Props = MenuItemType

export function MenuItem({ id, title, image, restaurantChain }: Props) {
  const { t } = useTranslation()
  const userMenu = useUserStore((s) => s.userMenu)
  const favList  = useUserStore((s) => s.favList)
  const addToUserMenu     = useUserStore((s) => s.addToUserMenu)
  const removeFromUserMenu = useUserStore((s) => s.removeFromUserMenu)
  const removeFromMeals   = useUserStore((s) => s.removeFromMeals)
  const addToFavList      = useUserStore((s) => s.addToFavList)
  const removeFromFavList = useUserStore((s) => s.removeFromFavList)
  const fetchMeal         = useUserStore((s) => s.fetchMeal)

  const price        = useRandomNumber(50, 150)
  const discount     = useRandomNumber(5, 25)
  const discountedPrice = price - discount
  const rating       = useRandomNumber(1, 5)
  const reviewCount  = useRandomNumber(100, 2500)
  const discountPct  = Math.round((discount / price) * 100)

  const isInMenu = userMenu.includes(id)
  const isFav    = favList.includes(id)

  const toast = () =>
    Swal.mixin({
      toast: true, position: 'top-end', showConfirmButton: false,
      timer: 2500, timerProgressBar: true,
    })

  const favClick = () => {
    isFav ? removeFromFavList(id) : addToFavList(id)
  }

  const cartClick = () => {
    if (isInMenu) {
      removeFromUserMenu(id)
      removeFromMeals(id)
      toast().fire({ icon: 'error', title: t('ItemRemoved') })
    } else {
      addToUserMenu(id)
      fetchMeal(id)
      toast().fire({ icon: 'success', title: t('ItemAdded') })
    }
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 380, damping: 24 } }}
      className="rounded-2xl bg-bg-card border border-border overflow-hidden
                 flex flex-col transition-all duration-[250ms]
                 hover:shadow-theme-lg hover:border-border-strong"
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden bg-surface flex-shrink-0 group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[500ms] group-hover:scale-[1.07]"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={favClick}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full border-none bg-white/90',
            'backdrop-blur-sm flex items-center justify-center cursor-pointer text-[0.9rem]',
            'shadow-md transition-all duration-200',
            isFav ? 'text-red-500' : 'text-text-secondary hover:text-red-500',
          )}
        >
          {isFav ? <BsHeartFill /> : <BsHeart />}
        </motion.button>

        {discountPct > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[0.65rem] font-bold
                           px-2 py-[0.2rem] rounded-md tracking-[0.04em] uppercase shadow-sm">
            -{discountPct}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5 pb-4 flex flex-col gap-[0.4rem] flex-1">
        <h3 className="text-[0.88rem] font-semibold text-text leading-snug whitespace-nowrap overflow-hidden text-ellipsis"
            title={title}>
          {title}
        </h3>

        <div className="flex items-center gap-1.5">
          <StarRating value={rating} size={13} />
          <span className="text-[0.7rem] font-medium text-text-muted">({reviewCount})</span>
        </div>

        <div className="flex items-center gap-1 text-[0.72rem] text-text-secondary">
          <GoLocation className="flex-shrink-0 text-[0.78rem]" aria-hidden="true" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{restaurantChain}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div className="flex items-baseline gap-1">
            <del className="text-[0.75rem] text-text-muted">{price}₺</del>
            <span className="text-[0.95rem] font-bold text-text">{discountedPrice}₺</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.86 }}
            onClick={cartClick}
            aria-label={isInMenu ? 'Remove from order' : 'Add to order'}
            className={cn(
              'w-[34px] h-[34px] rounded-[10px] border-none flex items-center justify-center cursor-pointer',
              'text-[1.05rem] font-bold transition-all duration-200',
              isInMenu
                ? 'bg-surface text-text-secondary hover:bg-border-strong'
                : 'bg-primary text-white shadow-primary hover:bg-primary-hover',
            )}
          >
            {isInMenu ? <HiCheck /> : <HiPlus />}
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
