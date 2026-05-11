'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BiWorld } from 'react-icons/bi'
import { IoOptionsOutline } from 'react-icons/io5'
import { FiLogOut, FiUser, FiGithub } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '@/store/userStore'
import { Dropdown } from '@/components/ui/Dropdown'
import { cn } from '@/lib/utils'
import userImage from '@/assets/userPhoto.png'

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [optionsOpen, setOptionsOpen] = useState({ isOpen: false, top: 0, left: 0 })
  const [profileOpen, setProfileOpen] = useState({ isOpen: false, top: 0, left: 0 })
  const optionsBtnRef = useRef<HTMLButtonElement>(null)
  const avatarBtnRef  = useRef<HTMLButtonElement>(null)
  const optionsTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const profileTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [portalEl, setPortalEl] = useState<Element | null>(null)

  const { t } = useTranslation()
  const router = useRouter()
  const userName  = useUserStore((s) => s.userName)
  const isLoggedIn = useUserStore((s) => s.isLoggedIn)
  const logout    = useUserStore((s) => s.logout)

  useEffect(() => {
    setPortalEl(document.getElementById('modal-root'))
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openOptions = () => {
    if (optionsTimer.current) clearTimeout(optionsTimer.current)
    const rect = optionsBtnRef.current?.getBoundingClientRect()
    if (rect) setOptionsOpen({ isOpen: true, top: rect.bottom, left: rect.left - 28 })
  }
  const closeOptions = () => {
    optionsTimer.current = setTimeout(() =>
      setOptionsOpen((p) => ({ ...p, isOpen: false })), 120)
  }

  const openProfile = () => {
    if (profileTimer.current) clearTimeout(profileTimer.current)
    const rect = avatarBtnRef.current?.getBoundingClientRect()
    if (rect) setProfileOpen({ isOpen: true, top: rect.bottom, left: rect.left - 140 })
  }
  const closeProfile = () => {
    profileTimer.current = setTimeout(() =>
      setProfileOpen((p) => ({ ...p, isOpen: false })), 120)
  }

  const handleLogout = () => {
    logout()
    setProfileOpen((p) => ({ ...p, isOpen: false }))
    router.push('/login')
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-[500] backdrop-blur-[20px] transition-all duration-200',
        'bg-nav-bg border-b',
        scrolled ? 'border-border shadow-theme-sm' : 'border-transparent',
      )}
    >
      <div className="max-w-8xl mx-auto px-6 h-[60px] flex items-center justify-between max-[640px]:px-4 max-[640px]:h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[9px] bg-primary flex items-center justify-center
                          font-display font-extrabold text-[0.9rem] text-white flex-shrink-0">
            H
          </div>
          <span className="font-display font-bold text-[1.05rem] text-text tracking-[-0.01em] max-[480px]:hidden">
            HealthFree
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Contact */}
          <button
            onClick={() => window.open('https://bftportfolio.netlify.app/', '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-text-secondary
                       text-sm font-medium hover:bg-surface hover:text-text transition-colors duration-200
                       max-[640px]:px-2"
            aria-label={t('portfolio')}
          >
            <BiWorld className="text-[1.1rem] flex-shrink-0" />
            <span className="max-[640px]:hidden">{t('portfolio')}</span>
          </button>

          {/* GitHub */}
          <button
            onClick={() => window.open('https://github.com/BurakFurkan/react-food-app', '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-text-secondary
                       text-sm font-medium hover:bg-surface hover:text-text transition-colors duration-200
                       max-[640px]:px-2"
            aria-label={t('github')}
          >
            <FiGithub className="text-[1.1rem] flex-shrink-0" />
            <span className="max-[640px]:hidden">{t('github')}</span>
          </button>

          {/* Options */}
          <button
            ref={optionsBtnRef}
            onMouseEnter={openOptions}
            onMouseLeave={closeOptions}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-text-secondary
                       text-sm font-medium hover:bg-surface hover:text-text transition-colors duration-200
                       relative max-[640px]:px-2"
            aria-label="Options"
          >
            <IoOptionsOutline className="text-[1.1rem] flex-shrink-0" />
            <span className="max-[640px]:hidden">{t('options')}</span>
          </button>

          {/* Avatar */}
          <button
            ref={avatarBtnRef}
            onMouseEnter={openProfile}
            onMouseLeave={closeProfile}
            className="relative p-0 border-none bg-transparent cursor-pointer ml-2"
            aria-label="User profile"
          >
            <Image
              src={userImage}
              alt="User"
              width={34}
              height={34}
              className="rounded-full object-cover border-2 border-border-strong hover:border-primary transition-colors"
            />
            <span className="absolute bottom-0 right-0 w-[9px] h-[9px] rounded-full bg-green-500 border-2 border-bg" />
          </button>
        </div>
      </div>

      {/* Portals */}
      {portalEl && optionsOpen.isOpen && createPortal(
        <Dropdown
          info={optionsOpen}
          onMouseEnter={() => optionsTimer.current && clearTimeout(optionsTimer.current)}
          onMouseLeave={closeOptions}
        />,
        portalEl,
      )}

      {portalEl && profileOpen.isOpen && createPortal(
        <motion.div
          onMouseEnter={() => profileTimer.current && clearTimeout(profileTimer.current)}
          onMouseLeave={closeProfile}
          style={{ top: `${profileOpen.top}px`, left: `${profileOpen.left}px` }}
          className="fixed z-[9999] w-[200px] bg-bg-elevated border border-border rounded-2xl
                     shadow-theme-xl p-2.5 backdrop-blur-xl"
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        >
          <div className="flex items-center gap-2.5 px-1 pb-2 pt-1">
            <Image src={userImage} alt="User" width={36} height={36}
              className="rounded-full object-cover border-2 border-border-strong flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-text truncate">{userName || t('nav.guest')}</span>
              <span className="text-[0.68rem] font-medium text-green-500">
                {isLoggedIn ? t('nav.online') : t('nav.offline')}
              </span>
            </div>
          </div>
          <hr className="border-none h-px bg-border my-1.5" />
          <Link
            href="/dashboard"
            onClick={() => setProfileOpen((p) => ({ ...p, isOpen: false }))}
            className="flex items-center gap-2 w-full px-2.5 py-2 rounded-[10px] text-text-secondary
                       text-sm font-medium hover:bg-surface hover:text-text transition-colors"
          >
            <FiUser className="text-base flex-shrink-0" />
            <span>{t('dashboard')}</span>
          </Link>
          <hr className="border-none h-px bg-border my-1.5" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2.5 py-2 rounded-[10px] text-red-500
                       text-sm font-medium hover:bg-red-500/10 transition-colors font-body"
          >
            <FiLogOut className="text-base flex-shrink-0" />
            <span>{t('logout')}</span>
          </button>
        </motion.div>,
        portalEl,
      )}
    </header>
  )
}
