import { Navbar } from '@/components/layout/Navbar'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      {children}
    </div>
  )
}
