'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useUserStore } from '@/store/userStore'
import type { ThemeName } from '@/types'

interface Props {
  colorarray: string[]
  theme: ThemeName
}

export function DropdownThemes({ colorarray, theme: themeName }: Props) {
  const { setTheme } = useTheme()
  const setStoredTheme = useUserStore((s) => s.setTheme)

  const handleClick = () => {
    setTheme(themeName)
    setStoredTheme(themeName)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${themeName}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="w-full h-11 rounded-[10px] border-[1.5px] border-border bg-surface cursor-pointer
                 relative overflow-hidden hover:border-primary transition-colors duration-200"
    >
      {colorarray.map((color, idx) => (
        <div
          key={idx}
          style={{
            background: color,
            left: `${6 + idx * 13}px`,
            zIndex: 10 - idx,
          }}
          className="absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full
                     border-2 border-white/25 shadow-[0_2px_6px_rgba(0,0,0,0.22)]"
        />
      ))}
    </motion.div>
  )
}
