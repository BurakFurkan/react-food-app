'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { CgAddR } from 'react-icons/cg'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/userStore'
import { DetailedMenuItem } from './DetailedMenuItem'
import { Modal } from './Modal'
import type { Meal } from '@/types'

export function Carousel() {
  const { t } = useTranslation()
  const meals   = useUserStore((s) => s.meals)
  const userMenu = useUserStore((s) => s.userMenu)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isOpen, setIsOpen]         = useState(false)

  const selectedMeal = meals.filter((m) => m.id === selectedId) as Meal[]

  const openModal = (id: string) => {
    setSelectedId(id)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedId(null)
  }

  if (userMenu.length === 0) {
    return (
      <div className="w-full h-full pt-8 flex flex-col items-center justify-start gap-12">
        <h1 className="text-primary text-2xl font-semibold">{t('add meal')}</h1>
        <Link href="/">
          <CgAddR className="text-[2.5rem] cursor-pointer text-primary transition-transform duration-300 hover:scale-110" />
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full h-full max-[768px]:w-[320px]">
      <Swiper
        breakpoints={{
          0:    { slidesPerView: 1, spaceBetween: 3, direction: 'horizontal' },
          1024: { slidesPerView: 3, spaceBetween: 3, direction: 'horizontal' },
        }}
        style={{ width: '100%', padding: '0.5rem' }}
      >
        {meals.map((meal) => (
          <SwiperSlide key={meal.id}>
            <DetailedMenuItem
              modalHandler={openModal}
              closeModal={closeModal}
              selectedId={selectedId}
              {...meal}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isOpen && selectedMeal.length > 0 && typeof document !== 'undefined' &&
        createPortal(
          <Modal
            modalHandler={closeModal}
            selectHandler={setSelectedId}
            selectedId={selectedId}
            selectedMeal={selectedMeal}
          />,
          document.getElementById('modal-root') as Element,
        )
      }
    </div>
  )
}
