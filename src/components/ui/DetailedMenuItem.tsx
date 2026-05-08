'use client'

import { motion } from 'framer-motion'
import { BsHeart } from 'react-icons/bs'
import { GiMagnifyingGlass } from 'react-icons/gi'
import { TiDeleteOutline } from 'react-icons/ti'
import { CgAddR } from 'react-icons/cg'
import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2'
import { useUserStore } from '@/store/userStore'
import type { Meal } from '@/types'
const PLACEHOLDER = '/images/placeholder.png'

interface Props extends Partial<Meal> {
  modalHandler: (id: string) => void
  closeModal:   () => void
  selectedId:   string | null
}

export function DetailedMenuItem({ id, title, images, ingredients, modalHandler, closeModal, selectedId }: Props) {
  const { t } = useTranslation()
  const userMenu        = useUserStore((s) => s.userMenu)
  const addToUserMenu   = useUserStore((s) => s.addToUserMenu)
  const removeFromUserMenu = useUserStore((s) => s.removeFromUserMenu)
  const removeFromMeals = useUserStore((s) => s.removeFromMeals)
  const fetchMeal       = useUserStore((s) => s.fetchMeal)

  const toast = () =>
    Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true })

  if (!id) return null

  const isInMenu = userMenu.includes(id)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-[350px] h-[550px] rounded-[26px] bg-bg-card shadow-theme-lg flex flex-col
                 items-center p-4 text-text overflow-hidden max-[992px]:w-[300px]"
    >
      {/* Controls */}
      <div className="w-full flex items-start justify-between p-[5px] text-text mb-2">
        <BsHeart className="text-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:text-red-500" />
        <GiMagnifyingGlass
          className="text-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primary"
          onClick={() => modalHandler(id)}
        />
        {isInMenu ? (
          <TiDeleteOutline
            className="text-3xl cursor-pointer transition-all duration-300 hover:scale-110 hover:text-red-500"
            onClick={() => {
              closeModal()
              removeFromUserMenu(id)
              removeFromMeals(id)
              toast().fire({ icon: 'error', title: t('ItemRemoved') })
            }}
          />
        ) : (
          <CgAddR
            className="text-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primary"
            onClick={() => { addToUserMenu(id); fetchMeal(id) }}
          />
        )}
      </div>

      {/* Image */}
      <div className="w-full rounded-lg overflow-hidden shadow-theme-md min-h-[150px]
                      flex items-center justify-center bg-surface">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-full object-contain bg-bg"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
        />
      </div>

      {/* Title */}
      <div className="w-full py-4 text-text">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      {/* Ingredients table */}
      <div className="w-full flex-1 overflow-y-scroll text-text
                      [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:rounded
                      [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded">
        <table className="w-full border-collapse text-sm max-[768px]:text-[0.8rem]">
          <thead>
            <tr className="bg-primary">
              <th className="py-1 px-2 text-left border border-primary-hover text-white text-xs font-semibold uppercase tracking-wide">
                {t('ingredient')}
              </th>
              <th className="py-1 px-2 text-left border border-primary-hover text-white text-xs font-semibold uppercase tracking-wide">
                {t('measure')}
              </th>
            </tr>
          </thead>
          <tbody>
            {(ingredients ?? []).map((ing, i) => (
              <tr key={i}
                  className="odd:bg-surface hover:bg-primary hover:text-white transition-colors duration-150">
                <td className="py-0.5 px-1 border border-border whitespace-nowrap">{ing.name}</td>
                <td className="py-0.5 px-1 border border-border whitespace-nowrap">{ing.measure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
