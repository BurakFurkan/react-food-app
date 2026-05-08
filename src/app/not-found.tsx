'use client'

import Link from 'next/link'
import { VscQuestion } from 'react-icons/vsc'
import { GiReturnArrow } from 'react-icons/gi'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="w-[90vw] h-[90vh] flex flex-col items-center justify-center gap-4 mx-auto">
      <VscQuestion className="text-5xl text-primary transition-transform duration-300" />
      <h2 className="text-xl font-semibold text-text text-center">{t('not found')}</h2>
      <Link href="/">
        <GiReturnArrow className="text-4xl text-primary cursor-pointer transition-transform duration-300 hover:scale-110" />
      </Link>
    </div>
  )
}
