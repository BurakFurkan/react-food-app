'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiArrowLeft, HiMinus, HiPlus } from 'react-icons/hi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GoLocation } from 'react-icons/go'
import { BsCheckCircleFill, BsTagFill } from 'react-icons/bs'
import { MdDeliveryDining } from 'react-icons/md'
import { useCartStore, cartSubtotal, cartItemCount } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/lib/utils'

const DELIVERY_FEE = 29
const PLACEHOLDER  = '/images/placeholder.png'

const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  FOOD20: 20,
  FIRST5: 5,
}

export default function CheckoutPage() {
  const { t } = useTranslation()
  const router       = useRouter()
  const items        = useCartStore((s) => s.items)
  const updateQty    = useCartStore((s) => s.updateQuantity)
  const removeItem   = useCartStore((s) => s.removeItem)
  const clearCart    = useCartStore((s) => s.clearCart)
  const removeFromMeals    = useUserStore((s) => s.removeFromMeals)
  const removeFromUserMenu = useUserStore((s) => s.removeFromUserMenu)
  const subtotal     = useCartStore(cartSubtotal)
  const count        = useCartStore(cartItemCount)

  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState<string | null>(null)
  const [promoError, setPromoError]     = useState(false)
  const [address, setAddress]           = useState('')
  const [ordered, setOrdered]           = useState(false)

  const promoDiscount = promoApplied ? PROMO_CODES[promoApplied] : 0
  const total         = Math.max(0, subtotal + DELIVERY_FEE - promoDiscount)

  const handlePromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      setPromoApplied(code)
      setPromoError(false)
      setPromoInput('')
    } else {
      setPromoError(true)
      setTimeout(() => setPromoError(false), 1800)
    }
  }

  const handleRemove = (id: string) => {
    removeItem(id)
    removeFromMeals(id)
    removeFromUserMenu(id)
  }

  const handleOrder = () => {
    if (!address.trim()) return
    setOrdered(true)
    setTimeout(() => {
      clearCart()
      router.push('/')
    }, 3200)
  }

  /* ── Success overlay ───────────────────────────── */
  if (ordered) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="flex flex-col items-center gap-5 text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 340, damping: 18, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center"
          >
            <BsCheckCircleFill className="text-[2.8rem] text-green-500" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-text mb-1">{t('checkout.orderPlaced')}</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('checkout.orderPreparing')} <strong className="text-text">{t('checkout.deliveryTime')}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <MdDeliveryDining className="text-[1.3rem]" />
            <span>{t('checkout.redirecting')}</span>
          </div>
        </motion.div>
      </div>
    )
  }

  /* ── Empty cart ────────────────────────────────── */
  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="text-[3.5rem] opacity-40">🛒</div>
          <h2 className="text-lg font-bold text-text">{t('checkout.emptyCart')}</h2>
          <p className="text-text-secondary text-sm">{t('checkout.addMeals')}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-primary
                       text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            <HiArrowLeft />
            {t('checkout.browseMenu')}
          </button>
        </motion.div>
      </div>
    )
  }

  /* ── Main checkout ─────────────────────────────── */
  return (
    <div className="px-6 py-5 mx-auto max-w-8xl
                    max-[1200px]:px-4
                    max-[768px]:px-3.5 max-[768px]:pb-6">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <button
          onClick={() => router.back()}
          aria-label={t('checkout.goBack')}
          className="w-9 h-9 rounded-[10px] border border-border bg-surface flex items-center justify-center
                     text-text-secondary hover:text-text hover:bg-border transition-colors"
        >
          <HiArrowLeft className="text-base" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-text tracking-tight">{t('checkout.title')}</h1>
          <p className="text-[0.78rem] text-text-muted">
            {t('checkout.itemsInCart', { count })}
          </p>
        </div>
      </motion.div>

      {/* Two-column grid */}
      <div className="grid gap-5 items-start
                      grid-cols-[1fr_360px]
                      max-[1100px]:grid-cols-[1fr_320px]
                      max-[900px]:grid-cols-1">

        {/* ── LEFT: Items ──────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-bg-elevated border border-border rounded-[20px] overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-[0.9rem] font-bold text-text">{t('checkout.orderItems')}</h2>
          </div>

          <ul className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const net = item.price - item.discount
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
                      className="w-[68px] h-[68px] rounded-[14px] object-cover flex-shrink-0 bg-surface"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.88rem] font-semibold text-text leading-snug
                                    truncate mb-[0.2rem]" title={item.title}>
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1 text-[0.72rem] text-text-muted mb-2">
                        <GoLocation className="flex-shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.restaurantChain}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <del className="text-[0.72rem] text-text-muted">{item.price}₺</del>
                        <span className="text-[0.82rem] font-bold text-text">{net}₺</span>
                        {item.discount > 0 && (
                          <span className="text-[0.65rem] font-bold text-white bg-primary
                                           px-1.5 py-[0.12rem] rounded-md">
                            -{Math.round((item.discount / item.price) * 100)}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity + remove */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleRemove(item.id)}
                        aria-label={t('checkout.removeItem')}
                        className="w-7 h-7 rounded-[8px] text-text-muted hover:text-red-500
                                   hover:bg-red-500/10 flex items-center justify-center
                                   transition-colors text-[0.95rem]"
                      >
                        <RiDeleteBin6Line />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQty(item.id, -1)}
                          aria-label={t('checkout.decreaseQty')}
                          className="w-7 h-7 rounded-[8px] border border-border bg-surface
                                     flex items-center justify-center text-text-secondary
                                     hover:border-border-strong hover:text-text transition-colors"
                        >
                          <HiMinus className="text-xs" />
                        </motion.button>

                        <span className="text-[0.88rem] font-bold text-text w-5 text-center">
                          {item.quantity}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQty(item.id, +1)}
                          aria-label={t('checkout.increaseQty')}
                          className="w-7 h-7 rounded-[8px] bg-primary text-white
                                     flex items-center justify-center
                                     hover:bg-primary-hover transition-colors"
                        >
                          <HiPlus className="text-xs" />
                        </motion.button>
                      </div>

                      <span className="text-[0.82rem] font-bold text-text">
                        {(net * item.quantity).toFixed(0)}₺
                      </span>
                    </div>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>
        </motion.section>

        {/* ── RIGHT: Summary + Form ────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Delivery address */}
          <section className="bg-bg-elevated border border-border rounded-[20px] p-5">
            <h2 className="text-[0.9rem] font-bold text-text mb-3">{t('checkout.deliveryAddress')}</h2>
            <label className="flex items-start gap-2.5">
              <GoLocation className="text-primary mt-[0.3rem] flex-shrink-0 text-base" />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('checkout.addressPlaceholder')}
                rows={2}
                className={cn(
                  'flex-1 resize-none bg-surface border rounded-[12px] px-3 py-2.5',
                  'text-[0.84rem] text-text placeholder:text-text-muted',
                  'outline-none transition-colors',
                  address.trim()
                    ? 'border-primary ring-1 ring-primary/20'
                    : 'border-border focus:border-border-strong',
                )}
              />
            </label>
          </section>

          {/* Promo code */}
          <section className="bg-bg-elevated border border-border rounded-[20px] p-5">
            <h2 className="text-[0.9rem] font-bold text-text mb-3 flex items-center gap-2">
              <BsTagFill className="text-primary text-sm" />
              {t('checkout.promoCode')}
            </h2>

            {promoApplied ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between bg-green-500/10 border border-green-500/30
                           rounded-[12px] px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <BsCheckCircleFill className="text-green-500 text-sm" />
                  <span className="text-[0.82rem] font-semibold text-green-600 dark:text-green-400">
                    {promoApplied} — {promoDiscount}₺ off
                  </span>
                </div>
                <button
                  onClick={() => setPromoApplied(null)}
                  className="text-[0.72rem] text-text-muted hover:text-text transition-colors"
                >
                  {t('checkout.remove')}
                </button>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handlePromo()}
                  placeholder={t('checkout.promoPlaceholder')}
                  maxLength={10}
                  className={cn(
                    'flex-1 bg-surface border rounded-[12px] px-3 py-2.5',
                    'text-[0.84rem] text-text placeholder:text-text-muted',
                    'outline-none transition-colors uppercase tracking-wider',
                    promoError
                      ? 'border-red-400 ring-1 ring-red-400/20'
                      : 'border-border focus:border-border-strong',
                  )}
                />
                <button
                  onClick={handlePromo}
                  className="px-4 py-2.5 rounded-[12px] bg-surface border border-border
                             text-[0.82rem] font-semibold text-text
                             hover:bg-border hover:border-border-strong transition-colors"
                >
                  {t('checkout.apply')}
                </button>
              </div>
            )}

            <AnimatePresence>
              {promoError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[0.72rem] text-red-500 mt-1.5 ml-1"
                >
                  {t('checkout.invalidPromo')}
                </motion.p>
              )}
            </AnimatePresence>
          </section>

          {/* Order summary */}
          <section className="bg-bg-elevated border border-border rounded-[20px] p-5">
            <h2 className="text-[0.9rem] font-bold text-text mb-4">{t('checkout.orderSummary')}</h2>

            <div className="flex flex-col gap-2.5 text-[0.83rem]">
              <Row label={t('checkout.subtotal')} value={`${subtotal.toFixed(0)}₺`} />
              <Row label={t('checkout.deliveryFee')} value={`${DELIVERY_FEE}₺`} />
              {promoDiscount > 0 && (
                <Row label={`${t('checkout.promo')} (${promoApplied})`} value={`-${promoDiscount}₺`} green />
              )}
              <hr className="border-border my-1" />
              <div className="flex items-center justify-between">
                <span className="font-bold text-text text-[0.92rem]">{t('checkout.total')}</span>
                <span className="font-bold text-text text-[1.05rem]">{total.toFixed(0)}₺</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOrder}
              disabled={!address.trim()}
              className={cn(
                'w-full mt-5 h-12 rounded-[14px] text-[0.9rem] font-bold',
                'flex items-center justify-center gap-2 transition-all duration-200',
                address.trim()
                  ? 'bg-primary text-white shadow-primary hover:bg-primary-hover cursor-pointer'
                  : 'bg-surface text-text-muted cursor-not-allowed border border-border',
              )}
            >
              <MdDeliveryDining className="text-[1.2rem]" />
              {t('checkout.placeOrder')} {total.toFixed(0)}₺
            </motion.button>

            {!address.trim() && (
              <p className="text-[0.72rem] text-text-muted text-center mt-2">
                {t('checkout.addressRequired')}
              </p>
            )}
          </section>
        </motion.div>
      </div>
    </div>
  )
}

/* Helper */
function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[0.83rem]">
      <span className="text-text-secondary">{label}</span>
      <span className={cn('font-semibold', green ? 'text-green-500' : 'text-text')}>{value}</span>
    </div>
  )
}
