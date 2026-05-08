'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { initI18n } from '@/lib/i18n'

function I18nInitializer() {
  const lang = useUserStore((s) => s.lang)
  useEffect(() => {
    initI18n(lang)
  }, [lang])
  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <I18nInitializer />
      {children}
    </ThemeProvider>
  )
}
