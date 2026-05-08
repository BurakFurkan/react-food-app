'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { BsFillCalendarCheckFill, BsGraphUp } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const navItems = (t: (k: string) => string) => [
  { to: '/',           icon: <GiForkKnifeSpoon />,          label: t('meals'),     exact: true  },
  { to: '/todaymenu',  icon: <BsFillCalendarCheckFill />,   label: t('todaymenu'), exact: false },
  { to: '/dashboard',  icon: <BsGraphUp />,                 label: t('dashboard'), exact: false },
]

export function Sidebar() {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <aside className="w-[200px] flex-shrink-0 bg-sidebar-bg rounded-2xl p-2 shadow-theme-sm
                      border border-border self-start sticky top-20
                      max-[1100px]:w-[68px]
                      max-[768px]:fixed max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:right-0
                      max-[768px]:w-full max-[768px]:rounded-none max-[768px]:border-t
                      max-[768px]:border-l-0 max-[768px]:border-r-0 max-[768px]:border-b-0
                      max-[768px]:z-[400] max-[768px]:top-auto
                      max-[768px]:backdrop-blur-[16px] max-[768px]:bg-nav-bg
                      max-[768px]:[padding-bottom:calc(0.25rem+env(safe-area-inset-bottom,0px))]">
      <ul className="flex flex-col gap-0.5 max-[768px]:flex-row max-[768px]:h-[52px]">
        {navItems(t).map((item) => {
          const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to)
          return (
            <li key={item.to} className="max-[768px]:flex-1">
              <Link
                href={item.to}
                className={cn(
                  'flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] text-sm font-medium transition-colors duration-200',
                  'text-sidebar-text hover:bg-sidebar-hover hover:text-text',
                  'max-[1100px]:px-2.5 max-[1100px]:justify-center max-[1100px]:gap-0',
                  'max-[768px]:flex-col max-[768px]:justify-center max-[768px]:items-center',
                  'max-[768px]:px-1 max-[768px]:py-1.5 max-[768px]:gap-0.5 max-[768px]:rounded-lg',
                  'max-[768px]:h-full max-[768px]:text-[0.68rem]',
                  isActive && 'bg-sidebar-active text-sidebar-active-text font-semibold',
                )}
              >
                <span className="text-[1.15rem] flex items-center justify-center flex-shrink-0 max-[768px]:text-[1.3rem]">
                  {item.icon}
                </span>
                <span className="whitespace-nowrap overflow-hidden
                                 max-[1100px]:hidden max-[768px]:block max-[768px]:overflow-visible">
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
