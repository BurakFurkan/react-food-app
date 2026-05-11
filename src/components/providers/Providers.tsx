'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { initI18n } from '@/lib/i18n'
import NextTopLoader from 'nextjs-toploader'

function I18nInitializer() {
  const lang = useUserStore((s) => s.lang)
  useEffect(() => {
    initI18n(lang)
  }, [lang])
  return null
}

/** Zustand (localStorage) ile cookie'yi senkronize eder.
 *  localStorage temizlenince isLoggedIn=false olur → cookie silinir → middleware login'e yönlendirir.
 */
function AuthSync() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
      document.cookie = 'isLoggedIn=true; path=/; max-age=86400'
    } else {
      document.cookie = 'isLoggedIn=; path=/; max-age=0'
    }
  }, [isLoggedIn])
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
      <NextTopLoader color="var(--color-primary, #f97316)" height={3} showSpinner={false} />
      <I18nInitializer />
      <AuthSync />
      {children}
    </ThemeProvider>
  )
}
