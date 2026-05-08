'use client'

import { motion } from 'framer-motion'
import { DetailedMenuItem } from './DetailedMenuItem'
import type { Meal } from '@/types'

interface Props {
  modalHandler:  () => void
  selectHandler: (id: string | null) => void
  selectedId:    string | null
  selectedMeal:  Meal[]
}

export function Modal({ modalHandler, selectedId, selectedMeal }: Props) {
  return (
    <motion.div
      data-id="modal"
      onClick={(e) => {
        if ((e.target as HTMLElement).dataset.id === 'modal') modalHandler()
        e.preventDefault()
      }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40"
    >
      <div className="scale-[1.2]">
        <DetailedMenuItem
          modalHandler={() => {}}
          closeModal={modalHandler}
          selectedId={selectedId}
          {...selectedMeal[0]}
        />
      </div>
    </motion.div>
  )
}
