import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers/Providers'

export const metadata: Metadata = {
  title:       'HealthFree — Premium Food Delivery',
  description: 'Discover the finest restaurants and get your favourite meals delivered fast.',
  openGraph: {
    title:       'HealthFree',
    description: 'Premium food ordering & discovery app.',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  )
}
