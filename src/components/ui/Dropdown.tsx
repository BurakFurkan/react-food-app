'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/userStore'
import { DropdownThemes } from './DropdownThemes'
import Image from 'next/image'
import TurkeyFlag from '@/assets/turkey-flag.png'
import USAFlag    from '@/assets/usa-flag.png'
import type { LangCode } from '@/types'
import i18n from '@/lib/i18n'

interface DropdownInfo {
  isOpen: boolean
  top:    number
  left:   number
}

interface Props {
  info:         DropdownInfo
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function Dropdown({ info, onMouseEnter, onMouseLeave }: Props) {
  const { t } = useTranslation()
  const setLang = useUserStore((s) => s.setLang)

  const changeLang = (lang: LangCode) => {
    setLang(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ top: `${info.top}px`, left: `${info.left}px` }}
      className="fixed z-[9999] w-[224px] bg-bg-elevated border border-border rounded-2xl
                 shadow-theme-xl p-3 backdrop-blur-xl"
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      {/* Language */}
      <div className="flex flex-col gap-2">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.09em] text-text-muted px-0.5">
          Language
        </p>
        <div className="flex gap-2">
          {([
            { lang: 'en', flag: USAFlag,    code: 'EN', label: 'English' },
            { lang: 'tr', flag: TurkeyFlag, code: 'TR', label: 'Türkçe' },
          ] as const).map(({ lang, flag, code, label }) => (
            <button
              key={lang}
              onClick={() => changeLang(lang)}
              aria-label={`Switch to ${label}`}
              className="flex-1 flex flex-col items-center gap-1 py-2 px-1.5 rounded-[10px]
                         border-[1.5px] border-border bg-surface cursor-pointer font-body
                         hover:border-primary hover:bg-primary-muted transition-colors duration-200"
            >
              <Image src={flag} alt={label} width={34} height={22} className="rounded-[3px]" />
              <span className="text-[0.68rem] font-bold text-text-secondary tracking-[0.05em]">
                {code}
              </span>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-none h-px bg-border my-2" />

      {/* Theme */}
      <div className="flex flex-col gap-2">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.09em] text-text-muted px-0.5">
          {t('navTheme')}
        </p>
        <div className="flex gap-2">
          {([
            { colors: ['#FAFAF7','#E8451A','#F4F1EA','#1C1C1E'] as string[], theme: 'light' as const, label: 'Light' },
            { colors: ['#0C0C0C','#FF5722','#1E1E1E','#F2F2F0'] as string[], theme: 'dark'  as const, label: 'Dark'  },
          ] as const).map(({ colors, theme, label }) => (
            <div key={theme} className="flex-1 flex flex-col items-center gap-1.5">
              <DropdownThemes colorarray={colors} theme={theme} />
              <span className="text-[0.68rem] font-semibold text-text-secondary tracking-[0.02em]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
