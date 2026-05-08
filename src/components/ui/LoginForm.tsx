'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/lib/utils'
const knifeImage = { src: '/images/knife.jpg' }

const schema = z.object({
  nameInput: z.string().min(1, 'Please enter your name'),
  passwordInput: z.string()
    .min(8, 'Minimum 8 characters required')
    .max(20, 'Maximum 20 characters'),
  mailInput: z.string().email('Enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const router = useRouter()
  const login  = useUserStore((s) => s.login)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    login(data.nameInput)
    router.push('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="flex min-h-screen bg-bg max-[768px]:flex-col"
    >
      {/* ── Hero ───────────────────────────────── */}
      <div className="flex-[1.15] relative overflow-hidden min-h-screen max-[768px]:min-h-[38vh] max-[768px]:flex-none">
        <img src={knifeImage.src} alt="" aria-hidden="true"
             className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-[140deg] from-black/[0.88] via-[rgba(160,44,12,0.62)] to-black/[0.78]"
             style={{ background: 'linear-gradient(140deg, rgba(10,6,2,0.88) 0%, rgba(160,44,12,0.62) 55%, rgba(10,6,2,0.78) 100%)' }} />
        <div className="relative z-[2] p-12 h-full flex flex-col justify-end gap-5
                        max-[768px]:p-6 max-[768px]:justify-center max-[768px]:gap-4">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,87,34,0.22)] border border-[rgba(255,87,34,0.38)]
                          text-[#ffb299] text-[0.72rem] font-semibold tracking-[0.09em] uppercase
                          py-[0.32rem] px-[0.7rem] rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] flex-shrink-0" />
            Premium Food Delivery
          </div>
          <h1 className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]
                         text-[clamp(2.2rem,4.5vw,3.5rem)] max-[768px]:text-[1.85rem]">
            Great food,<br />delivered<br />to you.
          </h1>
          <p className="text-[0.95rem] text-white/[0.68] leading-[1.65] max-w-[380px] max-[768px]:hidden">
            Discover the finest restaurants near you and get your favourite meals delivered fast.
          </p>
          <div className="flex items-center gap-5 max-[768px]:hidden">
            {[['50k+','Menu Items'],['200+','Restaurants'],['4.9★','Rating']].map(([num, lbl], i) => (
              <div key={i} className="flex items-center gap-5">
                {i > 0 && <div className="w-px h-[34px] bg-white/[0.18]" />}
                <div className="flex flex-col gap-0.5">
                  <span className="font-display font-bold text-white text-[1.4rem] leading-[1.1]">{num}</span>
                  <span className="text-[0.72rem] text-white/50 tracking-[0.04em]">{lbl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 24 }}
        className="w-[480px] flex-shrink-0 bg-bg-elevated flex items-center overflow-y-auto
                   max-[1100px]:w-[420px] max-[768px]:w-full"
      >
        <div className="w-full px-10 py-11 flex flex-col max-[768px]:px-6 max-[768px]:py-8">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-primary text-white flex items-center justify-center
                            font-display font-black text-base">H</div>
            <span className="font-display font-bold text-[1.15rem] text-text tracking-[-0.02em]">HealthFree</span>
          </div>

          <h2 className="font-display font-bold text-[1.65rem] text-text tracking-[-0.025em] leading-[1.18] mb-1.5">
            Create your account
          </h2>
          <p className="text-[0.875rem] text-text-secondary mb-8">Join thousands of food lovers today</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[1.125rem]">
            {/* Name */}
            <Field label="Full Name" htmlFor="nameInput" error={errors.nameInput?.message}>
              <Input id="nameInput" placeholder="John Doe" hasError={!!errors.nameInput}
                     {...register('nameInput')} />
            </Field>

            {/* Password */}
            <Field label="Password" htmlFor="passwordInput" error={errors.passwordInput?.message}>
              <Input id="passwordInput" type="password" placeholder="Min. 8 characters"
                     hasError={!!errors.passwordInput} {...register('passwordInput')} />
            </Field>

            {/* Email */}
            <Field label="Email Address" htmlFor="mailInput" error={errors.mailInput?.message}>
              <Input id="mailInput" type="email" placeholder="you@example.com"
                     hasError={!!errors.mailInput} {...register('mailInput')} />
            </Field>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.018 }}
              whileTap={{ scale: 0.975 }}
              className="h-[52px] bg-primary text-white border-none rounded-[14px] text-[0.975rem]
                         font-semibold cursor-pointer font-body mt-2 shadow-primary
                         hover:bg-primary-hover transition-colors duration-200 tracking-[0.015em]"
            >
              Get Started — It&apos;s Free
            </motion.button>
          </form>

          <p className="mt-5 text-[0.72rem] text-text-muted text-center leading-[1.55]">
            By joining, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, htmlFor, error, children }: {
  label: string; htmlFor: string; error?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[0.82rem] font-semibold text-text-secondary tracking-[0.01em]">
        {label}
      </label>
      {children}
      {error && <span className="text-[0.74rem] text-red-500 font-medium">{error}</span>}
    </div>
  )
}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }>(
  ({ hasError, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-12 bg-surface rounded-[12px] px-3.5 text-[0.925rem] text-text',
        'outline-none border-[1.5px] transition-all duration-200 font-body',
        'placeholder:text-text-muted',
        'focus:border-primary focus:shadow-[0_0_0_3px_var(--primary-muted)] focus:bg-bg-elevated',
        hasError ? 'border-red-500' : 'border-border',
        className,
      )}
      {...props}
    />
  )
)
